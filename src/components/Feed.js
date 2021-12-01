import '../App.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {auth, firestore } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Delete from '../resources/delete.svg'
import './css/Feed.css'


export default function Feed() {
    let navigate = useNavigate();
    
    const discussionsRef = firestore.collection('discussions');
    const query = discussionsRef.orderBy('title');
    const [discussions] = useCollectionData(query)

    const [formTags, setTags] = useState('')
    const [forummod, setForumMod] = useState(false)

    let user = auth.currentUser
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


    // create array of arrays representing discussions
    var list = []
    discussions && discussions.map(disc => {
        const tags = disc.tags && disc.tags.split(',');
        if ((tags && tags.includes(formTags)) || formTags === "") {
            list.push([disc.id, disc.title, disc.description, disc.tags])
        }
    })

    function handleClick (id) {
        console.log(id)
    }
    return (
        <>
            
            <div style={{display: 'flex', marginTop: '20px'}}>
                <div style={{marginRight: '30px'}}>
                    <button class='postButton' onClick={() => navigate('create')}>Create Discussion</button>
                </div>
                <div>
                    <input class='inputPost' value={formTags} onChange={(e) => setTags(e.target.value)} placeholder='Search by tag' />
                </div>
            </div>
            <div>
            {console.log(list)}
                {list && list.map(disc => 

                    <div class='thread'>
                        <div class='post'>
                            <p><a href={`/discussion/${disc[0]}`}>{disc[1]}</a></p>
                            <p>{disc[2]}</p>
                            {disc[3] && <p>Tags: {disc[3]} </p>}
                            { forummod &&  <img 
                            src = {Delete}
                            onClick={() => handleClick(disc[0])}
                            alt = "trash icon"
                            />}
                        </div>
                    </div>
                    )}
            </div>
        </>
    )
}
