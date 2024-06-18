// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realess-6bc5c.firebaseapp.com",
  projectId: "realess-6bc5c",
  storageBucket: "realess-6bc5c.appspot.com",
  messagingSenderId: "183290032641",
  appId: "1:183290032641:web:b866a977c7c240c6ac8600"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);