import React from 'react';
//import './App.css';


import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Navbar from './components/homepage/Navbar';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PeopleIcon from '@material-ui/icons/People';
import Grid from './components/homepage/Grid';

// import all routing packages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

function App() {
  const [user] = useAuthState(auth);
  

  return (
    <Router>
    <div className="App">
      <header className="App-header">
          <SignOut />
      </header>

      <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path='/discussion/:title' element={<Discussion />} />
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
    console.log('Clicked sign in ');
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider); 
  }
    const classes = styles();
  
  return (
    <>
    <ThemeProvider theme={theme}>
      <Navbar signInWithGoogle = {signInWithGoogle}/>
      <div className={`${classes.grid} ${classes.bigSpace}`}>
          <Grid icon={<LocalHospitalIcon style={{fill: "#4360A6", height:"125", width:"125"}}/>}  title="Professional" btnTitle="Show me More" />
          <Grid icon={<EventNoteIcon style={{fill: "#449A76", height:"125", width:"125"}}/>} title="Reliable" btnTitle="Show me More"/>
          <Grid icon={<PeopleIcon style={{fill: "#D05B2D", height:"125", width:"125"}}/>}  title="Trusted" btnTitle="Show me More"/>
      </div>
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
