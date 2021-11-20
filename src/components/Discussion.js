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

        const user = auth.currentUser;
        const displayName = user.displayName

        await setDoc(
            newRef,
            {
                post: formPost,
                discussion: id,
                author: displayName,
                date: firebase.firestore.Timestamp.now()
            }
        )
        setPost('');
    }
    
    return (
        <>
            <div>
            <button onClick={() => navigate('/')}>Home</button>
            {discussions && discussions.map(disc => 
                    <div class='thread'>
                        <div class='title'>
                            <h1 style={{fontWeight: 100}}>{disc.title}</h1>
                        </div>
                        <div class='description'>
                            <h2 style={{fontWeight: 100}}>{disc.description}</h2>
                        </div>
                    </div>
                    )}
            <div class='thread'>
                <form onSubmit={createPost}>
                    <input class='inputPost' value={formPost} onChange={(e) => setPost(e.target.value)} placeholder='Say something nice' />
                    <button class='postButton' type='submit' disabled={!formPost}>Post</button>
                </form>
            </div>

            <div class='thread'>
                {posts && posts.map(post => 
                        <div class='post'>
                            <p><span style={{fontWeight: 'bold'}}>{post.author}:</span> {post.post}</p>
                        </div>
                        )}
            </div>
            </div>
        </>
    )
}
