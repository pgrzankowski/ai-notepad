import { useEffect, useState } from 'react'
import NoteContainer from './NoteContainer'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import create_note from '../assets/toolbar/create-note.svg'
import ai_bot from '../assets/toolbar/ai-bot.svg'
import { useAuth } from '../hooks/AuthProvider'

export default function Home() {
    const [notes, setNotes] = useState([])
    const { user } = useAuth()

    useEffect(() => {        
        const requestOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.access_token}`
            },
        }

        fetch(`/api/note/${user.username}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            setNotes(data)
        })

    }, [])

    return (
        <div className='home-container'>
            <div className='home-header'>
                <h1>Hi, {user.username}!</h1>
            </div>
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