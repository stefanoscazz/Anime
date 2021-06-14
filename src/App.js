import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage } from "./features/LoginPage";
import { HomePage } from "./features/HomePage";
import { RegisterPage } from "./features/RegisterPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
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
