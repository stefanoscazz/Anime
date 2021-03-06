import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { auth } from "../firebase";
import { FormHelperText } from "@material-ui/core";
import { errorMessageRefresh, setUserLogOutState } from "../slice/userSlice";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useEffect } from "react";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
}));

export const RegisterPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorInput, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(errorMessageRefresh());
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (strongRegex.test(password) && password === confirmPass) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setSuccess(true);
        })
        .then(() => {
          auth
            .signOut()
            .then(dispatch(setUserLogOutState()))
            .catch((error) => {
              setMessageError(error.message);
            });
        })
        .catch((error) => {
          setError(true);
          setMessageError(error.message);
        });
    } else {
      validationError();
    }
  };

  // VALIDATION ERROR HELPERTEXT
  const validationError = () => {
    setError(true);
    if (password !== confirmPass) {
      setMessageError("passwords not match");
    }
    if (!strongRegex.test(password)) {
      setMessageError(
        "minimum 8 digit atleast one uppercase letter  and one non alphanumeric symbol ('&!?@')"
      );
    }
  };
  // event onChange and submit
  const onChangePass = (e) => setPassword(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const handleConfirmPass = (e) => setConfirmPass(e.target.value);

  if (!success && !user.id) {
    return (
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={onChangePass}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleConfirmPass}
                  value={confirmPass}
                  variant="outlined"
                  required
                  fullWidth
                  name=" confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                />
                {errorInput ? (
                  <FormHelperText error id="confirm-password">
                    {messageError}
                  </FormHelperText>
                ) : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  } else if (user.id) {
    return <Redirect to="/" />
  }
  else {
    return <Redirect to="/login" />;
  }
};


