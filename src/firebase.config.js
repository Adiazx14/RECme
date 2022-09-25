// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKiu62W79UOIyjetgovpGATEjMmBpILM0",
  authDomain: "recme-rice.firebaseapp.com",
  projectId: "recme-rice",
  storageBucket: "recme-rice.appspot.com",
  messagingSenderId: "11567017133",
  appId: "1:11567017133:web:82c8c0ee528b386c8c6a24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()