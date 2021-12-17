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

  useEffect(() => {
    fetch(`${api}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [api]);
  console.log(data);

  const deleteComma = useCallback((str) => {
    let result = [];
    str.split("").forEach((el) => (el !== "," ? result.push(el) : null));
    return +result.join("");
  }, []);

  useMemo(() => {
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
  }, [data]);

  const reverseData = useCallback(
    (string) => {
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
    },
    [data, reverse]
  );

  const renderCountryStat = useCallback(
    (arr = []) =>
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
