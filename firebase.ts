import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAQpeu9M7ObMMWIvZyfBHMw38QYMj4yzWI",
    authDomain: "parivartan-prayas.firebaseapp.com",
    projectId: "parivartan-prayas",
    storageBucket: "parivartan-prayas.firebasestorage.app",
    messagingSenderId: "939083280460",
    appId: "1:939083280460:web:254008780ca0a2a90a84e9",
    measurementId: "G-8PX9EV5S23"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
