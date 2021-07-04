import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { auth } from "../firebase";

export const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const displayFavorites = () => {
    if (user.id) {
      return <h1>Loggato</h1>;
    } else {
      return <h1>non logagto</h1>;
    }
  };

  return (
    <div>
      <h1>{displayFavorites()}</h1>
    </div>
  );
};
