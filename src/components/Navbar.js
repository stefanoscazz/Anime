import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { Link, Redirect } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { useState } from "react";
import { searchAction } from "../slice/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { setUserLogOutState } from "../slice/userSlice";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export const Navbar = () => {
  //Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log("da Navbar", auth.currentUser);
  //Redux State
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const id = useSelector((state) => state.user.id);
  const isLog = auth.currentUser;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      dispatch(searchAction(inputValue));
    }
  };

  const handleOnChange = (e) => {
    dispatch(searchAction(e.target.value));
    setInputValue(e.target.value);
  };
  const handleLogOut = () => {
    sessionStorage.clear();
    auth
      .signOut()
      .then(dispatch(setUserLogOutState()))
      .catch((err) => alert(err.message));
  };
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
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/">
              <Button>
                <HomeIcon />
              </Button>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {" "}
            {!isLog ? (
              <Link style={{ textDecoration: "none" }} to="/login">
                <Button>Login</Button>
              </Link>
            ) : (
              <Button onClick={handleLogOut}>Logout</Button>
            )}
          </MenuItem>
        </Menu>
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
  height: 100px;
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
