import React, { useState, useEffect, useCallback } from "react";

import "./App.css";
import { CovidTable } from "./components/table/index";
import { Wrapper, ModalWindow, Button } from "./components/wrapper/index";
import { MapCountries } from "./components/map/index";

export const UserSelectedApi = React.createContext();

function App() {
  const [userApi, setUserApi] = useState("https://covid-19.dataflowkit.com/v1");
  const [dirtyData, setDirtyData] = useState({ arr: [], firstSource: true });
  const [data, setData] = useState({ arr: [], firstSource: true });

  useEffect(() => {
    fetch(`${userApi}`)
      .then((res) => res.json())
      .then((json) => {
        userApi === "https://covid-19.dataflowkit.com/v1"
          ? setDirtyData({ arr: json, firstSource: true })
          : setDirtyData({ arr: json, firstSource: false });
      });
  }, [userApi]);

  const deleteComma = useCallback((str) => {
    let result = [];
    str.split("").forEach((el) => (el !== "," ? result.push(el) : null));
    return +result.join("");
  }, []);

  useEffect(() => {
    if (dirtyData.firstSource) {
      let array = dirtyData.arr.map((obj) => {
        for (let key in obj) {
          if (
            /\,/.test(obj[key]) ||
            /\+/.test(obj[key]) ||
            (/\d/.test(obj[key]) && obj[key].length <= 3)
          ) {
            obj[key] = deleteComma(obj[key]);
          }
        }
        return obj;
      });
      setData({ ...dirtyData, arr: array });
    } else {
      let array = dirtyData.arr.map((obj) => {
        for (let key in obj) {
          if (key === "country" && obj[key] === "United Kingdom") {
            obj["Country_text"] = "UK";
            delete obj[key];
          } else if (key === "country" && obj[key] === "US") {
            obj["Country_text"] = "USA";
            delete obj[key];
          } else if (key === "country") {
            obj["Country_text"] = obj[key];
            delete obj[key];
          } else if (key === "confirmed_daily") {
            obj["New Cases_text"] = obj[key];
            delete obj[key];
          } else if (key === "deaths_daily") {
            obj["New Deaths_text"] = obj[key];
            delete obj[key];
          } else if (key === "confirmed") {
            obj["Total Cases_text"] = obj[key];
            delete obj[key];
          } else if (key === "deaths") {
            obj["Total Deaths_text"] = obj[key];
            delete obj[key];
          } else if (key === "date") {
            obj["Last Update"] = obj[key].slice(0, 10) + " 00:00";
            delete obj[key];
          }
        }
        return obj;
      });
      let lastDataArray = [];
      array.forEach((obj) => {
        if (obj["Last Update"] === "2020-04-27 00:00") {
          lastDataArray.push(obj);
        }
      });
      setData({ ...dirtyData, arr: lastDataArray });
    }
  }, [dirtyData]);

  return (
    <UserSelectedApi.Provider value={data}>
      <h2>Global Covid-19 statistics</h2>
      <ModalWindow>
        <h5>
          You can change the source of information about the Covid-19 by
          countrys
        </h5>
        <div>
          <Button
            value={"https://covid-19.dataflowkit.com/v1"}
            onClick={(e) => setUserApi(e.target.value)}
            is_active={userApi}
          >
            First source
          </Button>
          <Button
            value={
              "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/countries_summary?min_date=2020-04-22T00:00:00.000Z&max_date=2020-04-27T00:00:00.000Z"
            }
            onClick={(e) => setUserApi(e.target.value)}
            is_active={userApi}
          >
            Second source
          </Button>
        </div>
      </ModalWindow>
      <Wrapper>
        <CovidTable />
        <MapCountries />
      </Wrapper>
    </UserSelectedApi.Provider>
  );
}

export default App;
