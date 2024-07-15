// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "your-own",
  authDomain: "your-own",
  projectId: "your-own",
  storageBucket: "your-own",
  messagingSenderId: "your-own",
  appId: "your-own",
  measurementId: "your-own"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app); // Initialize Firestore

export { auth, database, firestore };
