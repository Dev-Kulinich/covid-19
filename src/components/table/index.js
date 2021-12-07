import { useState, useEffect } from "react";

import {
  Header,
  Info,
  Country,
  Table,
  Triangle,
  Search,
  SearchBox,
} from "./styled";

export const CovidTable = () => {
  const [data, setData] = useState([]);
  const [reverse, serReverse] = useState(false);
  const [findCountry, setFindCountry] = useState(false);

  const toggleReverse = () => serReverse(!reverse);

  const toggleFind = () => setFindCountry(!findCountry);

  useEffect(() => {
    fetch("https://covid-19.dataflowkit.com/v1")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const arr = data
    .slice(1, data.length - 1)
    .sort((a, b) => (a.Country_text > b.Country_text ? 1 : -1));

  const arrReverse = [...arr].reverse();

  const renderCountryStat = () =>
    arr.map((obj) => (
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
          {obj["Total Deaths_text"] == 0 ? "no info" : obj["Total Deaths_text"]}
        </div>
        <div>{obj["Last Update"] == null ? "no info" : obj["Last Update"]}</div>
      </Country>
    ));

  const renderReverseCountryStat = () =>
    arrReverse.map((obj) => (
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
          {obj["Total Deaths_text"] == 0 ? "no info" : obj["Total Deaths_text"]}
        </div>
        <div>
          {obj["Last Update"] == null ? "no info" : obj["Last Update"]}{" "}
        </div>
      </Country>
    ));

  return (
    <Table>
      <Triangle reverse={reverse} onClick={toggleReverse} />
      <Search onClick={toggleFind} />
      <SearchBox findCountry={findCountry}>
        <input placeholder="Enter country"></input>
        <button>Find</button>
      </SearchBox>
      <Header>
        <div>Country</div>
        <div>New Cases</div>
        <div>New Deaths</div>
        <div>Total Cases</div>
        <div>Total Deaths</div>
        <div>Last Update</div>
      </Header>
      <Info>{reverse ? renderReverseCountryStat() : renderCountryStat()}</Info>
    </Table>
  );
};
