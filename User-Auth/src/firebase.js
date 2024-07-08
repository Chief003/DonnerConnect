// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDrKe9c97zu7xziiWM9R0N8cMuvktqmLcM",
  authDomain: "donorconnect-4ce2b.firebaseapp.com",
  projectId: "donorconnect-4ce2b",
  storageBucket: "donorconnect-4ce2b.appspot.com",
  messagingSenderId: "899862853576",
  appId: "1:899862853576:web:1fc3fc7f169f398fce72fd",
  measurementId: "G-RWTBNTCGWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app); // Initialize Firestore

export { auth, database, firestore };
