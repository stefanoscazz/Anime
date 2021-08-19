import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { useState } from "react";
import { searchAction } from "../slice/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { setUserLogOutState } from "../slice/userSlice";
import {
  Menu, MenuItem,
  AppBar, Toolbar,
  InputBase, ListItemIcon,
  ListItemText, IconButton,
  Typography
} from "@material-ui/core";
import { logOutActionFavorites } from "../slice/favoritesSlice";
import { alpha, makeStyles, withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import StarIcon from "@material-ui/icons/Star";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";




const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      letterSpacing: "3px",
      marginLeft: "50px",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const Navbar = () => {
  let location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector(state => state.user)


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchAction(inputValue));

  };


  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };


  const handleLogOut = () => {
    setAnchorEl(null);
    auth
      .signOut()
      .then(() => {
        dispatch(setUserLogOutState());
        dispatch(logOutActionFavorites());
        sessionStorage.clear()
      })
      .catch((err) => alert(err.message));
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link
              to="/"
              style={{
                color: "grey",
                textDecoration: "none",
              }}
              onClick={handleClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </StyledMenuItem>
            </Link>
            <Link
              to="/profile"
              style={{
                color: "grey",
                textDecoration: "none",
              }}
              onClick={handleClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                  <StarIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </StyledMenuItem>
            </Link>
            {!user.id ? (
              <Link
                to="/login"
                style={{
                  color: "grey",
                  textDecoration: "none",
                }}
                onClick={handleClose}
              >
                <StyledMenuItem>
                  <ListItemIcon>
                    <LockIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </StyledMenuItem>
              </Link>
            ) : (
              <StyledMenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <LockOpenIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText style={{ color: "grey" }} primary="Logout" />
              </StyledMenuItem>
            )}
          </StyledMenu>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
          ></Typography>
          {location.pathname === "/" && (
            <form onSubmit={handleSubmit} className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={handleOnChange}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </form>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
