import React, { useReducer, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { descriptionAction } from "../slice/descriptionSlice";
import db, { auth } from "../firebase.js";
import { addFavoritesAction } from "../slice/favoritesSlice";
import { isEmpty } from "lodash";
import { CircularProgress } from "@material-ui/core";
import { charactersAction } from "../slice/charactersSlice";

export const DescriptionPage = ({ location }) => {
  const dispatch = useDispatch();
  const descriptionState = useSelector((state) => state.description);
  const characters = useSelector((state) => state.characters);
  const id_user = useSelector((state) => state.user.id);
  const favorites = useSelector((state) => state.favorites);
  const [message, setMessage] = useState(false);
  const id_anime = location.pathname.slice(13);
  console.log(location);
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
    title_english,
    title_japanese,
    source,
    score,
  } = descriptionState;
  console.log(trailer_url);
  useEffect(() => {
    dispatch(descriptionAction(id_anime));
    dispatch(charactersAction(id_anime));
  }, []);
  useEffect(() => {
    checkCurrentAnime();
  }, [favorites.status, auth.currentUser]);

  const displayAnime = () => {
    if (status === "success") {
      return (
        <>
          <MainSection>
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
          </MainSection>

          <InfoSection>
            <Sidebar>
              <p>
                Episodes: <span>{episodes}</span>
              </p>
              <p>
                Duration: <span>{duration}</span>
              </p>
              <p>
                Status Anime:<span>{status_anime}</span>{" "}
              </p>
              <p>
                Title English: <span>{title_english}</span>
              </p>
              <p>
                Title Japanese: <span>{title_japanese}</span>
              </p>
              <p>
                Source: <span>{source}</span>
              </p>
              <p>
                Score: <span>{score}</span>
              </p>
            </Sidebar>
            <LeftSection>
              <h2>Main Characters</h2>
              <Characters>
                {!isEmpty(characters.list) &&
                  characters.list.map((el) => {
                    return (
                      <CharacterBox key={el.mal_id}>
                        <img src={el.image_url} alt="" />
                        <p>{el.name}</p>
                      </CharacterBox>
                    );
                  })}
              </Characters>
              <h2>Trailer</h2>
              <iframe width="350" height="250" src={trailer_url}></iframe>
              <Trailer></Trailer>
            </LeftSection>
          </InfoSection>
        </>
      );
    }
    if (status === "loading") {
      return (
        <div>
          <CircularProgress />
        </div>
      );
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
const MainSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
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
const InfoSection = styled.div`
  display: flex;
  justify-content: center;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;

  p,
  span {
    width: 200px;
    margin: 10px;
    letter-spacing: 2px;
    color: rgb(51, 51, 51);
  }
  span {
    font-weight: bold;
  }
`;
const LeftSection = styled.div`
  flex-grow: 3;

  img {
    width: 100px;
    height: 160px;
    margin: 10px;
  }
`;
const Characters = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const CharacterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    width: 100px;
    height: 100px;
  }
`;

const Trailer = styled.div``;
