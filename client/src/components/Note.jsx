import '../styles/Note.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import delete_note from '../assets/note/delete-note.svg'
import edit_note from '../assets/note/edit-note.svg'
import { jwtDecode } from 'jwt-decode'

export default function Note({ noteId, title, content }) {
    const [showOptions, setShowOptions] = useState(false)

    const handleEnter = () => {
        setShowOptions(true)
    }

    const handleLeave = () => {
        setShowOptions(false)
    }

    const handleDelete = () => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
        const username = jwtDecode(token).sub

        const requestOptions = {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        }

        fetch(`/api/note/${username}/${noteId}`, requestOptions)

    }

    return (
        <div className="note" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <div className='content'>
                <h2>{title}</h2>
                <hr />
                <p>{content}</p>
            </div>
            { showOptions &&
            <div className='options'>
                <ul>
                    <li><Link className='option'><img src={edit_note} width='20px' height='20px' /></Link></li>
                    <li><div className='option' onClick={handleDelete}><img src={delete_note} width='20px' height='20px' /></div></li>
                </ul>
            </div>
            }
        </div>
    )
}