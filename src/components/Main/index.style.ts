import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 0.3fr 0.7fr;
  justify-items: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

export const Form = styled.section`
  text-align: center;
  align-self: start;
`;

export const SwitchButton = styled.button`
  width: 10rem;
  height: 2rem;
  border-radius: 5px;
  background-color: orange;
  margin-bottom: 2rem;
`;
