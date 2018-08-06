import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAnBmOecG_iTSLQzI9vF3HXFNU3N7mfBrc",
  authDomain: "foto-galerie-1a802.firebaseapp.com",
  databaseURL: "https://foto-galerie-1a802.firebaseio.com",
  projectId: "foto-galerie-1a802",
  storageBucket: "foto-galerie-1a802.appspot.com",
  messagingSenderId: "803808119084"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
