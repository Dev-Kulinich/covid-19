import styled from "styled-components";

export const Table = styled.div`
  width: 890px;
  height: 490px;
  background: #d1d2d2;
`;

export const Header = styled.div`
  width: inherit;
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
  width: fit-content;
  height: 450px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    background: #0c953f;
  }
  &::-webkit-scrollbar-thumb {
    background: #af854d;
    border-radius: 5px;
    border: 0.5px solid #010101;
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
  width: 870px;
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
