import { Response } from "../common/types/interface";

const baseUrl = String(process.env.REACT_APP_SERVER_URL);

const get = async <T extends Response>(endpoint: string) => {
  const url = baseUrl + endpoint;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const result: T = await res.json();

  if (result.statusCode >= 400) {
    alert(result.message);
    throw new Error(result.error);
  }

  return result;
};

const post = async <T extends Response, U>(endpoint: string, data: U) => {
  const url = baseUrl + endpoint;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  const result: T = await res.json();

  if (result.statusCode >= 400) {
    alert(result.message);
    throw new Error(result.error);
  }

  return result;
};

const put = async <T extends Response, U>(endpoint: string, data: U) => {
  const url = baseUrl + endpoint;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  const result: T = await res.json();

  if (result.statusCode >= 400) {
    alert(result.message);
    throw new Error(result.error);
  }

  return result;
};

const del = async (endpoint: string) => {
  const url = baseUrl + endpoint;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status >= 400) {
    alert("요청이 실패 했습니다!");
  }
  console.log(res);
};

export { post, get, put, del as delete };
