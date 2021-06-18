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

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("da app", auth.currentUser);

  auth.onAuthStateChanged(function (user) {
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
    }
  });

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
