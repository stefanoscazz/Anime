import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { isEmpty } from "lodash";
import TopAnime from "../components/TopAnime";
import SearchAnime from "../components/SearchAnime";


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
    paddingTop: "56.25%",
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
  const authUser = window.sessionStorage;
  const classes = useStyles();
  const search = useSelector((state) => state.search);
  const user = useSelector(state => state.user)

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
              {user.id
                ? "Save anime in your favorites list"
                : "Search an anime, sign in and save it to your favorites list"}
            </Typography>

            {user.id ? null : (
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
        {search.status ? <SearchAnime /> : <TopAnime />}
      </div>
    </div >
  );
};
