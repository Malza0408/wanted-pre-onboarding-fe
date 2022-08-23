import { Response } from "../../common/types/response";

export interface TodoValues {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface PostTodoValue {
  todo: string;
}

export interface UpdateTodoValues {
  todo: string;
  isCompleted: boolean;
}

export type PostTodoType = TodoValues & Response;
export type GetTodosType = TodoValues[] & Response;
