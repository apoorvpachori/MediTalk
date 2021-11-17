import React from 'react'

export default function CreateDiscussion() {
    return (
        <>
            <button>Publish</button>
            <button onClick={() => window.location.href='/'}>Cancel</button>
        </>
    )
}
