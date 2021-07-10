import React from "react";
import { Link } from "react-router-dom";
import { CardAnime } from "../components/CardAnime";
import { useEffect } from "react";
import { topAnimeAction } from "../slice/topAnimeSlice";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { auth } from "../firebase";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
export const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLog = auth.currentUser;
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
      return <CardAnime data={listTopAnime} />;
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
      return <CardAnime data={listSearchAnime} />;
    }
  };

  return (
    <div>
      <div>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Anime List
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              {isLog
                ? "Save anime in your favorites list"
                : "Search an anime, sign in and save it to your favorites list"}
            </Typography>

            {isLog ? null : (
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Button variant="contained" color="primary">
                        sign in
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      <Button variant="outlined" color="primary">
                        sign up
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            )}
          </Container>
        </div>
        {statusSearchAnime ? displaySearchAnime() : displayTopAnime()}
      </div>
    </div>
  );
};
