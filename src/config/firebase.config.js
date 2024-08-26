// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvvpohMZv6pdbftU-uB_h3x54MPLKjduo",
  authDomain: "mern-chat-app-8d26e.firebaseapp.com",
  projectId: "mern-chat-app-8d26e",
  storageBucket: "mern-chat-app-8d26e.appspot.com",
  messagingSenderId: "335288979696",
  appId: "1:335288979696:web:4c8348e86eb049bfc2f235",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
