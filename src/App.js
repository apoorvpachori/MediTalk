import React from 'react';
//import './App.css';


import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'; 
import Signin from './components/Signin';
import Navbar from './components/Navbar';
// import all routing packages
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

// import all components
import Profile from './components/Profile';
import Feed from './components/Feed';
import Discussion from './components/Discussion';
import CreateDiscussion from './components/CreateDiscussion';

// import firebase packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const theme = createMuiTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});

const styles = makeStyles({
  wrapper: {
    width: "65%",
    margin: "auto",
    textAlign: "center"
  },
  bigSpace: {
    marginTop: "5rem"
  },
  littleSpace:{
    marginTop: "2.5rem",
  },
  grid:{
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", 
  },
})


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
          <SignOut />
      </header>

      <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/discussion' element={<Discussion />} />
          <Route path='/create' element={<CreateDiscussion />} />
          <Route path='/' exact element={user ? <Feed /> : <SignIn />} />
      </Routes>
      
    </div>
    </Router>
  );
}


// keep sign in component in App.js
function SignIn() {
    const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return (
    <>
    <ThemeProvider theme={theme}>
      <Navbar signInWithGoogle = {signInWithGoogle}/>
      <Signin signInWithGoogle = {signInWithGoogle}/>
    </ThemeProvider>
    </>
  )
}

// keep sign out component in App.js
function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}

export default App;
