import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCz1cwNigugzdBJ-L9R6K7kne2UtZNmT_U",
  authDomain: "forquisocial---tcc.firebaseapp.com",
  projectId: "forquisocial---tcc",
  storageBucket: "forquisocial---tcc.appspot.com",
  messagingSenderId: "381674685487",
  appId: "1:381674685487:web:f9c2c335b1b8de2206f2da",
  measurementId: "G-D594B91SN9",
};

firebase.initializeApp(firebaseConfig);

const firebaseApp = {
  firestore: firebase.firestore(),
  auth: firebase.auth(),
  storage: firebase.storage(),
};

export default firebaseApp;
