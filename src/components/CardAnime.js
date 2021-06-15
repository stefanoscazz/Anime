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
      <p>{data.title}</p>
      <AddIconSection>
        {addButton ? (
          <Fab onClick={handleClickDelete} size="small" color="secondary">
            <HighlightOffIcon />
          </Fab>
        ) : (
          <Fab onClick={handleClickAdd} size="small" color="primary">
            <AddIcon />
          </Fab>
        )}
      </AddIconSection>
      <ButtonDescription>Learn more</ButtonDescription>
    </CardAnimeContainer>
  );
};
const CardAnimeContainer = styled.div`
  box-shadow: rgba(49, 49, 49, 0.4) 5px 5px, rgba(49, 49, 49, 0.3) 10px 10px,
    rgba(49, 49, 49, 0.2) 15px 15px, rgba(48, 48, 48, 0.1) 20px 20px,
    rgba(49, 49, 49, 0.05) 25px 25px;
  border-radius: 30px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
  height: 370px;
  img {
    width: 180px;
    height: 220px;
  }
  p {
    width: 180px;
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
