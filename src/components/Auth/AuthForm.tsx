import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../common/utils/constant";
import { Response } from "../../common/types/interface";
import { checkEmail, checkPassword } from "../../common/utils/checkValid";
import { post } from "../../api/api";
import { Container } from "./AuthForm.style";

interface AuthFormProp {
  isLoginPage: boolean;
  handleSetIsLoginPage: (isLogin: boolean) => void;
}

interface TokenValue extends Response {
  access_token: string;
}

interface AuthValues {
  email: string;
  password: string;
}

function AuthForm({ isLoginPage, handleSetIsLoginPage }: AuthFormProp) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<AuthValues>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((cur) => {
      const newValues = { ...cur };
      newValues[e.target.name as keyof AuthValues] = e.target.value;
      return newValues;
    });
  };

  const postForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginPage) {
      const token = await post<TokenValue, AuthValues>(
        "/auth/signin",
        formValues
      );
      console.log("token", token);

      localStorage.setItem("token", token.access_token);
      redirectToTodoPage();
    } else {
      await post<TokenValue, AuthValues>("/auth/signup", formValues);
      changeRegisterToLogin();
    }
  };

  const changeRegisterToLogin = () => {
    alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
    setFormValues((cur) => {
      return {
        ...cur,
        password: "",
      };
    });
    handleSetIsLoginPage(true);
  };

  const redirectToTodoPage = () => {
    navigate(ROUTE.TODO);
  };

  return (
    <form onSubmit={postForm}>
      <Container>
        <label>
          이메일
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </label>
      </Container>
      <Container>
        <label>
          비밀번호
          <input
            type="password"
            name="password"
            value={formValues.password}
            autoComplete="true"
            onChange={handleChange}
          />
        </label>
      </Container>
      {
        <input
          type="submit"
          value="Submit"
          disabled={
            !(
              checkEmail(formValues.email) && checkPassword(formValues.password)
            )
          }
        />
      }
    </form>
  );
}

export default AuthForm;
