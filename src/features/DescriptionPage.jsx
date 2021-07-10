import React, { useReducer, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { descriptionAction } from "../slice/descriptionSlice";
import db, { auth } from "../firebase.js";
import { addFavoritesAction } from "../slice/favoritesSlice";
import { isEmpty } from "lodash";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { charactersAction } from "../slice/charactersSlice";
import { DescriptionLogged } from "../components/DescriptionLogged";
import { useLocation } from "react-router-dom";



export const DescriptionPage = ({ location }) => {
  const authUser = window.sessionStorage;
  const dispatch = useDispatch();
  const description = useSelector((state) => state.description);
  const characters = useSelector((state) => state.characters);
  const id_user = useSelector((state) => state.user.id);
  const favorites = useSelector((state) => state.favorites);
  const [message, setMessage] = useState(false);
  const id_anime = location.pathname.slice(13);


  const [displayButton, setdisplayButton] = useState(false);
  const [disabledButton, setdisabledButton] = useState(null);



  useEffect(() => {
    dispatch(descriptionAction(id_anime));
    dispatch(charactersAction(id_anime));
  }, []);








  return <div>{!isEmpty(authUser) ? <DescriptionLogged data={description} /> : null}</div>;
};

