import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  cardMedia: {
    // 16:9
  },

  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
export const CardAnime = ({ data }) => {
  const classes = useStyles();
  // data from HomePage
  console.log(data);
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={6}>
        {data.map((el) => (
          <Grid item key={el.mal_id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              {/* <CardMedia
                className={classes.cardMedia}
                image={el.image_url}
                title="Image title"
                component="img"
              /> */}
              <img
                style={{ height: "230px", width: "170px" }}
                src={el.image_url}
                alt=""
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {el.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  key={uuidv4()}
                  style={{ textDecoration: "none", color: "black" }}
                  to={{ pathname: `/description/${el.mal_id}` }}
                >
                  <Button size="small" color="primary">
                    Read More
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
