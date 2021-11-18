import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Feed() {
    let navigate = useNavigate();
    
    return (
        <div>
            Feed placeholder
            <button onClick={() => navigate('create')}>Create Discussion</button>
        </div>
    )
}
