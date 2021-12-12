import styled from "styled-components";

export const WrapperLegend = styled.div`
  width: 230px;
  height: 230px;
  padding: 7px 0 10px 10px;
  background: #e0e4e0;
  position: absolute;
  right: 5px;
  bottom: 20px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;

  > div {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 7px;
    position: relative;
    margin-left: 35px;
    &::after {
      content: "";
      display: block;
      width: 25px;
      border: 1px solid grey;
      border-radius: 3px;
      height: 20px;
      position: absolute;
      top: 0;
      left: -35px;
      background-color: var(--color);
    }
  }
`;
