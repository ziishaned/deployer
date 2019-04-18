import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Home';
import JobBuild from './JobBuild';
import AddAccount from './AddAccount';
import PageNotFound from './PageNotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-account" component={AddAccount} />
          <Route path="/job/:name/build" component={JobBuild} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
