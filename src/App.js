import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage } from "./features/LoginPage";
import { HomePage } from "./features/HomePage";
import { RegisterPage } from "./features/RegisterPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser, setFavoritesList } from "./slice/userSlice";
import db, { auth } from "./firebase";
import { DescriptionPage } from "./features/DescriptionPage";
import { useEffect } from "react";
import { FavoritesPage } from "./features/FavoritesPage";
import { addFavoritesAction } from "./slice/favoritesSlice";
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    background: {
      default: "white",
      paper: "white"
    }
  }
})

function App() {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch();
  useEffect(() => {

  }, []);
  //refresh page add data of current user in redux

  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      dispatch(addFavoritesAction(user.uid))

      dispatch(
        setActiveUser({
          id: auth.currentUser.uid,
          userName: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL,
          email: auth.currentUser.email,
        })
      );


    } else {
      // No user is signed in.
      console.log("da app.js no sign in");
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App" >
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/description/:id" component={DescriptionPage} />
            <Route exact path="/favorites" component={FavoritesPage} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
