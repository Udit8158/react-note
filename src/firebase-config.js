// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkBk4peTlZ_prBQaZta8H5p56m_1Lelws",
  authDomain: "react-note-app-7e002.firebaseapp.com",
  projectId: "react-note-app-7e002",
  storageBucket: "react-note-app-7e002.appspot.com",
  messagingSenderId: "717703970267",
  appId: "1:717703970267:web:e027cd272a28da41ad7bfe",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
