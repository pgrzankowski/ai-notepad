import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import NoteContainer from './NoteContainer'
import { useAuth } from '../auth'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import create_note from '../assets/toolbar/create-note.svg'
import ai_bot from '../assets/toolbar/ai-bot.svg'

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
            <div className='home-content'>
                <div className='toolbox'>
                    <ul>
                        <li><Link className='tool' to="/create-note" ><img src={create_note} /></Link></li>
                        <li><Link className='tool' to="/chat-bot" ><img src={ai_bot} /></Link></li>
                    </ul>
                </div>
                <NoteContainer notes={notes} />
            </div>
        </div>
    )
    
}