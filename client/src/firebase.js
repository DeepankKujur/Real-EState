// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //here normal process.env will not work so we have to use import.meta.env
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-71ae9.firebaseapp.com",
  projectId: "mern-estate-71ae9",
  storageBucket: "mern-estate-71ae9.firebasestorage.app",
  messagingSenderId: "574734071487",
  appId: "1:574734071487:web:b167759dcfb9c946e2f80a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);