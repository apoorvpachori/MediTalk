import React from 'react';
//import './App.css';


import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'; 
import Navbar from './components/homepage/Navbar';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PeopleIcon from '@material-ui/icons/People';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ComputerIcon from '@material-ui/icons/Computer';
import HttpIcon from '@material-ui/icons/Http'; 
import Grid from './components/homepage/Grid';
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

// import firebase objects
import { auth, firestore } from './firebase'

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
>>>>>>> 33c193c05dd67251e8b31dd640ebb406428e52de

function App() {
  const [user] = useAuthState(auth);
  const classes = styles(); 

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
        <div className={`${classes.grid} ${classes.bigSpace}`}>
          <Grid icon={<LocalHospitalIcon style={{fill: "#4360A6", height:"125", width:"125"}}/>}  title="Professional" btnTitle="Show me More" />
          <Grid icon={<EventNoteIcon style={{fill: "#449A76", height:"125", width:"125"}}/>} title="Reliable" btnTitle="Show me More"/>
          <Grid icon={<PeopleIcon style={{fill: "#D05B2D", height:"125", width:"125"}}/>}  title="Trusted" btnTitle="Show me More"/>
        </div>
    </div>
    </Router>
  );
}


// keep sign in component in App.js
function SignIn() {
    const signInWithGoogle = () => {
    console.log('Clicked sign in ');
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return (
    <>
    <ThemeProvider theme={theme}>
      <Navbar signInWithGoogle = {signInWithGoogle}/>
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
