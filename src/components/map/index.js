import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { useCallback, useEffect, useMemo, useState, useContext } from "react";

import * as countriesData from "../../data/countries.json";
import "../../App.css";
import { Legend } from "../legend";
import { HoverInfo } from "./styled";
import { UserSelectedApi } from "../../App";

export const MapCountries = () => {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState(null);

  const api = useContext(UserSelectedApi);

  useEffect(() => {
    fetch(`${api}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [api]);

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

  const deleteComma = useCallback((str) => {
    let result = [];
    str.split("").forEach((el) => (el !== "," ? result.push(el) : null));
    return +result.join("");
  }, []);

  if (`${api}` !== "https://covid-19.dataflowkit.com/v1") {
    data.forEach((obj) => {
      for (let key in obj) {
        if (key === "country" && obj[key] === "US") {
          obj[key] = "USA";
        }
      }
    });
  }

  useMemo(() => {
    if (`${api}` === "https://covid-19.dataflowkit.com/v1") {
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
    } else {
      countriesData.features.forEach((obj) => {
        obj.properties.total_case = 0;
        data.forEach((obj_) => {
          if (
            obj_.country === obj.properties.admin ||
            obj_.country === transformLongNameCoun(obj.properties.admin)
          ) {
            obj.properties.total_case = obj_.confirmed;
          }
        });
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

        function getColor(data) {
          if (`${api}` === "https://covid-19.dataflowkit.com/v1") {
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
          } else {
            return data > 500000
              ? "#800026"
              : data > 200000
              ? "#BD0026"
              : data > 100000
              ? "#E31A1C"
              : data > 50000
              ? "#FC4E2A"
              : data > 10000
              ? "#FD8D3C"
              : data > 2000
              ? "#FEB24C"
              : data > 500
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
