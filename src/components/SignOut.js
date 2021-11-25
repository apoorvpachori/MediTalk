import React from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router';

export default function SignOut() {
    let navigate = useNavigate();
    
    return auth.currentUser && (
      <button class='postButton' onClick={() => {auth.signOut(); navigate('/')}}>
        Sign out
      </button>
    )
  }
