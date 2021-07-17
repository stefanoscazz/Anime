import { Button, Container, Grid, makeStyles, Typography, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import db, { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addFavoritesAction } from "../slice/favoritesSlice";
import { useLocation } from "react-router-dom";
import { isEmpty } from "lodash";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    "&:disabled": {
      backgroundColor: "#3f51b5",
      color: "#fff",
    },
  },
  container: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(3),
    minHeight: "calc(100vh - 150px)"

  },
  main: {
    paddingBottom: theme.spacing(6),
    marginBottom: theme.spacing(6),
    borderBottom: "2px solid black",
  },
}));
// Component for logged user
export const DescriptionLogged = ({ data }) => {
  const { title,
    duration,
    image_url,
    trailer_url,
    status_anime,
    synopsis,
    episodes,
    title_english,
    title_japanese,
    source,
    score,
    status } = data;

  const location = useLocation()
  const id_anime = location.pathname.slice(13);
  const favorites = useSelector(state => state.favorites)
  const classes = useStyles();
  const id_user = useSelector((state) => state.user.id);
  const characters = useSelector((state) => state.characters);
  const [displayButton, setdisplayButton] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    checkCurrentAnime()
  }, [favorites.list])

  const checkCurrentAnime = () => {
    if (favorites.status === "success") {
      const filter = favorites.list.filter((el) => el.id === id_anime);
      console.log("filtrato", filter)
      if (!isEmpty(filter)) {
        setdisplayButton(true);
      } else {
        setdisplayButton(false);
      }
    } else if (!auth.currentUser) {
      setdisplayButton(false);
    }
  };



  const handleRemove = () => {
    setdisplayButton(true)
    db.collection("user")
      .doc(id_user)
      .collection("preferiti")
      .doc(title)
      .delete()
      .then(() => dispatch(addFavoritesAction(id_user)));

  };
  const handleAdd = () => {
    setdisplayButton(true)
    db.collection("user").doc(id_user).collection("preferiti").doc(title).set({
      title: title,
      description: synopsis,
      img_url: image_url,
      id: id_anime,
    });
    dispatch(addFavoritesAction(id_user));
  };
  //Conditional render based on application state
  // status = status descprition slice
  if (status === "success") {
    return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid
          className={classes.main}
          xs={12}
          sm={12}
          container
          justifyContent="center"
        >
          <Grid
            container
            justifyContent="center"
            style={{ flexDirection: "colomn" }}
            xs={12}
            sm={6}
          >
            <Grid
              xs={12}
              sm={6}
              container
              justifyContent="center"
              alignItems="center"
            >
              <img style={{ maxHeight: "350px" }} src={image_url} alt="" />
              {displayButton ? (
                <Button
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color="secondary"
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  className={classes.button}
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="primary"
                  onClick={handleAdd}
                >
                  Add to List
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} >
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1" gutterBottom>
              {synopsis}
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12} sm={12}>
          <Grid xs={12} sm={3}>
            <Typography variant="h4">Info</Typography>
            <Typography variant="body1" gutterBottom>
              Episodes:{episodes}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Duration: {duration}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Status Anime:{status_anime}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Title English: {title_english}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Title Japanese: {title_japanese}
            </Typography>

            <Typography variant="body1" gutterBottom>
              Source: {source}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Score: {score}
            </Typography>
          </Grid>
          <Grid container xs={12} sm={8}>
            <Typography variant="h4">Main Characters</Typography>
            <Grid container>
              {!isEmpty(characters.list) &&
                characters.list.map((el) => {
                  return (
                    <Grid key={el.mal_id}>
                      <img
                        style={{ height: "120px" }}
                        src={el.image_url}
                        alt=""
                      />
                      <p style={{ width: "120px" }}>{el.name}</p>
                    </Grid>
                  );
                })}
            </Grid>
            <Grid
              container
              style={{ flexDirection: "column", justifyContent: "center" }}
            >
              <Typography variant="h4">Trailer</Typography>

              <iframe width="320" height="230" title={title} src={trailer_url}></iframe>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  } else if (status === "loading") {
    return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid xs={12}
          sm={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size="100px" />
        </Grid>
      </Container>
    )
  }
  return (
    <Container maxWidth="lg" className={classes.container}>

    </Container>

  )
};
