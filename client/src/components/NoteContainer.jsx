import Note from './Note'
import '../styles/NoteContainer.css'

export default function NoteContainer({ notes }) {
    return (
        <div className='note-container'>
            {
                notes.map(note => {
                return (
                    <Note key={note.id} title={note.title} content={note.content} />
                )
                })
            }
        </div>
    )
}