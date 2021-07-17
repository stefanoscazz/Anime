import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { descriptionAction } from "../slice/descriptionSlice";
import { isEmpty } from "lodash";
import { charactersAction } from "../slice/charactersSlice";
import { DescriptionLogged } from "../components/DescriptionLogged";
import { DescriptionGuest } from "../components/DescriptionGuest";



export const DescriptionPage = ({ location }) => {
  const authUser = window.sessionStorage;
  const dispatch = useDispatch();
  const description = useSelector((state) => state.description);
  const id_anime = location.pathname.slice(13);
  useEffect(() => {
    dispatch(descriptionAction(id_anime));
    dispatch(charactersAction(id_anime));
  }, [dispatch, id_anime])

  return <div>{isEmpty(authUser) ? <DescriptionGuest data={description} /> :
    <DescriptionLogged data={description} />}</div>;
};

