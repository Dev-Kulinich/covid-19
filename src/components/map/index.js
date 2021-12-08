import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";

import * as countriesData from "../../data/countries.json";
import "../../App.css";

export const MapCountries = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://covid-19.dataflowkit.com/v1")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const arr = data.slice(1, data.length - 1);

  countriesData.features.forEach((obj) => {
    for (let key in obj) {
      if (key === "properties") {
        for (let key1 in obj[key]) {
          if (key1 !== "admin") {
            delete obj[key][key1];
          }
        }
      }
    }
  });

  console.log(countriesData.features);
  return (
    <MapContainer
      center={[50.358079, 30.598151]}
      zoom={2}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
