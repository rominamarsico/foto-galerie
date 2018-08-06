import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';

import * as routes from './constants/routes';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Router>
          <div>
            <Navigation />

            <hr/>

            <Route
              exact path={routes.LANDING}
              component={() => <LandingPage />}
            />
            <Route
              exact path={routes.SIGN_UP}
              component={() => <SignUpPage />}
            />
            <Route
              exact path={routes.SIGN_IN}
              component={() => <SignInPage />}
            />
            <Route
              exact path={routes.PASSWORD_FORGET}
              component={() => <PasswordForgetPage />}
            />
            <Route
              exact path={routes.HOME}
              component={() => <HomePage />}
            />
            <Route
              exact path={routes.ACCOUNT}
              component={() => <AccountPage />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
