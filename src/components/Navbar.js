import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>anime list</Logo>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <form action="">
          <input placeholder="search an anime" type="text" />
          <ButtonSearch type="submit">
            <SearchIcon />
          </ButtonSearch>
        </form>
        <Link to="/login">
          <ButtonLogin>Login</ButtonLogin>
        </Link>
      </div>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  background-color: rgb(0, 111, 230);
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
