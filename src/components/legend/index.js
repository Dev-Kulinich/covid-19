import { useContext } from "react";

import { WrapperLegend } from "./styled";
import { UserSelectedApi } from "../../App";

export const Legend = () => {
  const api = useContext(UserSelectedApi);

  if (`${api}` === "https://covid-19.dataflowkit.com/v1") {
    return (
      <WrapperLegend>
        <div style={{ "--color": "#FFEDA0" }}>0 - 10000</div>
        <div style={{ "--color": "#FED976" }}>10000 - 50000</div>
        <div style={{ "--color": "#FEB24C" }}>50000 - 100000</div>
        <div style={{ "--color": "#FD8D3C" }}>100000 - 500000</div>
        <div style={{ "--color": "#FC4E2A" }}>500000 - 1000000</div>
        <div style={{ "--color": "#E31A1C" }}>1000000 - 5000000</div>
        <div style={{ "--color": "#BD0026" }}>5000000 - 30000000</div>
        <div style={{ "--color": "#800026" }}>more 30000000</div>
      </WrapperLegend>
    );
  } else {
    return (
      <WrapperLegend>
        <div style={{ "--color": "#FFEDA0" }}>0 - 500</div>
        <div style={{ "--color": "#FED976" }}>500 - 2000</div>
        <div style={{ "--color": "#FEB24C" }}>2000 - 10000</div>
        <div style={{ "--color": "#FD8D3C" }}>10000 - 50000</div>
        <div style={{ "--color": "#FC4E2A" }}>50000 - 100000</div>
        <div style={{ "--color": "#E31A1C" }}>100000 - 200000</div>
        <div style={{ "--color": "#BD0026" }}>200000 - 500000</div>
        <div style={{ "--color": "#800026" }}>more 500000</div>
      </WrapperLegend>
    );
  }
};
