import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { useState } from "react";
import { searchAction } from "../slice/searchSlice";
import { useDispatch } from "react-redux";

export const Navbar = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      dispatch(searchAction(inputValue));
    }
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <NavbarContainer>
      <Logo>anime list</Logo>

      {profile ? (
        <img
          src="https://lh3.googleusercontent.com/ogw/ADea4I7RxZpz6dEnuOQOFQLxNZhENdOtUnrP8YIBcSKU=s32-c-mo"
          alt=""
        />
      ) : null}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            value={inputValue}
            onChange={handleOnChange}
            placeholder="search an anime"
            type="text"
          />
          <ButtonSearch type="submit">
            <SearchIcon />
          </ButtonSearch>
        </form>
        <Link to="/login">
          <ButtonLogin>Login</ButtonLogin>
        </Link>
        <Link to="/">
          <ButtonHome>
            <HomeIcon />
          </ButtonHome>
        </Link>
      </div>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
  height: 15vh;
  flex-wrap: wrap;
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    justify-content: center;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    input {
      width: 170px;
      line-height: normal;
      min-height: 16px;
      border: 1px solid #ddd;
      font-size: 14px;
      border-radius: 16px;
      color: #111;
      padding: 6px 12px;
      outline: none;
    }
  }
`;

const Logo = styled.h1`
  font-style: italic;
  font-family: "Courier New";
  letter-spacing: 7px;
  color: rgb(51, 51, 51);
`;
const ButtonLogin = styled.button`
  font-weight: 700;
  width: 70px;
  font-size: 14px;
  height: 30px;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  background-color: #183c7a;
  color: white;
  padding: 0px 14px;
  border: none;
`;

const ButtonSearch = styled.button`
  margin: 10px;
  border: none;
  background-color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 20px;
  &:hover {
    background-color: #929292;
    color: white;
  }
`;
const ButtonHome = styled.button`
  margin: 10px;
  border: none;
  background-color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 20px;
  &:hover {
    background-color: #929292;
    color: white;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    margin: 0;
  }
`;
