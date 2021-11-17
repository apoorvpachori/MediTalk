import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Feed() {
    const redirect = () => {
        <Navigate to='/create' />
    }
    
    return (
        <div>
            Feed placeholder
            <button onClick={() => redirect}>Create Discussion</button>
        </div>
    )
}
