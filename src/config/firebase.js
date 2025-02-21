
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

import {getAuth,setPersistence,browserLocalPersistence} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig); //Starts Firebase with the given configuration.
export const auth = getAuth(app)//Initializes Firebase authentication.
export const db = getFirestore(app)//Sets up Firestore for database operations.
setPersistence(auth,browserLocalPersistence).catch((err)=>{
    console.log('Auth persistance error', err)                   //ensures users stay logged in even after refreshing the page.
})

