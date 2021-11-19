import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth, firestore } from '../firebase'

export default function CreateDiscussion() {
    let navigate = useNavigate();
    
    const [formTitle, setTitle] = useState('');
    const [formDesc, setDesc] = useState('');
    
    const discRef = firestore.collection('discussions');

    const createDisc = async (e) => {
        e.preventDefault();

        const { uid } = auth.currentUser;

        await discRef.add({
            title: formTitle,
            description: formDesc,
            postedBy: uid
        })

        setTitle('');
        setDesc('');
    }

    return (
        <>
            <form onSubmit={createDisc}>
                <h1>Enter title</h1>
                <input value={formTitle} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' />
                <h2>Enter description</h2>
                <input value={formDesc} onChange={(e) => setDesc(e.target.value)} placeholder='Enter description' /> <br /><br />
                <button type='submit' disabled={!formTitle}>Publish</button>
                <button onClick={() => navigate('/')}>Cancel</button>
            </form>
        </>
    )
}
