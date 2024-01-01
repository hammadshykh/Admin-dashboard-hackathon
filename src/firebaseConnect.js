// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"; // If you're using authentication
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsuKJ2079hY-3FF6K2RXVqv3Xkm__wn-o",
  authDomain: "cart-with-redux-c5a39.firebaseapp.com",
  databaseURL: "https://cart-with-redux-c5a39-default-rtdb.firebaseio.com",
  projectId: "cart-with-redux-c5a39",
  storageBucket: "cart-with-redux-c5a39.appspot.com",
  messagingSenderId: "762339325783",
  appId: "1:762339325783:web:e83f8bf61d2e0530cd3012",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage(app);
export const firebaseApp = { db, auth, storage };
