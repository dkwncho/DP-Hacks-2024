// Import Firebase modules using modular syntax
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHBYjPmkBOyWx0dddswq8PHwXzpIwOvLU",
  authDomain: "dphacks.firebaseapp.com",
  projectId: "dphacks",
  storageBucket: "dphacks.appspot.com",
  messagingSenderId: "639281084411",
  appId: "1:639281084411:web:f20a53142b796529a6fd5e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
export default app;
