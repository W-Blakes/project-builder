// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAAg8O4Fh7g6dB5dLQ4XwPXmg0K02KrKZ0',
  authDomain: 'dream-builder-1987.firebaseapp.com',
  projectId: 'dream-builder-1987',
  storageBucket: 'dream-builder-1987.appspot.com',
  messagingSenderId: '57092941599',
  appId: '1:57092941599:web:4611496b33357e7c6bb22a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const db = getFirestore();

//Initialize Auth
const auth = getAuth();

export { db, auth };
