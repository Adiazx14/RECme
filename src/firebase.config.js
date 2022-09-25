// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbMG19-5scjc7MPNduPsDJpXvfYvC6L3Q",
  authDomain: "recme-dev.firebaseapp.com",
  projectId: "recme-dev",
  storageBucket: "recme-dev.appspot.com",
  messagingSenderId: "340671970973",
  appId: "1:340671970973:web:2437f2d8fb8f5861f6de74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()