import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { auth, firestore } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc } from "firebase/firestore";
import firebase from 'firebase/compat/app';

export default function Discussion() {
    let navigate = useNavigate();
    
    const { id } = useParams();

    // get discussion
    const discRef = firestore.collection('discussions');
    const query = discRef.where('id', '==', id)
    const [discussions] = useCollectionData(query)

    // get list of all posts
    const postRef = firestore.collection('posts');
    const postquery = postRef.where('discussion', '==', id)
    const [posts] = useCollectionData(postquery)

    // add comment to posts
    const [formPost, setPost] = useState('');

    const newRef = doc(collection(firestore, 'posts'));
    const createPost = async (e) => {
        e.preventDefault();

        const { uid } = auth.currentUser;

        await setDoc(
            newRef,
            {
                post: formPost,
                discussion: id,
                author: uid,
                date: firebase.firestore.Timestamp.now()
            }
        )
        setPost('');
    }
    
    return (
        <>
            <button onClick={() => navigate('/')}>Home</button>
            {discussions && discussions.map(disc => 
                    <div>
                        <h1>{disc.title}</h1>
                        <p>{disc.description}</p>
                    </div>
                    )}
            {posts && posts.map(post => 
                    <div>
                        <p>{post.post}</p>
                    </div>
                    )}

            <form onSubmit={createPost}>
                <h1>Reply</h1>
                <input value={formPost} onChange={(e) => setPost(e.target.value)} placeholder='Say something nice' />
                <button type='submit' disabled={!formPost}>Post</button>
            </form>
        </>
    )
}
