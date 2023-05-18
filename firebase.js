// Import the functions you need from the SDKs you need
//import * as firebase from "firebase/compat/app";
import firebase from 'firebase/compat/app';
require('firebase/auth');
import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/storage";


//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsUZfmWG-hXnE9vDrqYgJmq3ZVXShO5ps",
  authDomain: "chill-cafe-f0f73.firebaseapp.com",
  projectId: "chill-cafe-f0f73",
  storageBucket: "chill-cafe-f0f73.appspot.com",
  messagingSenderId: "150206324724",
  appId: "1:150206324724:web:0394ced1ef81daf10663a1",
  measurementId: "G-141DM9WXV9"
};

// Initialize Firebase
// let app;
// if (!getApps().length) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app()
// }

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const storage = getStorage(app);

const db = getFirestore(app);
const auth = getAuth(app);



export { auth, firebase, db };