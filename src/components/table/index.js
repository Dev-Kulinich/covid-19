import React, { useState, useCallback, useContext } from "react";
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

export const CovidTable = () => {
  const [reverse, setReverse] = useState(true);
  const [searchCountryMenu, setSearchCountryMenu] = useState(false);
  const [userCountry, setUserCountry] = useState([]);
  const [activeValue, setActiveValue] = useState("Total Cases_text");

  const data = useContext(UserSelectedApi);

  const makeReversCountry = useCallback((a, b, rev, str) => {
    return rev ? (a[str] > b[str] ? -1 : 1) : a[str] > b[str] ? 1 : -1;
  }, []);

  const reverseData = useCallback(
    (string) => {
      if (data.firstSource) {
        return data.arr
          .slice(1, data.arr.length - 1)
          .sort((a, b) => makeReversCountry(a, b, reverse, string));
      } else {
        return data.arr.sort((a, b) =>
          makeReversCountry(a, b, reverse, string)
        );
      }
    },
    [data, reverse]
  );

  const renderCountryStat = useCallback(
    (array = []) =>
      array
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
};
