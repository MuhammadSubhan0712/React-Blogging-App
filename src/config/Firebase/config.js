import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzk6TSHdMJ3uJVSDBiaDRN7qNphremi5M",
  authDomain: "react-blog-app-ca446.firebaseapp.com",
  projectId: "react-blog-app-ca446",
  storageBucket: "react-blog-app-ca446.appspot.com",
  messagingSenderId: "682736785998",
  appId: "1:682736785998:web:807f8fb5ff6627e8fc811f",
  measurementId: "G-J5B0S8NHLJ",
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
