import React, { useState } from "react";
import {
  BtnContainer,
  Button as SubmitBtn,
  Button as CloseModifyBtn,
  Container,
  DeleteBtn,
  Form,
  ModifyBtn,
  ModifyInput,
  Title,
} from "./index.style";

interface ListProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  handleIsCompleteTodo: (
    todo: string,
    id: number,
    isCompleted: boolean
  ) => void;
  handleDeleteTodo: (id: number, modifyTodoInputValue: string) => void;
  handleUpdateTodo: (
    modifyTodoInputValue: string,
    id: number,
    isCompleted: boolean
  ) => void;
}

function List({
  id,
  todo,
  isCompleted,
  handleIsCompleteTodo,
  handleDeleteTodo,
  handleUpdateTodo,
}: ListProps) {
  const [isModify, setIsModify] = useState(false);
  const [modifyTodoInputValue, setModifyTodoInputValue] = useState(todo);
  const [tempInputValue, setTempInputValue] = useState(todo);

  const handleSubmitUpdateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModify(false);
    handleUpdateTodo(modifyTodoInputValue, id, isCompleted);
  };

  const handleClickModifyButton = (curTodo: string) => {
    setIsModify(true);
    setTempInputValue(curTodo);
  };

  const handleClickCancelButton = () => {
    setIsModify(false);
    setModifyTodoInputValue(tempInputValue);
  };

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyTodoInputValue(e.target.value);
  };
  return (
    <Container>
      <Form onSubmit={handleSubmitUpdateTodo}>
        <Title
          isCompleted={isCompleted}
          isModify={isModify}
          onClick={() =>
            !isModify && handleIsCompleteTodo(todo, id, !isCompleted)
          }
        >
          <p>{modifyTodoInputValue}</p>

          {isModify && (
            <ModifyInput
              type="text"
              isModify={isModify}
              value={modifyTodoInputValue}
              onChange={handleChangeInputValue}
              placeholder="Todo를 작성해 주세요."
            />
          )}
        </Title>

        <BtnContainer>
          <ModifyBtn
            onClick={() => handleClickModifyButton(todo)}
            type="button"
            isModify={isModify}
          >
            수정
          </ModifyBtn>
          <DeleteBtn
            onClick={() => handleDeleteTodo(id, modifyTodoInputValue)}
            type="button"
            isModify={isModify}
          >
            삭제
          </DeleteBtn>

          <SubmitBtn type="submit" isModify={isModify}>
            제출
          </SubmitBtn>
          <CloseModifyBtn
            onClick={handleClickCancelButton}
            type="button"
            isModify={isModify}
          >
            취소
          </CloseModifyBtn>
        </BtnContainer>
      </Form>
    </Container>
  );
}

export default List;
