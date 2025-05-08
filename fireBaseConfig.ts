// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // For Cloud Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC685aWGPIGN3vH_86daIw5jHjGVUtpzDU",
  authDomain: "react-budgeting-app-bbbb2.firebaseapp.com",
  projectId: "react-budgeting-app-bbbb2",
  storageBucket: "react-budgeting-app-bbbb2.firebasestorage.app",
  messagingSenderId: "992347854991",
  appId: "1:992347854991:web:0824cce76c9719adaab8fa",
  measurementId: "G-DH7SY2HCXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };