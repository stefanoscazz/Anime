import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { DescriptionPage } from "./pages/DescriptionPage";
import { addFavoritesAction } from "./slice/favoritesSlice";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { useEffect } from "react";
import { topAnimeAction } from "./slice/topAnimeSlice";
import { ProfilePage } from "./pages/ProfilePage";



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
    dispatch(topAnimeAction())
    dispatch(addFavoritesAction(user.id))
  }, [dispatch, user.id])

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
            <Route exact path="/profile" component={ProfilePage} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </ThemeProvider>

  );
}

export default App;
