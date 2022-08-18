import styled from "styled-components";

export const TodoListContainer = styled.div`
  display: grid;
  grid-template-rows: 0.2fr 1fr;
  justify-items: center;
  align-items: center;
  width: 80vw;
  min-height: 100vh;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const PostForm = styled.section`
  text-align: center;
  height: 3rem;
`;
