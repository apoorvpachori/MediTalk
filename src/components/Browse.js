import React from 'react'
import { useNavigate } from 'react-router'

export default function Browse() {
    let navigate = useNavigate()
    return (
        <button class='postButton' onClick={() => navigate('/')}>Browse</button>
    )
}
