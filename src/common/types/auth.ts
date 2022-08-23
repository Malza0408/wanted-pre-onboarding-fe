import { Response } from "../../common/types/response";
export interface TokenValue extends Response {
  access_token: string;
}

export interface AuthValues {
  email: string;
  password: string;
}
