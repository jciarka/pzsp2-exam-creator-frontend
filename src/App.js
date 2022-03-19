import React from "react";
import LoginForm from "./components/account/LoginForm";
import CreateAccountForm from "./components/account/CreateAccountForm";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Class from "./components/class/Class";
import TaskPool from "./components/tasks/TaskPool";
import NotFound from "./components/NotFound";
import Member from "./components/members/Member";
import PathBar from "./PathBar";
import { Stack } from "@mui/material";
import { useState } from "react";

function App() {
  var [url, setUrl] = useState(window.location.pathname)
  return (
    <Router>
      <Header />
      <div className="app-content">
        <Stack style = {{
          'alignItems':'center'
          
        }}>
        
          <PathBar className="path-bar" ></PathBar>
          <div className="window-content">

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
              exact path="/classes/:class_name"
              render={(props) => (
                <>
                  <Class />
                </>
              )}
            />
            <Route
              exact path="/classes/:class_name/pool/:pool_id"
              render={(props) => (
                <>
                  <TaskPool />
                </>
              )}
            />
            <Route
              exact path="/classes/:class_name/member/:member_id"
              render={(props) => (
                <>
                  <Member />
                </>
              )}
            />
          </div>



        </Stack>
      </div>
    </Router>
  );
}

export default App;
