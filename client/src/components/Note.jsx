import '../styles/Note.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import delete_note from '../assets/note/delete-note.svg'
import edit_note from '../assets/note/edit-note.svg'

export default function Note({ title, content }) {
    const [showOptions, setShowOptions] = useState(false)

    const handleEnter = () => {
        setShowOptions(true)
    }

    const handleLeave = () => {
        setShowOptions(false)
    }

    return (
        <div className="note" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <h2>{title}</h2>
            <hr />
            <div className='content'>
                <p>{content}</p>
                { showOptions &&
                <div className='options'>
                    <ul>
                        <li><Link className='option'><img src={edit_note} width='20px' height='20px' /></Link></li>
                        <li><div className='option'><img src={delete_note} width='20px' height='20px' /></div></li>
                    </ul>
                </div>
                }
            </div>
            
        </div>
    )
}