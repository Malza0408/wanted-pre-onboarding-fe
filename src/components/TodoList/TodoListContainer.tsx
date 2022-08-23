import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoValues } from "../../common/types/todolist";
import {
  deleteTodoList,
  getTodoList,
  postTodoList,
  updateTodoList,
} from "./api";
import List from "./List";
import {
  TodoListContainer as OuterContainer,
  InnerContainer,
  Title,
  PostForm,
} from "./TodoListContainer.style";

function TodoListContainer() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState<TodoValues[]>([]);
  const [addTodoInputValue, setAddTodoInputValue] = useState("");

  const getTodos = async () => {
    const result = await getTodoList();
    setTodoList(result);
  };

  const postAndGetTodoList = async (e: React.FormEvent) => {
    e.preventDefault();
    await postTodoList(addTodoInputValue);
    getTodos();
    clearTodoInput();
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoList(id);
    getTodos();
  };

  const handleUpdateTodo = async (
    todo: string,
    id: number,
    isCompleted: boolean
  ) => {
    await updateTodoList(todo, id, isCompleted);
    handleChangeUpdateTodo(todo, id);
  };

  const clearTodoInput = () => {
    setAddTodoInputValue("");
  };
  const handleChangeAddTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTodoInputValue(e.target.value);
  };

  const handleIsCompleteTodo = async (
    todo: string,
    id: number,
    isCompleted: boolean
  ) => {
    setTodoList((cur) => {
      return cur.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        } else {
          return todo;
        }
      });
    });
    await updateTodoList(todo, id, isCompleted);
  };
  const handleChangeUpdateTodo = (todo: string, id: number) => {
    setTodoList((cur) => {
      return cur.map((curTodo) => {
        if (curTodo.id === id) {
          return {
            ...curTodo,
            todo,
          };
        } else {
          return curTodo;
        }
      });
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    getTodos();
  }, []);

  return (
    <OuterContainer>
      <Title>Today Todo List</Title>
      <InnerContainer>
        <PostForm>
          <form onSubmit={postAndGetTodoList}>
            <label>
              Add Todo List
              <input
                type="text"
                name="todoList"
                value={addTodoInputValue}
                onChange={handleChangeAddTodo}
              />
            </label>
            <input type="submit" value="할 일 추가" />
          </form>
        </PostForm>
        {todoList && (
          <ul>
            {todoList?.map((todo, index) => (
              <List
                {...todo}
                key={`key-${index}`}
                handleIsCompleteTodo={handleIsCompleteTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleUpdateTodo={handleUpdateTodo}
              />
            ))}
          </ul>
        )}
      </InnerContainer>
    </OuterContainer>
  );
}

export default TodoListContainer;
