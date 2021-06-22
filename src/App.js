import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage } from "./features/LoginPage";
import { HomePage } from "./features/HomePage";
import { RegisterPage } from "./features/RegisterPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "./slice/userSlice";
import { auth } from "./firebase";
import { DescriptionPage } from "./features/DescriptionPage";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
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
        console.log("no sign in");
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/description" component={DescriptionPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
