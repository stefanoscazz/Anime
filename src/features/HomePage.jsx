import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CardAnime } from "../components/CardAnime";
import WhatshotTwoToneIcon from "@material-ui/icons/WhatshotTwoTone";
import { useEffect } from "react";
import { topAnimeAction } from "../slice/topAnimeSlice";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { v4 as uuidv4 } from "uuid";

export const HomePage = () => {
  const dispatch = useDispatch();
  const listTopAnime = useSelector((state) => state.top.list);
  const statusTopAnime = useSelector((state) => state.top.status);
  const listSearchAnime = useSelector((state) => state.search.list);
  const statusSearchAnime = useSelector((state) => state.search.status);

  //ACTION TO DISPLAY TOP ANIME

  useEffect(() => {
    dispatch(topAnimeAction());
  }, []);
  const displayTopAnime = () => {
    if (statusTopAnime === "loading") {
      return <CircularProgress />;
    }
    if (statusTopAnime === "failed") {
      return <h1> No connection, please connect and try again</h1>;
    }
    if (statusTopAnime === "success") {
      return listTopAnime.map((el) => {
        return (
          <Link
            key={uuidv4()}
            style={{ textDecoration: "none", color: "black" }}
            to={{ pathname: `/description/${el.mal_id}` }}
          >
            <CardAnime data={el} key={el.mal_id} />
          </Link>
        );
      });
    }
  };

  //ACTION TO DISPLAY SEARCH ANIME

  const displaySearchAnime = () => {
    if (statusSearchAnime === "loading") {
      return <CircularProgress />;
    }
    if (statusSearchAnime === "failed") {
      return displayTopAnime();
    }
    if (statusSearchAnime === "success") {
      return listSearchAnime.map((el) => {
        return (
          <Link
            key={uuidv4()}
            style={{ textDecoration: "none", color: "black" }}
            to={{ pathname: `/description/${el.mal_id}` }}
          >
            <CardAnime data={el} key={el.mal_id} />
          </Link>
        );
      });
    }
  };

  return (
    <HomeContainer>
      {!statusSearchAnime || statusSearchAnime === "failed" ? (
        <Top>
          <h3>
            TOP{" "}
            <WhatshotTwoToneIcon
              style={{ color: "#cc0000", fontSize: "30px" }}
            />
          </h3>
        </Top>
      ) : null}

      <CardSection>
        {statusSearchAnime ? displaySearchAnime() : displayTopAnime()}
      </CardSection>
    </HomeContainer>
  );
};
const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;
const CardSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
`;
const Top = styled.div`
  height: 50px;
  padding-left: 10px;
  width: 80vw;
  border-bottom: 2px solid #ddd;
  margin-bottom: 10px;
  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-style: italic;
    letter-spacing: 7px;
    color: rgb(51, 51, 51);
    font-weight: 900;
  }
`;
