// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRvirETU_FoI4IMLnQ0TI6hfH08KxfBvQ",
  authDomain: "koalabear-6fac0.firebaseapp.com",
  projectId: "koalabear-6fac0",
  storageBucket: "koalabear-6fac0.firebasestorage.app",
  messagingSenderId: "871686591425",
  appId: "1:871686591425:web:5eb263560e79036b039540",
  measurementId: "G-3NXP3X6WDF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);