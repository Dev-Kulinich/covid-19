import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { useEffect, useState } from "react";

import * as countriesData from "../../data/countries.json";
import "../../App.css";
import { array } from "prop-types";

export const MapCountries = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://covid-19.dataflowkit.com/v1")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  countriesData.features.forEach((obj) => {
    for (let key in obj.properties)
      if (key !== "admin") {
        delete obj.properties[key];
      }
  });

  countriesData.features.forEach((obj) => {
    data.forEach((obj_) => {
      if (
        obj_.Country_text === obj.properties.admin ||
        obj_.Country_text === transformLongNameCoun(obj.properties.admin)
      ) {
        obj.properties.total_case = obj_["Total Cases_text"];
      }
    });
  });

  function transformLongNameCoun(word) {
    let res = [];
    word.split(" ").forEach((el) => {
      if (el.slice(0, 1) === el.slice(0, 1).toUpperCase()) {
        res.push(el.slice(0, 1));
      }
    });
    return res.join("");
  }
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
      {countriesData.features.map((state) => {
        let coordinates;
        if (state.geometry.type === "MultiPolygon") {
          coordinates = state.geometry.coordinates.map((item) =>
            item.map((el) => el.map((data) => [data[1], data[0]]))
          );
        } else {
          coordinates = state.geometry.coordinates[0].map((item) => [
            item[1],
            item[0],
          ]);
        }
        return (
          <Polygon
            key={state.properties.admin}
            pathOptions={{
              fillColor: "#FD8D3C",
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 4,
              color: "white",
            }}
            positions={coordinates}
          />
        );
      })}
    </MapContainer>
  );
};
