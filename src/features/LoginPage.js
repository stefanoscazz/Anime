import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { FormHelperText, TextField } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { setActiveUser } from "../slice/userSlice";
import firebase from "firebase";
export const LoginPage = () => {
  const userId = useSelector((state) => state.user.id);
  const [errorInput, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const dispatch = useDispatch();
  const handleSignInGoogle = () => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
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
          .catch((err) => {
            console.log(err)
          });
      });
  };
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onChangePass = (e) => {
    setPassword(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        auth
          .signInWithEmailAndPassword(email, password)
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
          .catch((err) => {
            setError(true);
            setMessageError(err.message);
          });
      });
  };
  const displayLogin = () => {
    if (!userId) {
      return (
        <Login>
          <Title>Login</Title>
          <form action="" onSubmit={handleSubmit}>
            <TextField
              size="small"
              value={email}
              onChange={onChangeEmail}
              type="email"
              id="email"
              label="email"
              variant="outlined"
            />
            <TextField
              style={{ margin: "10px" }}
              size="small"
              value={password}
              onChange={onChangePass}
              type="password"
              id="password"
              label="password"
              variant="outlined"
            />
            {errorInput ? (
              <FormHelperText error id="password">
                {messageError}
              </FormHelperText>
            ) : null}
            <ButtonLogin type="submit"> Log in</ButtonLogin>
            <ButtonGoogle type="button" onClick={handleSignInGoogle}>
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
height: 400px;
   display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  form {
    height: 200px;
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
  width: 100%;
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
