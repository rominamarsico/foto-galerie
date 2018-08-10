import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';

import * as routes from './constants/routes';
import withAuthentication from './components/withAuthentication';
import Title from './components/Title.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Title/>
            <Route exact path={routes.LANDING} component={() => <LandingPage />} />
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
            <Route exact path={routes.HOME} component={() => <HomePage />} />
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default withAuthentication(App);
