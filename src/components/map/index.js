import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { useCallback, useMemo, useState, useContext, useEffect } from "react";

import * as countriesData from "../../data/countries.json";
import "../../App.css";
import { Legend } from "../legend";
import { HoverInfo } from "./styled";
import { UserSelectedApi } from "../../App";

export const MapCountries = () => {
  const [info, setInfo] = useState(null);

  const data = useContext(UserSelectedApi);

  useMemo(() => {
    countriesData.features.forEach((obj) => {
      for (let key in obj.properties)
        if (key !== "admin") {
          delete obj.properties[key];
        }
    });
  }, [countriesData.features]);

  const transformLongNameCoun = useCallback((word) => {
    let res = [];
    word.split(" ").forEach((el) => {
      if (el.slice(0, 1) === el.slice(0, 1).toUpperCase()) {
        res.push(el.slice(0, 1));
      }
    });
    return res.join("");
  }, []);

  const setTotalCase = useCallback(
    (array = [], geoObj) => {
      return array.forEach((obj_) => {
        if (
          obj_.Country_text === geoObj.properties.admin ||
          obj_.Country_text === transformLongNameCoun(geoObj.properties.admin)
        ) {
          geoObj.properties.total_case = obj_["Total Cases_text"];
        }
      });
    },
    [data]
  );

  useMemo(() => {
    if (data.firstSource) {
      countriesData.features.forEach((obj) => {
        setTotalCase(data.arr, obj);
      });
    } else {
      countriesData.features.forEach((obj) => {
        obj.properties.total_case = 0;
        setTotalCase(data.arr, obj);
      });
    }
  }, [data]);

  const renderPolygon = useMemo(
    () =>
      countriesData.features.map((state) => {
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

        function getColor(value) {
          if (data.firstSource) {
            return value > 30000000
              ? "#800026"
              : value > 5000000
              ? "#BD0026"
              : value > 1000000
              ? "#E31A1C"
              : value > 500000
              ? "#FC4E2A"
              : value > 100000
              ? "#FD8D3C"
              : value > 50000
              ? "#FEB24C"
              : value > 10000
              ? "#FED976"
              : "#FFEDA0";
          } else {
            return value > 500000
              ? "#800026"
              : value > 200000
              ? "#BD0026"
              : value > 100000
              ? "#E31A1C"
              : value > 50000
              ? "#FC4E2A"
              : value > 10000
              ? "#FD8D3C"
              : value > 2000
              ? "#FEB24C"
              : value > 500
              ? "#FED976"
              : "#FFEDA0";
          }
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
                layer.setStyle({ weight: 4, dashArray: "", color: "#666" });
                layer.bringToFront();
                setInfo({
                  country: state.properties.admin,
                  total: state.properties.total_case,
                });
              },
              mouseout: (event) => {
                let layer = event.target;
                layer.setStyle({
                  weight: 2,
                  dashArray: "3",
                  color: "white",
                });
                setInfo(null);
              },
            }}
          />
        );
      }),
    [data]
  );

  return (
    <div className="container">
      <MapContainer
        center={[50.358079, 30.598151]}
        zoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=vn4Q36WSJHbNNiQFkE7F"
        />
        <Legend />
        <HoverInfo>
          <h3>Statistics Covid-19</h3>
          {info === null ? (
            <p>Move the mouse over the country</p>
          ) : (
            <div>
              <div>{info.country}</div>
              <div>
                Total cases:{" "}
                {info.total === 0 || info.total === undefined ? (
                  <span>
                    <b>no info</b>
                  </span>
                ) : (
                  <span>
                    <b>{info.total}</b> peoples
                  </span>
                )}
              </div>
            </div>
          )}
        </HoverInfo>
        {renderPolygon}
      </MapContainer>
    </div>
  );
};
