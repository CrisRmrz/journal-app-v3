// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5R-KJcKGGszWQAE4q90MthPs0vDgOD74",
  authDomain: "journal-app-v3.firebaseapp.com",
  projectId: "journal-app-v3",
  storageBucket: "journal-app-v3.appspot.com",
  messagingSenderId: "922661118223",
  appId: "1:922661118223:web:3dd02fb2359c5bcbd35e7a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth( FirebaseApp ); //Para hacer el auth
export const FirebaseDB = getFirestore( FirebaseApp ); //Para tener firestore