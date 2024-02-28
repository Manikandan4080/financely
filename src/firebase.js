// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBgd4aFJOsaD1rw04ZXgvPGGntzw6ER7KM",
  authDomain: "personal-finance-tracker-5da9f.firebaseapp.com",
  projectId: "personal-finance-tracker-5da9f",
  storageBucket: "personal-finance-tracker-5da9f.appspot.com",
  messagingSenderId: "804542396946",
  appId: "1:804542396946:web:0911ca7f5ec0073902b6cb",
  measurementId: "G-PY9BT3YG9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };