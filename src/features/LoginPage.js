import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { setActiveUser } from "../slice/userSlice";

export const LoginPage = () => {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const handleSignInGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          setActiveUser({
            id: result.user.uid,
            userName: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email,
          })
        );
      })
      .catch((err) => alert(err.message));
  };
  const displayLogin = () => {
    if (!userId) {
      return (
        <Login>
          <Title>Login</Title>
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <ButtonLogin type="submit"> Log in</ButtonLogin>
            <ButtonGoogle onClick={handleSignInGoogle}>
              Continue with Google
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt=""
              />
            </ButtonGoogle>
            <Link to="/register">
              <p>Create an account</p>
            </Link>
          </form>
        </Login>
      );
    } else {
      return <Redirect to="/" />;
    }
  };
  return <div>{displayLogin()}</div>;
};

const Login = styled.div`
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
const ButtonLogin = styled.button`
  font-weight: 700;
  width: 250px;
  font-size: 14px;
  height: 40px;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  background-color: #183c7a;
  color: white;
  padding: 0px 18px;
  border: none;
`;
