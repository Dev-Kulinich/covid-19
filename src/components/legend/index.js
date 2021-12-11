import { WrapperLegend } from "./styled";

export const Legend = () => {
  return (
    <WrapperLegend>
      <div style={{ "--color": "#FFEDA0" }}>0 - 10,000</div>
      <div style={{ "--color": "#FED976" }}>10,000 - 50,000</div>
      <div style={{ "--color": "#FEB24C" }}>50,000 - 100,000</div>
      <div style={{ "--color": "#FD8D3C" }}>100,000 - 500,000</div>
      <div style={{ "--color": "#FC4E2A" }}>500,000 - 1,000,000</div>
      <div style={{ "--color": "#E31A1C" }}>1,000,000 - 5,000,000</div>
      <div style={{ "--color": "#BD0026" }}>5,000,000 - 30,000,000</div>
      <div style={{ "--color": "#800026" }}>more 30,000,000</div>
    </WrapperLegend>
  );
};
