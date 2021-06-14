import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const RegisterPage = () => {
  return (
    <Register>
      <Title>Register</Title>
      <form action="">
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <ButtonRegister type="submit"> Register</ButtonRegister>
        <ButtonGoogle>
          Continue with Google
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt=""
          />
        </ButtonGoogle>
        <Link to="/login">
          <p>Already have an account?</p>
        </Link>
      </form>
    </Register>
  );
};

const Register = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  input {
    width: 280px;
    line-height: normal;
    min-height: 48px;
    border: 1px solid #ddd;
    font-size: 16px;
    border-radius: 16px;
    color: #111;
    padding: 8px 16px;
    outline: none;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 300px;
    flex-direction: column;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;
const Title = styled.h1`
  margin-bottom: 50px;
  font-size: 35px;
  color: rgb(51, 51, 51);
`;
const ButtonGoogle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: 700;
  width: 250px;
  border: 2px solid #ddd;
  font-size: 14px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: white;
  color: #3c4043;
  padding: 0px 18px;
`;
const ButtonRegister = styled.button`
  font-weight: 700;
  width: 250px;
  font-size: 14px;
  height: 40px;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  background-color: rgb(0, 111, 230);
  color: white;
  padding: 0px 18px;
  border: none;
`;
