import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, doc, setDoc } from "firebase/firestore";

import { auth, firestore } from '../firebase'

export default function CreateDiscussion() {
    let navigate = useNavigate();
    
    const [formTitle, setTitle] = useState('');
    const [formDesc, setDesc] = useState('');
    const [formTags, setTags] = useState('');

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
                id: newRef.id,
                tags: formTags
            }
        )
        setTitle('');
        setDesc('');
        setTags('');
        alert('Success!')
        navigate(`/discussion/${newRef.id}`)
    }

    return (
        <>
            <form onSubmit={createDisc}>
                <div style={{float: 'center', width: '100%'}}>
                    <div>
                    <h1 class='title'>Title</h1>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: 75, marginTop: 40}}>
                        <input class='inputPost' value={formTitle} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' />
                    </div>
                    <h2 class='title'>Description</h2>
                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: 75, marginTop: 40}}>
                        <input class='inputPost' value={formDesc} onChange={(e) => setDesc(e.target.value)} placeholder='Enter description' /> <br /><br />
                    </div>
                    <h2 class='title'>Tags</h2>
                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: 50, marginTop: 40}}>
                        <input class='inputPost' value={formTags} onChange={(e) => setTags(e.target.value)} placeholder='Enter tags as a comma separated list' />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button class='postButton' type='submit' disabled={!formTitle}>Publish</button>
                        <button class='postButton' onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}
