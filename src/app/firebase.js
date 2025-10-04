// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
const firebaseConfig = {
  apiKey: "AIzaSyDotxgV8aOS4M2HkZcDMKCpTHiivTJa7Ps",
  authDomain: "high5-5439a.firebaseapp.com",
  projectId: "high5-5439a",
  storageBucket: "high5-5439a.firebasestorage.app",
  messagingSenderId: "599692414013",
  appId: "1:599692414013:web:aa0b9d6d94b1ee00c86e54",
  measurementId: "G-GDFQE1WWP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);   