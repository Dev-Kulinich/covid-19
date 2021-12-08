import styled from "styled-components";

import { ReactComponent } from "../img/search.svg";

export const Table = styled.div`
  width: 890px;
  height: 490px;
  background: #d1d2d2;
`;

export const Header = styled.div`
  width: 889px;
  height: 40px;
  padding-left: 20px;
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  background: rgb(11, 104, 24);
  background: linear-gradient(
    90deg,
    rgba(11, 104, 24, 1) 0%,
    rgba(9, 121, 31, 1) 38%,
    rgba(22, 213, 60, 1) 100%
  );
  > div {
    display: flex;
    justify-content: flex-start;
    width: 120px;
    &:first-child {
      width: 210px;
    }
    &:last-child {
      width: 150px;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 889px;
  height: 450px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    background: rgba(22, 213, 60, 1) 100%;
  }
  &::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 5px;
    height: 60px;
  }
  > div {
    &:nth-child(odd) {
      background: #afb2af;
    }
    > div {
      height: 30px;
      display: flex;
      align-items: center;
      color: #0c1e0b;
      font-weight: normal;
    }
  }
`;

export const Country = styled(Header)`
  width: 872px;
  background: initial;
`;

export const Triangle = styled.div`
  position: absolute;
  left: 116px;
  top: 84px;
  width: 0;
  height: 0;
  border-width: 0 8px 12px 8px;
  border-color: transparent transparent #fff transparent;
  border-style: solid;
  cursor: pointer;
  transform: ${(props) => (props.reverse ? "rotateX(180deg)" : "none")};
`;

export const Search = styled(ReactComponent)`
  position: absolute;
  left: 155px;
  top: 80px;
  width: 23px;
  height: fit-content;
  cursor: pointer;
  path {
    fill: #fff;
  }
`;

export const SearchBox = styled.div`
  display: ${(props) => (props.searchCountryMenu ? "flex" : "none")};
  position: absolute;
  justify-content: center;
  left: 75px;
  top: 13px;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  width: 190px;
  height: 50px;
  background: #fff;
  &::after {
    content: "";
    position: absolute;
    transform: rotateX(180deg);
    top: 44px;
    left: 80px;
    display: block;
    border-width: 0 10px 20px 10px;
    border-color: transparent transparent #fff transparent;
    border-style: solid;
  }
  > input {
    width: fit-content;
    height: 35px;
    border: 1px solid green;
    border-radius: 2px;
  }
`;
