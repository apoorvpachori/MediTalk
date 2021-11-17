import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateDiscussion() {
    let navigate = useNavigate();
    
    return (
        <>
            <button>Publish</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </>
    )
}
