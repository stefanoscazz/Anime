import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { FormHelperText, TextField } from "@material-ui/core";
import { setUserLogOutState } from "../slice/userSlice";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorInput, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (strongRegex.test(password) && password === confirmPass) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredetial) => {
          setSuccess(true)
        }).then(() => {
          auth
            .signOut()
            .then(dispatch(setUserLogOutState()))
            .catch((err) => {
              console.log(err)
              setMessageError(err.message);
            });
        })
        .catch((error) => {
          setError(true);
          setMessageError(error.message);
        });
    } else {
      validationError();
    }
  };

  // VALIDATION ERROR HELPERTEXT
  const validationError = () => {
    setError(true);
    if (password !== confirmPass) {
      setMessageError("passwords not match");
    }
    if (!strongRegex.test(password)) {
      setMessageError(
        "minimum 8 digit atleast one uppercase letter  and one non alphanumeric symbol ('&!?@')"
      );
    }
  };
  //  HOOK STATE INPUT VALUE SU ONVCHANGE

  const onChangePass = (e) => setPassword(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const handleConfirmPass = (e) => setConfirmPass(e.target.value);
  const displayRegister = () => {
    if (!success) {
      return (
        <Register>
          <Title>Register</Title>
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
            <TextField
              onChange={handleConfirmPass}
              value={confirmPass}
              size="small"
              type="password"
              id="confirm-password"
              label="Confirm Password"
              variant="outlined"
            />
            {errorInput ? (
              <FormHelperText error id="confirm-password">
                {messageError}
              </FormHelperText>
            ) : null}

            <ButtonRegister size="small" type="submit">
              Register
            </ButtonRegister>
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
    } else {
      return <Redirect to="/login" />;
    }
  };
  return <div>{displayRegister()}</div>;
};

const Register = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  form {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 360px;
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
  margin-top: 10px;
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
