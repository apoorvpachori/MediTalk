import '../App.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth, firestore } from '../firebase'
import { sendEmailVerification, updateProfile } from '@firebase/auth'
import { doc, setDoc } from "firebase/firestore";

export default function Profile() {
    
    let navigate = useNavigate()
    var user = auth.currentUser

    // boolean to toggle forum mod privileges 
    const [forummod, setForumMod] = useState(false)

    useEffect(()=>{
        if(firestore.collection('students').doc(user.email) != null) {
            firestore.collection('students').doc(user.email).get().then((doc) => {
                if(doc.exists){
                     const data = doc.data()
                     setForumMod(data['forum_mod'])
                }
            })
        }
    },[user.email])

    if (user == undefined)
        return null;
    else
        localStorage.getItem("user")

    var email = user.email
    if (email == undefined)
    return null;
    else
        localStorage.getItem("email")

    var displayName = user.displayName
    if (displayName == undefined)
    return null;
    else
        localStorage.getItem("displayName")

    const parts = displayName.split('|')
    displayName = parts[0]
    const isStu = parts[1]

    var verified = user.emailVerified
    if (verified == undefined)
    return null;
    else
        localStorage.getItem("verified")

    const domain = email.substr(-3)

    localStorage.setItem("user", user)
    localStorage.setItem("email", email)
    localStorage.setItem("displayName", displayName)
    localStorage.setItem("verified", verified)

    // console.log(user.displayName)
    // console.log(isStu)

    // adds user's email to collection of verified medical students
    function addStu() {
        setDoc(
            doc(firestore, 'students', email),
            {
                email: email,
                forum_mod: false
            }
        )
        // update display name of user
        if (isStu !== 'stu') {
            updateProfile(user, {displayName: displayName + '|stu'}).then(() => {navigate('/profile'); alert('You are now verified!')})
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
        else {
            alert('Verification failed. You must use a valid school email.')
        }
    }

    function unverify(email) {
        if (isStu === 'stu') {
            firestore.collection('students').doc(email).delete()
            updateProfile(user, {displayName: displayName}).then(() => navigate('/profile'))
        }
    }

    function becomeForumMod(email) {
        setDoc(
            doc(firestore, 'students', email),
            {
                email: email,
                forum_mod: true
            }
        )
        
        alert('Success! You are now a forum moderator.')
    }

    function quitForumMod (email) {
        setDoc(
            doc(firestore, 'students', email),
            {
                email: email,
                forum_mod: false
            }
        )
        
        alert('You are no longer a forum moderator.')
    }

    return user && (
        <>
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
                {isStu === 'stu' && <div class='star'>Student</div>}
                <div>
                    {isStu !== 'stu' ? <button class='postButton' onClick={() => {verify(); navigate('/')}}>Verify</button> 
                    : <button class='postButton' onClick={() => {unverify(user.email)}}>unverify</button>}
                    <br />
                    {isStu === 'stu' && !forummod && <button class='modButton' onClick={() => {becomeForumMod(user.email); navigate('/')}}>Apply to be a Forum Moderator</button> }
                    {isStu === 'stu' && forummod && <button class='modButton' onClick={() => {quitForumMod(user.email); navigate('/')}}>Stop being a Forum Moderator</button> }
                </div>
             </div>
        </>
    )
}