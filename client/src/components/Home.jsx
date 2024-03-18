import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import NoteContainer from './NoteContainer'
// import { useAuth } from '../auth'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import create_note from '../assets/toolbar/create-note.svg'
import ai_bot from '../assets/toolbar/ai-bot.svg'

export default function Home() {

    const authUser = useAuthUser();
    const authHeader = useAuthHeader();

    const [notes, setNotes] = useState([])


    useEffect(() => {
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': authHeader,
            },
        }

        fetch(`/api/note/${authUser.username}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            setNotes(data)
        })

    }, [])

    return (
        <div>
            <p style={{textAlign: "center"}}>Please reload once to show logout option. 
                <a href='https://github.com/react-auth-kit/react-auth-kit/issues/1541' target='_blank'>
                 (Caused by react-auth-kit not working properly)</a></p>
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