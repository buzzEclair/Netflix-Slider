import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./Scss/Styles.scss";

export default function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>
    </div>
  );
}
