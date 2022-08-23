import React, { useState } from "react";
import {
  BtnContainer,
  CloseModifyBtn,
  Container,
  DeleteBtn,
  Form,
  ModifyBtn,
  ModifyInput,
  Title,
  UpdateBtn,
} from "./index.style";

interface ListProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
  handleIsCompleteTodo: (
    todo: string,
    id: number,
    isCompleted: boolean
  ) => void;
  handleDeleteTodo: (id: number) => void;
  handleUpdateTodo: (todo: string, id: number, isCompleted: boolean) => void;
}

function List({
  id,
  todo,
  isCompleted,
  userId,
  handleIsCompleteTodo,
  handleDeleteTodo,
  handleUpdateTodo,
}: ListProps) {
  const [isModify, setIsModify] = useState(false);
  const [modifyTodoInputValue, setModifyTodoInputValue] = useState(todo);
  const [tempInputValue, setTempInputValue] = useState(todo);

  const handleClickUpdateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModify(false);
    handleUpdateTodo(todo, id, isCompleted);
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
      <Form onSubmit={handleClickUpdateTodo}>
        <Title
          isCompleted={isCompleted}
          isModify={isModify}
          onClick={() => handleIsCompleteTodo(todo, id, !isCompleted)}
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
            onClick={() => handleDeleteTodo(id)}
            type="button"
            isModify={isModify}
          >
            삭제
          </DeleteBtn>

          <UpdateBtn type="submit" isModify={isModify}>
            제출
          </UpdateBtn>
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
