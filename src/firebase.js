import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzUJ4Iyb6knHLsE5aZqbPyZO7nUblwfMk",
  authDomain: "todo-app-cac24.firebaseapp.com",
  projectId: "todo-app-cac24",
  storageBucket: "todo-app-cac24.firebasestorage.app",
  messagingSenderId: "334575496468",
  appId: "1:334575496468:web:f0b5f87a2d955110546601",
  measurementId: "G-L9ZVHN9KBB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);