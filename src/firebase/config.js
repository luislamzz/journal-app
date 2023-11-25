// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWM0ZYovB3boYYJ-0lm37Fq09lfHMLOZE",
  authDomain: "react-journal-3b530.firebaseapp.com",
  projectId: "react-journal-3b530",
  storageBucket: "react-journal-3b530.appspot.com",
  messagingSenderId: "471568080290",
  appId: "1:471568080290:web:c1e15126771958d16e66fb",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
