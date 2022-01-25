import React, { Component } from "react";
import "./style/style.css";
import Main from './Main';
import { Switch, Route } from "react-router-dom";
import Login from "./contents/login/Login";

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Main} />
      </Switch>
    );
  }
}

export default App;