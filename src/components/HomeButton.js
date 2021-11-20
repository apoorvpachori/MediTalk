import React from 'react';
import '../App.css';
import { auth } from '../firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom'

export default function HomeButton() {
    const [user] = useAuthState(auth);
    
    let navigate = useNavigate();

    return user && (
        <button class='circle' onClick={() => navigate('/profile')}>Account</button>
    )
}
