import React, { useReducer, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { descriptionAction } from "../slice/descriptionSlice";
import db, { auth } from "../firebase.js";
import { addFavoritesAction } from "../slice/favoritesSlice";
import { isEmpty } from "lodash";
import { CircularProgress } from "@material-ui/core";

export const DescriptionPage = ({ location }) => {
  const dispatch = useDispatch();
  const descriptionState = useSelector((state) => state.description);
  const id_user = useSelector((state) => state.user.id);
  const favorites = useSelector((state) => state.favorites);
  const [message, setMessage] = useState(false);
  const id_anime = location.pathname.slice(13);
  const [displayButton, setdisplayButton] = useState(false);
  const [disabledButton, setdisabledButton] = useState(false);

  const {
    title,
    duration,
    image_url,
    trailer_url,
    status_anime,
    synopsis,
    episodes,
    status,
  } = descriptionState;
  useEffect(() => {
    dispatch(descriptionAction(id_anime));
  }, []);
  useEffect(() => {
    checkCurrentAnime();
  }, [favorites.status, auth.currentUser]);

  const displayAnime = () => {
    if (status === "success") {
      return (
        <>
          <FirstSection>
            <ImgContainer>
              <img src={image_url} alt="" />
              {displayButton ? (
                <ButtonRemoveList onClick={handleRemove}>
                  Remove
                </ButtonRemoveList>
              ) : (
                <ButtonAddList disabled={disabledButton} onClick={handleAdd}>
                  Add to List
                </ButtonAddList>
              )}
            </ImgContainer>
            <DescriptionSection>
              <h1>{title}</h1>
              <p>{synopsis}</p>
            </DescriptionSection>
          </FirstSection>
        </>
      );
    }
    if (status === "loading") {
      return <CircularProgress />;
    }
    if (status === "failed") {
      return <h1>Errore</h1>;
    }
  };

  const checkCurrentAnime = () => {
    if (auth.currentUser && favorites.status === "success") {
      const filter = favorites.list.filter((el) => el.id === id_anime);
      if (!isEmpty(filter)) {
        setdisplayButton(true);
      } else {
        setdisplayButton(false);
      }
    } else if (!auth.currentUser) {
      setdisplayButton(false);
      setdisabledButton(true);
    }
  };
  console.log(disabledButton);
  const handleRemove = () => {
    db.collection("user")
      .doc(id_user)
      .collection("preferiti")
      .doc(title)
      .delete()
      .then(() => dispatch(addFavoritesAction(id_user)));
  };
  const handleAdd = () => {
    db.collection("user").doc(id_user).collection("preferiti").doc(title).set({
      title: title,
      description: synopsis,
      img_url: image_url,
      id: id_anime,
    });
    dispatch(addFavoritesAction(id_user));
  };

  return <div>{displayAnime()}</div>;
};
const ImgContainer = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    border-radius: 10px;
  }
`;
const FirstSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DescriptionSection = styled.div`
  margin-left: 20px;
  color: rgb(51, 51, 51);
  p {
    width: 600px;
  }
`;

const ButtonAddList = styled.button`
  background: rgb(2, 169, 255);
  border-radius: 4px;
  color: white;
  border: none;
  padding: 0px 18px;
  height: 30px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
`;
const ButtonRemoveList = styled.button`
  background: red;
  border-radius: 4px;
  color: white;
  border: none;
  padding: 0px 18px;
  height: 30px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
`;
