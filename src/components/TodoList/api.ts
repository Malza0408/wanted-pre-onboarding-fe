import * as api from "../../api/api";
import {
  GetTodosType,
  PostTodoType,
  PostTodoValue,
  UpdateTodoValues,
} from "../../common/types/todolist";
import { API_URL } from "../../common/utils/constant";

export const postTodoList = (todo: string) => {
  return api.post<PostTodoType, PostTodoValue>(API_URL.TODO, {
    todo,
  });
};

export const getTodoList = () => {
  return api.get<GetTodosType>(API_URL.TODO);
};

export const updateTodoList = (
  todo: string,
  id: number,
  isCompleted: boolean
) => {
  return api.put<PostTodoType, UpdateTodoValues>(`${API_URL.TODO}/${id}`, {
    todo,
    isCompleted,
  });
};

export const deleteTodoList = (id: number) => {
  return api.delete(`${API_URL.TODO}/${id}`);
};
