import React, { Component } from 'react';
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";

import Home from './Home';
import JobBuild from './JobBuild';
import Setting from './Setting';
import PageNotFound from './PageNotFound';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('setting')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/setting' }} />
  )} />
);

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/setting" component={Setting} />
          <PrivateRoute path="/job/:name/build" component={JobBuild} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
