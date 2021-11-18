// import firebase packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCeUIT7dyEPAOqnFZMSBturk8mO0NjbsB8",
  authDomain: "meditalk-c376a.firebaseapp.com",
  projectId: "meditalk-c376a",
  storageBucket: "meditalk-c376a.appspot.com",
  messagingSenderId: "424322085833",
  appId: "1:424322085833:web:d3e6deedd9e47f9177ee18",
  measurementId: "G-SPBMLKF6RY"
})

export const auth = firebase.auth();
export const firestore = firebase.firestore();