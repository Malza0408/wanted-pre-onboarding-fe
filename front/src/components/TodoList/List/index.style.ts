import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 80%;
  max-width: 500px;
  height: 4rem;
  padding: 1rem;
  border-radius: 10px;
  margin: 0 auto;
`;

export const Title = styled.div<{ isCompleted: boolean; isModify: boolean }>`
  > p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  cursor: pointer;
  background-color: olivedrab;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 0.7;
  max-width: 300px;
  height: 100%;
  padding-left: 1rem;
  border-radius: 10px;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
  /* visibility: ${(props) => (props.isModify ? "hidden" : "visible")}; */
`;

export const BtnContainer = styled.div`
  position: relative;
  flex: 0.5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;

export const Button = styled.button<{ isModify: boolean }>`
  width: 40%;
  height: 100%;
  border-radius: 10px;
  background-color: orange;
`;

export const ModifyBtn = styled(Button)`
  position: absolute;
  transform: translateX(-60%);
  visibility: ${(props) => (props.isModify ? "hidden" : "visible")};
`;

export const DeleteBtn = styled(Button)`
  position: absolute;
  transform: translateX(60%);
  visibility: ${(props) => (props.isModify ? "hidden" : "visible")};
`;

export const ModifyForm = styled.form`
  position: absolute;
`;
export const ModifyInput = styled.input<{ isModify: boolean }>`
  position: absolute;
  height: 30%;
  width: 55%;
  visibility: ${(props) => (props.isModify ? "visible" : "hidden")};
`;

export const UpdateBtn = styled(Button)`
  position: absolute;
  transform: translateX(-60%);
  visibility: ${(props) => (props.isModify ? "visible" : "hidden")};
`;
export const CloseModifyBtn = styled(Button)`
  position: absolute;
  transform: translateX(60%);
  visibility: ${(props) => (props.isModify ? "visible" : "hidden")};
`;
