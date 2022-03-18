import React from "react";
import LoginForm from "./components/account/LoginForm";
import CreateAccountForm from "./components/account/CreateAccountForm";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Class from "./components/Class";

function App() {
  return (
    <Router>
      <Header />

      <Route path="/login" exact render={(props) => <LoginForm />} />

      <Route
        path="/createAccount"
        exact
        render={(props) => (
          <>
            <CreateAccountForm />
          </>
        )}
      />

      <Route
        exact path="/"
        render={(props) => (
          <>
            <Home />
          </>
        )}
      />
      <Route
        path="/classes"
        render={(props) => (
          <>
            <Class />
          </>
        )}
      />
    </Router>
  );
}

export default App;
