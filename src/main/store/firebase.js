import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAkq2CivAegtjuX9_QTCjNLnHLUN4U-3eA',
  authDomain: 'seva-auth-3.firebaseapp.com',
  projectId: 'seva-auth-3',
  storageBucket: 'seva-auth-3.appspot.com',
  messagingSenderId: '170054944460',
  appId: '1:170054944460:web:910081ebddb6198da0a469',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
