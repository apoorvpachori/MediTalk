import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, doc, setDoc } from "firebase/firestore";

import { auth, firestore } from '../firebase'

export default function CreateDiscussion() {
    let navigate = useNavigate();
    
    const [formTitle, setTitle] = useState('');
    const [formDesc, setDesc] = useState('');

    const newRef = doc(collection(firestore, 'discussions'));
    const createDisc = async (e) => {
        e.preventDefault();

        const { uid } = auth.currentUser;

        await setDoc(
            newRef,
            {
                title: formTitle,
                description: formDesc,
                postedBy: uid,
                id: newRef.id
            }
        )
        setTitle('');
        setDesc('');
        alert('Success!')
        navigate(`/discussion/${newRef.id}`)
    }

    return (
        <>
            <form onSubmit={createDisc}>
                <div class='title'>
                <h1>Enter title</h1>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: 100, marginTop: 40}}>
                    <input class='inputPost' value={formTitle} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' />
                </div>
                <h2 class='title'>Enter description</h2>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: 100, marginTop: 40}}>
                    <input class='inputPost' value={formDesc} onChange={(e) => setDesc(e.target.value)} placeholder='Enter description' /> <br /><br />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button class='postButton' type='submit' disabled={!formTitle}>Publish</button>
                    <button class='postButton' onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </>
    )
}
