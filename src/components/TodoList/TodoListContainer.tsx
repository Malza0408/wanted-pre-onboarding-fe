import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/api";
import { Response } from "../../common/types/interface";
import { API_URL } from "../../common/utils/constant";
import List from "./List";
import {
  TodoListContainer as OuterContainer,
  InnerContainer,
  Title,
  PostForm,
} from "./TodoListContainer.style";

interface TodoValues {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

interface PostTodoValue {
  todo: string;
}

interface UpdateTodoValues {
  todo: string;
  isCompleted: boolean;
}

type PostTodoType = TodoValues & Response;
type GetTodosType = TodoValues[] & Response;

function TodoListContainer() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState<TodoValues[]>([]);
  const [addTodoInputValue, setAddTodoInputValue] = useState("");

  const postTodoList = () => {
    return api.post<PostTodoType, PostTodoValue>(API_URL.TODO, {
      todo: addTodoInputValue,
    });
  };

  const getTodoList = async () => {
    const result = await api.get<GetTodosType>(API_URL.TODO);
    setTodoList(result);
  };

  const postAndGetTodoList = async (e: React.FormEvent) => {
    e.preventDefault();
    await postTodoList();
    await getTodoList();
    clearTodoInput();
  };

  const updateTodoList = async (
    todo: string,
    id: number,
    isCompleted: boolean
  ) => {
    await api.put<PostTodoType, UpdateTodoValues>(`${API_URL.TODO}/${id}`, {
      todo,
      isCompleted,
    });
  };

  const deleteTodoList = (id: number) => {
    return api.delete(`${API_URL.TODO}/${id}`);
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoList(id);
    await getTodoList();
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

  const handleIsCompleteTodo = (id: number) => {
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
    const getTodos = async () => {
      await getTodoList();
    };
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
