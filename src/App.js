import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

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

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <Router>
    <div className="App">
      <header className="App-header">
          <li>
            <Link to='/signin'>Sign In</Link>
          </li>
          <li>
            <Link to='/' exact >Home</Link>
          </li>
      </header>


      <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/' exact element={<Home />} />
      </Routes>
      
    </div>
    </Router>
  );
}

function Home() {
    return(
      <>Welcome to MediTalk</>
    )
      
}

function SignIn() {
    const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return (
    <>
    <button onClick={signInWithGoogle}>
      Sign in with Google
    </button>
    <Link to="/">Cancel</Link>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}

export default App;
