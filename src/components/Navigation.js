import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import './Navigation.css';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <ul className="menuBar">
    <li><Link to={routes.LANDING}>Startseite</Link></li>
    <li><Link to={routes.HOME}>Galerie</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul className="menuBar">
    <li className="listItem"><Link className="linkItem" to={routes.LANDING}>Startseite</Link></li>
    <li className="listItem"><Link className="linkItem" to={routes.SIGN_IN}>Einloggen</Link></li>
  </ul>

export default Navigation;
