import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5zOq3aqKyfXa9YhRRhz7J_5iCnEm_3UI",
    authDomain: "clone-adebb.firebaseapp.com",
    projectId: "clone-adebb",
    storageBucket: "clone-adebb.appspot.com",
    messagingSenderId: "377203125099",
    appId: "1:377203125099:web:fb997dcd60fcbc823cfa2e",
    measurementId: "G-BG2Z7BTMG9"
  };

  const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

  const db = app.firestore();

  export default db;