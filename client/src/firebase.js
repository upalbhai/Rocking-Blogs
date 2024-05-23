// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rocking-blog.firebaseapp.com",
  projectId: "rocking-blog",
  storageBucket: "rocking-blog.appspot.com",
  messagingSenderId: "955094786019",
  appId: "1:955094786019:web:f31e93d646dd06b5930ad6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);