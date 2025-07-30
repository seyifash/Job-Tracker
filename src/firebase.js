// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeMkcDi1cmNRrcWbQ9myvHdWImw5sSVMU",
  authDomain: "job-tracker-52bbe.firebaseapp.com",      
  projectId: "job-tracker-52bbe",
  storageBucket: "job-tracker-52bbe.appspot.com", 
  messagingSenderId: "669565934741",
  appId: "1:669565934741:web:2743a6d7b32edbf70d4f9c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
