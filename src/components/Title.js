import React, { Component } from 'react';
import Navigation from './Navigation';

class Title extends Component {

setTitle() {
  var scene = window.location.pathname;

  switch (scene) {
    case '/signup':
      return 'Anmelden'
    case '/signin':
      return 'Einloggen'
    case '/home':
      return 'Foto Galerie'
    case '/account':
      return 'Account'
    case '/pw-forget':
      return 'PW forget'

    default:
     return 'Startseite'
  }
}

  render() {
    return (
      <div>
        <header className="App-header">
          <h1>{this.setTitle()}</h1>
          <Navigation />
        </header>
      </div>
    );
  }
}

export default Title
