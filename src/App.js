import React from 'react';

// import all material ui components
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Navbar from './components/homepage/Navbar';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PeopleIcon from '@material-ui/icons/People';
import Grid from './components/homepage/Grid';

// import all components
import Profile from './components/Profile';
import Feed from './components/Feed';
import Discussion from './components/Discussion';
import CreateDiscussion from './components/CreateDiscussion';
import NavBar from './components/NavBar';
import PageNotFound from './components/PageNotFound';

// import all routing packages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import firebase packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// import firebase objects
import { auth } from './firebase'

const theme = createTheme({
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
    <div>
      <header>
        {user && <NavBar />}
      </header>
      

      <Routes>
          <Route path='/profile' element={user ? <Profile /> : <PageNotFound />} />
          <Route path='/discussion/:id' element={user ? <Discussion /> : <PageNotFound />} />
          <Route path='/create' element={user ? <CreateDiscussion />  : <PageNotFound />} />
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
    auth.signInWithPopup(provider)
    .then(function (result) {
      console.log("result", result);
    })
    .catch(function (error) {
      console.error(error);
    });
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


export default App;
