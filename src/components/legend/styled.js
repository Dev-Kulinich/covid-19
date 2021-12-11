import styled from "styled-components";

export const WrapperLegend = styled.div`
  width: 230px;
  height: 240px;
  padding: 10px 0 10px 10px;
  background: #e0e4e0;
  position: absolute;
  right: 10px;
  bottom: 20px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;

  > div {
    margin-bottom: 10px;
    position: relative;
    margin-left: 30px;
    &::after {
      content: "";
      display: block;
      width: 25px;
      border-radius: 3px;
      height: 20px;
      position: absolute;
      top: 0;
      left: -30px;
      background-color: var(--color);
    }
  }
`;
