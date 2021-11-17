import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return(
        <>
            Welcome to MediTalk
            <li>
                <Link to='/signin'>Sign In</Link>
            </li>
        </>
      )
}
