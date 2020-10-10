import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBUFEqbyGUVVGD2x7BjqsJVjxU4UOmFvCo",
  authDomain: "mern-messenger-77bc9.firebaseapp.com",
  databaseURL: "https://mern-messenger-77bc9.firebaseio.com",
  projectId: "mern-messenger-77bc9",
  storageBucket: "mern-messenger-77bc9.appspot.com",
  messagingSenderId: "573927164048",
  appId: "1:573927164048:web:1da5da259810f6b68ab015",
});

const db = firebaseApp.firestore();

export default db;
