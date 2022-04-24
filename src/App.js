import React from "react";
import LoginForm from "./components/account/LoginForm";
import CreateAccountForm from "./components/account/CreateAccountForm";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home/Home.js";
import Class from "./components/class/Class";
import TaskPool from "./components/tasks/TaskPool";
import Member from "./components/members/Member";
import PathBar from "./PathBar";
import { Stack } from "@mui/material";
import Test from "./components/tests/Test";
import AddNewTaskPool from "./components/tasks/AddNewTaskPool";
import AddNewTest from "./components/tests/AddNewTest";
import AddNewMember from "./components/members/AddNewMember";
import AddNewClass from "./components/home/AddNewClass";

function App() {
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
                  <Member props={props}/>
                </>
              )}
            />

            <Route
              exact path="/classes/:class_name/test/:test_id"
              render={(props) => (
                <>
                  <Test />
                </>
              )}
            />

            <Route
              exact path="/classes/:class_name/newTest"
              render={(props) => (
                <>
                  <AddNewTest />
                </>
              )}
            />

            <Route
              exact path="/classes/:class_name/newTaskPool"
              render={(props) => (
                <>
                  <AddNewTaskPool />
                </>
              )}
            />

            <Route
              exact path="/classes/:class_name/newMember"
              render={(props) => (
                <>
                  <AddNewMember />
                </>
              )}
            />

            <Route
              exact path="/addNewClass"
              render={(props) => (
                <>
                  <AddNewClass />
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
