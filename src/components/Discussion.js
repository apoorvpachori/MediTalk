import React, { useState } from 'react'
import { useParams } from 'react-router'
import { auth, firestore } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';

export default function Discussion() {
    
    const { id } = useParams();

    // get discussion
    const discRef = firestore.collection('discussions');
    const query = discRef.where('id', '==', id)
    const [discussions] = useCollectionData(query)

    // get list of all posts
    const postquery = discRef.doc(id).collection('posts')
    const [posts] = useCollectionData(postquery)

    // add comment to posts
    const [formPost, setPost] = useState('');

    const createPost = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        var displayName = user.displayName
        const parts = displayName.split('|')
        displayName = parts[0]
        var isStu = parts[1]
        if (!isStu) {
            isStu = false;
        }

        await discRef.doc(id).collection('posts').doc().set(
            {
                post: formPost,
                discussion: id,
                author: displayName,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                img: user.photoURL,
                stu: isStu
          });

        setPost('');
    }

    // convert posts to array and sort
    // date format = yyyy-mm-dd hh:mm:ss
    var arr = []
    posts && posts.map(post => {
        const date = post.date && post.date.toDate().toISOString().slice(-24).replace(/T/g,' ').slice(0, 19);
        arr.push([date, post.author, post.post, post.img, post.stu])})
    arr.sort().reverse()
    console.log(arr)

    return (
        <>
            <div>
            {discussions && discussions.map(disc => 
                    <div class='thread'>
                        <div class='title'>
                            <h1 style={{fontWeight: 100}}>{disc.title}</h1>
                        </div>
                        <div class='description'>
                            <h2 style={{fontWeight: 100}}>{disc.description}</h2>
                        </div>
                        {disc.tags && 
                        <div class = 'description'>
                            <h3 style={{fontWeight: 100}}>Tags: {disc.tags}</h3>
                        </div>}
                    </div>
                    )}
            <div class='thread'>
                <form onSubmit={createPost}>
                    <input class='inputPost' value={formPost} onChange={(e) => setPost(e.target.value)} placeholder='Say something nice' />
                    <button class='postButton' type='submit' disabled={!formPost}>Post</button>
                </form>
            </div>

            <div className='thread'>
                {arr && arr.map(post => 
                        <div class='post'>
                            <div class='post'>
                                <img class='img' alt='missing' src={post[3] || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
                                <p><span style={{fontWeight: 'bold'}}>{post[1]}</span></p>
                                {post[4] && 
                                <p style={{color: 'orange'}}>(verified medical student)</p>}
                                <p>{post[0] && post[0]}</p>
                                <p>: {post[2]}</p>
                            </div>
                        </div>
                        )}
            </div>
            </div>
        </>
    )
}