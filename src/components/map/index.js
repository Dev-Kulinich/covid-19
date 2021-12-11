import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip,
  Popup,
} from "react-leaflet";
import { useEffect, useState } from "react";

import * as countriesData from "../../data/countries.json";
import "../../App.css";

export const MapCountries = () => {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState(null);

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
        obj.properties.total_case = deleteComma(obj_["Total Cases_text"]);
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

  function deleteComma(str) {
    let result = [];
    str.split("").forEach((el) => (el !== "," ? result.push(el) : null));
    return +result.join("");
  }

  return (
    <MapContainer
      center={[50.358079, 30.598151]}
      zoom={2}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=vn4Q36WSJHbNNiQFkE7F"
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

        function getColor(data) {
          return data > 30000000
            ? "#800026"
            : data > 5000000
            ? "#BD0026"
            : data > 1000000
            ? "#E31A1C"
            : data > 500000
            ? "#FC4E2A"
            : data > 100000
            ? "#FD8D3C"
            : data > 50000
            ? "#FEB24C"
            : data > 10000
            ? "#FED976"
            : "#FFEDA0";
        }

        return (
          <Polygon
            key={state.properties.admin}
            pathOptions={{
              fillColor: getColor(state.properties.total_case),
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: "white",
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (event) => {
                let layer = event.target;
                layer.setStyle({
                  weight: 4,
                  dashArray: "",
                  color: "#666",
                });
                layer.bringToFront();
              },
              mouseout: (event) => {
                let layer = event.target;
                layer.setStyle({
                  weight: 2,
                  opacity: 1,
                  dashArray: "3",
                  color: "white",
                });
              },
            }}
          >
            <Popup>
              <h2>{state.properties.admin}</h2>
              <div style={{ fontSize: 16, fontWeight: "bold" }}>
                Total cases:{" "}
                <span style={{ color: "red" }}>
                  {state.properties.total_case}
                </span>
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </MapContainer>
  );
};
