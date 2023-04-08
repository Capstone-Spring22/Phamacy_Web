// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCNJqirLI-JJ2pbbgp2chxd_ojGZa_btAU",
  authDomain: "better-health-3e75a.firebaseapp.com",
  projectId: "better-health-3e75a",
  storageBucket: "better-health-3e75a.appspot.com",
  messagingSenderId: "24071304025",
  appId: "1:24071304025:web:a2e0d120b6740c616e1248",
  measurementId: "G-4Q1J392B5Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
