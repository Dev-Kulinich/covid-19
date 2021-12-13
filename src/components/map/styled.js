import styled from "styled-components";

export const HoverInfo = styled.div`
  width: 265px;
  height: fit-content;
  background: #e0e4e0;
  position: absolute;
  padding: 7px 0 5px 10px;
  right: 5px;
  top: 15px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  > h3 {
    color: red;
  }
  > p {
    margin: 0;
    color: grey;
    font-size: 14px;
  }
  > div {
    display: flex;
    flex-direction: column;
    > div {
      text-align: left;
      font-size: 14px;
      &:first-child {
        font-weight: bold;
      }
    }
  }
`;
