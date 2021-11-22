import React from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../firebase'
import { sendEmailVerification } from '@firebase/auth'

export default function Profile() {
    
    let navigate = useNavigate()
     let user = auth.currentUser
     if (user == null)
        user = sessionStorage.getItem("user");
     sessionStorage.setItem("user", user);

     let email = user.email
     if (email == null)
        email = sessionStorage.getItem("email");
     sessionStorage.setItem("email", email);

     let displayName = user.displayName
     if (displayName == null)
         displayName = sessionStorage.getItem("displayName");
     sessionStorage.setItem("displayName", displayName);
     
     let verified = user.emailVerified
     if (verified == null)
        verified = sessionStorage.getItem("verified");
     sessionStorage.setItem("verified", verified);

    const verify = async (e) => {
        sendEmailVerification(user).then(() => {
            alert('Email sent')
        })
    }

    return user && (
        <>
            <button onClick={() => navigate('/')}>Home</button>
            <h1>Hi {displayName}</h1>
            <h2>Email: {email}</h2>
            <button onClick={verify}>Verify</button>
            {verified && <h1>yes</h1>}
        </>
    )
}
