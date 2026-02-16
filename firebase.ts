
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyC2m8_LEa7-k-bOZCyq7ZlCXudPmFXiUp0",
    authDomain: "meuhacker123.firebaseapp.com",
    databaseURL: "https://meuhacker123-default-rtdb.firebaseio.com",
    projectId: "meuhacker123",
    storageBucket: "meuhacker123.firebasestorage.app",
    messagingSenderId: "454890426716",
    appId: "1:454890426716:web:f0187a9399ce85193f3199"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
