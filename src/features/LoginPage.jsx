import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  createMuiTheme,
  FormHelperText,
  MuiThemeProvider,
  TextField,
} from "@material-ui/core";
import {
  loginGoogleAction,
  loginWithEmailPasswordAction,
} from "../slice/userSlice";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link  from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    minHeight: "calc(100vh - 150px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginBottom: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
}));

export const LoginPage = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onChangePass = (e) => {
    setPassword(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSignInGoogle = () => {
    dispatch(loginGoogleAction());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginWithEmailPasswordAction({
        email: email,
        password: password,
      })
    );
  };
  const displayLogin = () => {
    if (!user.id) {
      return (
        <Container className={classes.container} component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChangeEmail}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={onChangePass}
              />
              {user.errorMessage ? (
                <FormHelperText error id="password">
                  {user.errorMessage}
                </FormHelperText>
              ) : null}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Button
                onClick={handleSignInGoogle}
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Login with google
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      );
    } else {
      return <Redirect to="/" />;
    }
  };
  return <div>{displayLogin()}</div>;
};
