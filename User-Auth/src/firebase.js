// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD1ifOi-88N7qohX9G15eU-svE7xTRE-24",
  authDomain: "donorconnect-297b4.firebaseapp.com",
  databaseURL: "https://donorconnect-297b4-default-rtdb.firebaseio.com/",
  projectId: "donorconnect-297b4",
  storageBucket: "donorconnect-297b4.appspot.com",
  messagingSenderId: "589425183592",
  appId: "1:589425183592:web:99d460434c1d2a32e0e4dd",
  measurementId: "G-WMTN0YHXPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };