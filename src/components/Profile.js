import '../App.css'
import React from 'react'
import { useNavigate } from 'react-router'
import { auth, firestore } from '../firebase'
import { sendEmailVerification, updateProfile } from '@firebase/auth'
import { doc, setDoc } from "firebase/firestore";

export default function Profile() {

    let navigate = useNavigate()
    const user = auth.currentUser
    const email = user.email
    var displayName = user.displayName
    const parts = displayName.split('|')
    displayName = parts[0]
    const isStu = parts[1]
    const verified = user.emailVerified
    const domain = email.substr(-3)
    
    console.log(user.displayName)
    console.log(isStu)

    // adds user's email to collection of verified medical students
    function addStu() {
        setDoc(
            doc(firestore, 'students', email),
            {
                email: email
            }
        )
        // update display name of user
        if (isStu !== 'stu') {
            updateProfile(user, {displayName: displayName + '|stu'}).then(() => navigate('/profile'))
        }
    }

    // calls addStu if user's email is both verified and ends in 'edu'
    function verify() {
        if (domain === 'edu') {
            
            if (!verified) {
                sendEmailVerification(user).then(() => {
                    alert('Email sent. Verify your email and then try again.')
                })
            }
            addStu()
        }
    }

    function unverify() {
        if (isStu === 'stu') {
            updateProfile(user, {displayName: displayName}).then(() => navigate('/profile'))
        }
    }

    return user && (
        <>
             <button onClick={() => navigate('/')}>Home</button>
             <div class='container'>
                <div>
                    <img class='profile' src={user.photoURL} alt="" />
                </div>
                <div class='details'>
                    <h1>{displayName}</h1>
                    <h2>Email: {email}</h2>
                </div>
             </div>
             <div class='container2'>
                <h1 style={{fontWeight: 100, textIndent: 20}}>Badges</h1>
                {isStu === 'stu' && <div class='star'>medstudent</div>}
                <div>
                    {isStu !== 'stu' ? <button class='postButton' onClick={() => {verify()}}>Verify</button> : <button class='postButton' onClick={() => {unverify()}}>unverify</button>}
                </div>
             </div>
            
             
            
            
        </>
    )
}