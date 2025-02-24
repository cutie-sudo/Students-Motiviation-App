import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Function to register user with email and password
export const registerWithEmail = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

// Function to register user with Google
export const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
};

const FirebaseConfig = () => {
    return <div>Firebase Configuration Loaded</div>;
};

export default FirebaseConfig;
