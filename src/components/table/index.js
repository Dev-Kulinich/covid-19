import React, { useState, useEffect } from "react";
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

export const CovidTable = React.memo(function CovidTable() {
  const [data, setData] = useState([]);
  const [reverse, setReverse] = useState(true);
  const [searchCountryMenu, setSearchCountryMenu] = useState(false);
  const [userCountry, setUserCountry] = useState([]);
  const [activeValue, setActiveValue] = useState("Country_text");

  useEffect(() => {
    fetch("https://covid-19.dataflowkit.com/v1")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  function deleteComma(str) {
    let result = [];
    str.split("").forEach((el) => (el !== "," ? result.push(el) : null));
    return +result.join("");
  }

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

  const reverseData = (string) => {
    return data
      .slice(1, data.length - 1)
      .sort((a, b) =>
        reverse
          ? a[string] > b[string]
            ? -1
            : 1
          : a[string] > b[string]
          ? 1
          : -1
      );
  };

  const renderCountryStat = (arr = []) =>
    arr
      .filter((obj) => {
        if (userCountry == "") {
          return obj;
        } else if (obj.Country_text.toLowerCase().includes(userCountry)) {
          return obj;
        }
      })
      .map((obj) => (
        <Country key={obj["Country_text"]}>
          <div>{obj["Country_text"]}</div>
          <div>
            {obj["New Cases_text"] == 0 ? "no info" : obj["New Cases_text"]}
          </div>
          <div>
            {obj["New Deaths_text"] == 0 ? "no info" : obj["New Deaths_text"]}
          </div>
          <div>
            {obj["Total Cases_text"] == 0 ? "no info" : obj["Total Cases_text"]}
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
      ));

  return (
    <Table>
      <Guide>
        <p>
          The <b>active</b> column is <b>yellow</b>. You can change it. Just{" "}
          <b>click</b> on the one that interests you
        </p>
      </Guide>
      <Header>
        <ColumTableItem
          value={"Country_text"}
          onClick={(e) => setActiveValue(e.target.getAttribute("value"))}
          is_active={activeValue}
        >
          Country
        </ColumTableItem>
        <ColumTableItem
          value={"New Cases_text"}
          onClick={(e) => setActiveValue(e.target.getAttribute("value"))}
          is_active={activeValue}
        >
          New Cases
        </ColumTableItem>
        <ColumTableItem
          value={"New Deaths_text"}
          onClick={(e) => setActiveValue(e.target.getAttribute("value"))}
          is_active={activeValue}
        >
          New Deaths
        </ColumTableItem>
        <ColumTableItem
          value={"Total Cases_text"}
          onClick={(e) => setActiveValue(e.target.getAttribute("value"))}
          is_active={activeValue}
        >
          Total Cases
        </ColumTableItem>
        <ColumTableItem
          value={"Total Deaths_text"}
          onClick={(e) => setActiveValue(e.target.getAttribute("value"))}
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
