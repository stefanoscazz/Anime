import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { descriptionAction } from "../slice/descriptionSlice";
import db, { auth } from "../firebase.js";

export const DescriptionPage = ({ location }) => {
  const dispatch = useDispatch();
  const descriptionState = useSelector((state) => state.description);
  const id_user = useSelector((state) => state.user.id);
  const favorites = useSelector((state) => state.user.favorites);
  const [animeList, setAnimeList] = useState(false);
  const [message, setMessage] = useState(false);
  const id_anime = location.state;
  const {
    title,
    duration,
    image_url,
    trailer_url,
    status_anime,
    synopsis,
    episodes,
  } = descriptionState;
  useEffect(() => {
    dispatch(descriptionAction(id_anime));
    favoritesList();
  }, [favorites, title]);

  const handleRemove = () => {
    setAnimeList(false);
    return db
      .collection("user")
      .doc(id_user)
      .collection("preferiti")
      .doc(title)
      .delete();
  };

  const handleAdd = () => {
    setAnimeList(true);
    return db
      .collection("user")
      .doc(id_user)
      .collection("preferiti")
      .doc(title)
      .set({
        title: title,
        description: synopsis,
        img_url: image_url,
        id: id_anime,
      });
  };

  const favoritesList = () => {
    const currentFavorites = favorites.filter((el) => el.title === title);
    if (currentFavorites.length > 0) {
      if (currentFavorites && currentFavorites[0].title === title) {
        setAnimeList(true);
        console.log("presente");
      }
    } else {
      setAnimeList(false);
      console.log("non presente");
    }
  };
  return (
    <div>
      <FirstSection>
        <ImgContainer>
          <img src={image_url} alt="" />
          {animeList ? (
            <ButtonRemoveList onClick={handleRemove}>Remove</ButtonRemoveList>
          ) : (
            <ButtonAddList onClick={handleAdd}>Add to List</ButtonAddList>
          )}
          <div>{message ? <p>Login to add a list</p> : null}</div>
        </ImgContainer>

        <DescriptionSection>
          <h1>{title}</h1>
          <p>{synopsis}</p>
        </DescriptionSection>
      </FirstSection>
    </div>
  );
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
