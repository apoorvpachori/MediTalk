import React from 'react'
import Browse from './Browse'
import HomeButton from './HomeButton'
import SignOut from './SignOut'

export default function NavBar() {
    return (
        <div class='navbar'>
            <Browse />
            <HomeButton />
            <SignOut />
        </div>
    )
}
