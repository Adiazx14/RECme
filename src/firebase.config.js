// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuorhsmmdNaADYrLK0-Rk8LAf68NeD94s",
  authDomain: "getrecd-ed492.firebaseapp.com",
  projectId: "getrecd-ed492",
  storageBucket: "getrecd-ed492.appspot.com",
  messagingSenderId: "957203154409",
  appId: "1:957203154409:web:4b50f402e422a39015f778"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()