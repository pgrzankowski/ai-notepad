import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import NoteContainer from './NoteContainer'
import { useAuth } from '../auth'
import NavBar from './NavBar'

export default function Home() {
    const [logged] = useAuth()

    console.log(logged)

    const [notes, setNotes] = useState([])


    useEffect(() => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
        const username = jwtDecode(token).sub

        console.log(username)

        const requestOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
        }

        fetch(`/api/note/${username}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            setNotes(data)
            console.log(data)
        })
    }, [])

    return (
        <div>
            <NavBar />
            <div className=''>

            </div>
            <NoteContainer notes={notes} />
        </div>
    )
    
}