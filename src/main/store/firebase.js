import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseConfig = {
  apiKey: 'AIzaSyBkXQYrObDC7h0BrYpWM4NiaUVhjLN_BmY',
  authDomain: 'seva-9a741.firebaseapp.com',
  projectId: 'seva-9a741',
  storageBucket: 'seva-9a741.appspot.com',
  messagingSenderId: '740558011899',
  appId: '1:740558011899:web:2d5e032c087efcc3595f5e',
  measurementId: 'G-0QFFDNWCW7',
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  // signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  // signInOptions: [
  //   auth.GoogleAuthProvider.PROVIDER_ID,
  //   auth.FacebookAuthProvider.PROVIDER_ID,
  // ],
};

export { auth, SignInScreen };

function SignInScreen() {
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app} />
    </div>
  );
}
