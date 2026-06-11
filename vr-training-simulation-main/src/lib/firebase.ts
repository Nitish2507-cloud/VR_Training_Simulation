import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 🔥 YOUR REAL FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyB4kxBHyHrgQ47pzRQuiyODJJeUq4bfPwU",
  authDomain: "ar-vr-credentials.firebaseapp.com",
  projectId: "ar-vr-credentials",
  storageBucket: "ar-vr-credentials.firebasestorage.app",
  messagingSenderId: "556390817614",
  appId: "1:556390817614:web:9f3d98e6ddda4a11f8881f",
  measurementId: "G-WJV88F5EY2",
};

// 🔥 INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

// 🔐 AUTH
export const auth = getAuth(app);

// 🔵 GOOGLE PROVIDER
export const googleAuthProvider = new GoogleAuthProvider();