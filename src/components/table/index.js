import React, { useState, useEffect } from "react";

import {
  Header,
  Info,
  Country,
  Table,
  Triangle,
  Search,
  SearchBox,
} from "./styled";

export const CovidTable = React.memo(function CovidTable() {
  const [data, setData] = useState([]);
  const [reverse, setReverse] = useState(false);
  const [searchCountryMenu, setSearchCountryMenu] = useState(false);
  const [userCountry, setUserCountry] = useState([]);
  console.log(data);

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
        (/\d/.test(obj[key]) && obj[key].length <= 2)
      ) {
        obj[key] = deleteComma(obj[key]);
      }
    }
  });

  const reverseData = (array = [], string) => {
    return array
      .slice(1, array.length - 1)
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
        <Country key={obj.Country_text}>
          <div>{obj.Country_text}</div>
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
            {obj["Last Update"] == null ? "no info" : obj["Last Update"]}
          </div>
        </Country>
      ));

  return (
    <Table>
      <Header>
        <div>Country</div>
        <div>New Cases</div>
        <div>New Deaths</div>
        <div>Total Cases</div>
        <div>Total Deaths</div>
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
      <Info>{renderCountryStat(reverseData(data, "Total Cases_text"))}</Info>
    </Table>
  );
});
