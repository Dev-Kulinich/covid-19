import "./App.css";
import { Fragment } from "react";
import { CovidTable } from "./components/table/index";
import { Wrapper } from "./components/wrapper/index";
import { MapCountries } from "./components/map/index";

function App() {
  return (
    <Fragment>
      <h2>Global Codid-19 statistics</h2>
      <Wrapper>
        <CovidTable />
        <MapCountries />
      </Wrapper>
    </Fragment>
  );
}

export default App;
