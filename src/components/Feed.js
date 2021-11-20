import '../App.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { firestore } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Feed() {
    let navigate = useNavigate();
    
    const discussionsRef = firestore.collection('discussions');
    const query = discussionsRef.orderBy('title');
    const [discussions] = useCollectionData(query)

    return (
        <>
            <header>
                <button onClick={() => navigate('create')}>Create Discussion</button>
            </header>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <input class='inputPost' placeholder='Search bar does not work yet' />
            </div>
            <div>
                {discussions && discussions.map(disc => 
                    <div class='thread'>
                        <div class='post'>
                        <a href={`/discussion/${disc.id}`}>{disc.title}</a>
                        <p>{disc.description}</p>
                        </div>
                    </div>
                    )}
            </div>
        </>
    )
}
