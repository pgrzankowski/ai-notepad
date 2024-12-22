import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import NoteContainer from './NoteContainer'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import create_note from '../assets/toolbar/create-note.svg'
import ai_bot from '../assets/toolbar/ai-bot.svg'
import { useCookies } from 'react-cookie'


export default function Home() {

    const [cookies, setCookie] = useCookies(['access_token'])

    const decoded = jwtDecode(cookies.access_token)
    console.log(decoded.sub)
    const username = decoded.sub

    const [notes, setNotes] = useState([])


    useEffect(() => {
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${cookies.access_token}`
            },
        }

        fetch(`/api/note/${username}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            setNotes(data)
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