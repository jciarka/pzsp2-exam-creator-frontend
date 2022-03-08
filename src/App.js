import React from "react";
import LoginForm from "./components/account/LoginForm";
import CreateAccountForm from "./components/account/CreateAccountForm";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
    </Router>
  );
}

export default App;
