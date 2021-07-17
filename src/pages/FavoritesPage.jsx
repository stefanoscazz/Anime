import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { isEmpty } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import db, { auth } from "../firebase";
import { removeFromList } from "../slice/favoritesSlice";



const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "calc(100vh - 150px)",
    padding: theme.spacing(3),
  },
  root: {
    display: "flex",
  },

  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  grid: {
    margin: theme.spacing(3),
  },
}));

export const FavoritesPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);

  if (
    auth.currentUser &&
    !isEmpty(favorites.list) &&
    favorites.status === "success"
  ) {
    return (
      <Container className={classes.container} maxWidth="lg">
        <Typography variant="h3">Favorites</Typography>
        {favorites.list.map((el) => {
          return (
            <Grid className={classes.grid} xs={12} sm={6}>
              <Card className={classes.root}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {el.title}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {el.description.slice(0, 100)}{" "}
                      <Link to={{ pathname: `/description/${el.id}` }}>
                        {" "}
                        Continue reading...
                      </Link>
                    </Typography>
                  </CardContent>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                  ></Typography>
                  <div className={classes.controls}>
                    <Button
                      onClick={() => {
                        db.collection("user")
                          .doc(user.id)
                          .collection("preferiti")
                          .doc(el.title)
                          .delete()
                          .then(() => dispatch(removeFromList(el.id)));
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <img
                  style={{ height: "250px", width: "290px" }}
                  src={el.img_url}
                  alt=""
                />
              </Card>
            </Grid>
          );
        })}
      </Container>
    );
  }
  if (
    auth.currentUser &&
    isEmpty(favorites.list) &&
    favorites.status === "success"
  ) {
    return (
      <Container className={classes.container} maxWidth="lg">
        <Typography variant="h3">Favorites list is empty</Typography>
        <Typography variant="h6">
          return to <Link to="/">home</Link>
        </Typography>
      </Container>
    );
    //
  }
  if (auth.currentUser) {
    return (
      <Container className={classes.container} maxWidth="lg">
        <Typography variant="h3">You're not logged in</Typography>
        <Typography variant="h6">
          <Link to="/login"> log in</Link> or return to{" "}
          <Link to="/">home</Link>
        </Typography>
      </Container>
    );
  }
  return (
    <Container className={classes.container} maxWidth="lg">

    </Container>
  )
};