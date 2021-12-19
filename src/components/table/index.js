import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import moment from "moment";

import {
  Header,
  Info,
  Country,
  Table,
  Triangle,
  Search,
  SearchBox,
  ColumTableItem,
  Guide,
} from "./styled";
import { UserSelectedApi } from "../../App";

export const CovidTable = React.memo(function CovidTable() {
  const [data, setData] = useState([]);
  const [reverse, setReverse] = useState(true);
  const [searchCountryMenu, setSearchCountryMenu] = useState(false);
  const [userCountry, setUserCountry] = useState([]);
  const [activeValue, setActiveValue] = useState("Total Cases_text");

  const api = useContext(UserSelectedApi);
  const newDataArray = [];

  useEffect(() => {
    fetch(`${api}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [api]);

  const deleteComma = useCallback((str) => {
    let result = [];
    str.split("").forEach((el) => (el !== "," ? result.push(el) : null));
    return +result.join("");
  }, []);

  useMemo(() => {
    if (`${api}` === "https://covid-19.dataflowkit.com/v1") {
      data.forEach((obj) => {
        for (let key in obj) {
          if (
            /\,/.test(obj[key]) ||
            /\+/.test(obj[key]) ||
            (/\d/.test(obj[key]) && obj[key].length <= 3)
          ) {
            obj[key] = deleteComma(obj[key]);
          }
        }
      });
    } else {
      data.forEach((obj) => {
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
      });
    }
  }, [data]);

  if (`${api}` !== "https://covid-19.dataflowkit.com/v1") {
    data.forEach((obj) => {
      if (obj["Last Update"] === "2020-04-27 00:00") {
        newDataArray.push(obj);
      }
    });
  }

  const makeReversCountry = useCallback((a, b, rev, str) => {
    return rev ? (a[str] > b[str] ? -1 : 1) : a[str] > b[str] ? 1 : -1;
  }, []);

  const reverseData = useCallback(
    (string) => {
      if (`${api}` === "https://covid-19.dataflowkit.com/v1") {
        return data
          .slice(1, data.length - 1)
          .sort((a, b) => makeReversCountry(a, b, reverse, string));
      } else {
        return newDataArray.sort((a, b) =>
          makeReversCountry(a, b, reverse, string)
        );
      }
    },
    [data, reverse]
  );

  const renderCountryStat = useCallback(
    (arr = []) =>
      arr
        .filter((obj) => {
          if (userCountry == "") {
            return obj;
          } else if (obj["Country_text"].toLowerCase().includes(userCountry)) {
            return obj;
          }
        })
        .map((obj) => (
          <Country key={obj["_id"] || obj["Country_text"]}>
            <div>{obj["Country_text"]}</div>
            <div>
              {obj["New Cases_text"] == 0 ? "no info" : obj["New Cases_text"]}
            </div>
            <div>
              {obj["New Deaths_text"] == 0 ? "no info" : obj["New Deaths_text"]}
            </div>
            <div>
              {obj["Total Cases_text"] == 0
                ? "no info"
                : obj["Total Cases_text"]}
            </div>
            <div>
              {obj["Total Deaths_text"] == 0
                ? "no info"
                : obj["Total Deaths_text"]}
            </div>
            <div>
              {obj["Last Update"] == null
                ? "no info"
                : moment(obj["Last Update"]).format("DD MMM YYYY - HH:mm")}
            </div>
          </Country>
        )),
    [userCountry]
  );

  const onClickSendValue = useCallback((event) => {
    return setActiveValue(event.target.getAttribute("value"));
  }, []);

  return (
    <Table>
      <Guide>
        <p>
          The <b>active</b> source and column is{" "}
          <b style={{ color: "#d9d91f" }}>yellow</b>. You can change it. Just{" "}
          <b>click</b> on the one that interests you
        </p>
      </Guide>
      <Header>
        <ColumTableItem
          value={"Country_text"}
          onClick={(e) => onClickSendValue(e)}
          is_active={activeValue}
        >
          Country
        </ColumTableItem>
        <ColumTableItem
          value={"New Cases_text"}
          onClick={(e) => onClickSendValue(e)}
          is_active={activeValue}
        >
          New Cases
        </ColumTableItem>
        <ColumTableItem
          value={"New Deaths_text"}
          onClick={(e) => onClickSendValue(e)}
          is_active={activeValue}
        >
          New Deaths
        </ColumTableItem>
        <ColumTableItem
          value={"Total Cases_text"}
          onClick={(e) => onClickSendValue(e)}
          is_active={activeValue}
        >
          Total Cases
        </ColumTableItem>
        <ColumTableItem
          value={"Total Deaths_text"}
          onClick={(e) => onClickSendValue(e)}
          is_active={activeValue}
        >
          Total Deaths
        </ColumTableItem>
        <div>Last Update</div>
      </Header>
      <Triangle reverse={reverse} onClick={() => setReverse(!reverse)} />
      <Search onClick={() => setSearchCountryMenu(!searchCountryMenu)} />
      <SearchBox searchCountryMenu={searchCountryMenu}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => setUserCountry(event.target.value.toLowerCase())}
        />
      </SearchBox>
      <Info>{renderCountryStat(reverseData(activeValue))}</Info>
    </Table>
  );
});
