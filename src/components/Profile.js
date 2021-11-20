import React from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../firebase'
import { sendEmailVerification } from '@firebase/auth'

export default function Profile() {
    let navigate = useNavigate()
    const user = auth.currentUser
    const email = user.email
    const displayName = user.displayName
    const verified = user.emailVerified

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
