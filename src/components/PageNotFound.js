import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router'

export default function PageNotFound() {
    let navigate = useNavigate()
    
    return (
        <>
            <div class='pageNotFound'>
                Access Denied
                <div>
                    <button class='postButton' onClick={() => navigate('/')}>Home</button>
                </div>
            </div>
            
        </>
    )
}
