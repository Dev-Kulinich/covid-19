import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

export const ModalWindow = styled.div`
  width: 400px;
  height: 100px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 10px;
  margin: 0 auto;
  background: #aedeba;
  > h5 {
    margin: 0 0 10px;
  }
  > div {
    display: flex;
    justify-content: center;
    > button {
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        background: #16d53c;
      }
    }
  }
`;

export const Button = styled.button`
  width: 140px;
  height: 30px;
  margin-right: 40px;
  border-radius: 5px;
  font-size: 15px;
  border: none;
  background: #09791f;
  box-shadow: 7px 5px 5px 0px rgba(0, 0, 0, 0.61);
  color: ${(props) => (props.is_active === props.value ? "yellow" : "white")};
  cursor: pointer;
`;
