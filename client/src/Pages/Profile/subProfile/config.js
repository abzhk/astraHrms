// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "profilenew-5df61.firebaseapp.com",
  projectId: "profilenew-5df61",
  storageBucket: "profilenew-5df61.appspot.com",
  messagingSenderId: "472663033020",
  appId: "1:472663033020:web:d6a8fecb65638451eafcb9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);