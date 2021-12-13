import { WrapperLegend } from "./styled";

export const Legend = () => {
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
};
