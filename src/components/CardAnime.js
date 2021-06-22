import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export const CardAnime = ({ data }) => {
  // data da HomePage
  const [addButton, setAddButton] = useState(false);
  const handleClickAdd = () => {
    setAddButton(true);
  };
  const handleClickDelete = () => {
    setAddButton(false);
  };
  return (
    <CardAnimeContainer>
      <img src={data.image_url} alt="" />
      <p>
        {data.title.length > 30 ? data.title.slice(0, 30) + "..." : data.title}
      </p>
    </CardAnimeContainer>
  );
};
const CardAnimeContainer = styled.div`
  
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 370px;

  img {
    border-radius: 10px;
    width: 180px;
    height: 220px;
  }
  p {
    height: 100px;
    width: 140px;
  }
  @media all and (max-width: 480px) {
    width: 160px;
    height: 220px;
    margin: 20px;
    img {
      max-width: 140px;
      height: 180px;
    }
    p {
      width: 100px;
      height: 40px;
    }
  }
`;

const AddIconSection = styled.div`
  align-self: flex-end;
  margin: 10px;
`;

const ButtonDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: 700;
  width: 150px;
  border: 2px solid #ddd;
  font-size: 12px;
  height: 30px;
  border-radius: 20px;
  cursor: pointer;
  background-color: white;
  color: #3c4043;
  padding: 0px 18px;
  &:hover {
    color: white;
    background-color: #929292;
  }
`;
