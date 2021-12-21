import React, { useState, useEffect } from "react";

import "./App.css";
import { CovidTable } from "./components/table/index";
import { Wrapper, ModalWindow, Button } from "./components/wrapper/index";
import { MapCountries } from "./components/map/index";

export const UserSelectedApi = React.createContext();

function App() {
  const [userApi, setUserApi] = useState("https://covid-19.dataflowkit.com/v1");
  const [data, setData] = useState({ arr: [], firstSource: null });

  useEffect(() => {
    fetch(`${userApi}`)
      .then((res) => res.json())
      .then((json) => {
        userApi === "https://covid-19.dataflowkit.com/v1"
          ? setData({ arr: json, firstSource: true })
          : setData({ arr: json, firstSource: false });
      });
  }, [userApi]);

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
