import { useState } from "react";
import {
  BtnContainer,
  CloseModifyBtn,
  Container,
  DeleteBtn,
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

  const handleClickUpdateTodo = (
    todo: string,
    id: number,
    isCompleted: boolean
  ) => {
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
      <Title
        isCompleted={isCompleted}
        isModify={isModify}
        onClick={() => handleIsCompleteTodo(todo, id, !isCompleted)}
      >
        <p>{modifyTodoInputValue}</p>
      </Title>
      <ModifyInput
        type="text"
        isModify={isModify}
        value={modifyTodoInputValue}
        onChange={handleChangeInputValue}
      />

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
        <UpdateBtn
          onClick={() =>
            handleClickUpdateTodo(modifyTodoInputValue, id, isCompleted)
          }
          type="submit"
          isModify={isModify}
        >
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
    </Container>
  );
}

export default List;
