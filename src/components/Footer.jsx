import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Box, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    letterSpacing: "2px",
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90px",
    marginLeft: "2px",
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm" className={classes.container}>
        App Realizzata da Stefano Scazzi
        <Box className={classes.box}>
          <GitHubIcon style={{ fontSize: "30px" }} />
          <LinkedInIcon style={{ fontSize: "40px" }} />
        </Box>
      </Container>
    </footer>
  );
};
