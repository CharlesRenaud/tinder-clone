// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmwwopgT-0KMw7C_oZiWArLoORRpR41uA",
  authDomain: "devcarl-tinder.firebaseapp.com",
  projectId: "devcarl-tinder",
  storageBucket: "devcarl-tinder.appspot.com",
  messagingSenderId: "363913278377",
  appId: "1:363913278377:web:df2a05c00f88a2d6b54ab8",
  measurementId: "G-Q8K3HT29VT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export {auth, db}