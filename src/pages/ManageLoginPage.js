import React, { useState } from "react";
import { Link, json } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/headerImg/logo.png";
import axios from "axios";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 50%;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 445px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  border-radius: 5px;
  text-align: center;
  /* margin-top: 0; */
  img {
    width: 100%;
    height: 25px;
    margin-top: 56px;
    margin-bottom: 27px;
  }
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    width: 440px;
    height: 60px;
  }
  input::placeholder {
    color: rgba(153, 153, 153);
    font-weight: 500;
    font-size: 16px;
    line-height: 21.79px;
  }
  input[type="text"] {
    border: 1px solid rgba(153, 153, 153, 0.5);
    border-radius: 5px;
    padding-left: 20px;
    font-size: 20px;
  }
  input[type="password"] {
    border: 1px solid rgba(153, 153, 153, 0.5);
    border-radius: 5px;
    padding-left: 20px;
    font-size: 20px;
    margin-top: 8px;
  }
  input[type="submit"] {
    width: 460px;
    border: none;
    border-radius: 5px;
    background-color: #fc1055;
    color: white;
    font-size: 20px;
    font-weight: 500;
    line-height: 21.79px;
    margin-top: 33px;
    cursor: pointer;
  }
`;

const Checkbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 33px;
  input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(153, 153, 153, 0.5);
    border-radius: 3px;
    margin-right: 6px;
  }
  input:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #FC1055;
  }
  label {
    font-size: 16px;
    margin-right: 16px;
  }
`;

const ManageLoginPage = () => {
  const [inputValue, setInputValue] = useState({
    id: "",
    pw: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const url = "http://localhost:8080/manage";

  const submit = async () => {
    try {
      const response = await axios.post(url, {
        id: inputValue.id,
        pw: inputValue.pw,
      });
      console.log(response);
      json.stringify(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <LoginBox>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Input>
          <input
            type="text"
            name="id"
            placeholder="아이디를 입력해주세요."
            onChange={inputChangeHandler}
          />
          <input
            type="password"
            name="pw"
            placeholder="비밀번호를 입력해주세요."
            onChange={inputChangeHandler}
          />
          <Checkbox>
            <input type="checkbox" name="로그인상태유지" id="still-login" />
            <label htmlFor="still-login">로그인 상태 유지</label>
            <input type="checkbox" name="아이디저장" id="save-id" />
            <label htmlFor="save-id">아이디 저장</label>
          </Checkbox>
          <input type="submit" onClick={submit} value="로그인" />
        </Input>
      </LoginBox>
    </Container>
  );
};
export default ManageLoginPage;
