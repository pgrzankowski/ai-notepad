import Note from './Note'
import '../styles/NoteContainer.css'


export default function NoteContainer({ notes }) {
    return (
        <div className='note-container'>
            {notes.length > 0
            ? <>
                {
                    notes.map(note => {
                        return (
                            <Note key={note.id} noteId={note.id} title={note.title} content={note.content} />
                        )
                        })
                }
                </>
            : <h4 className='notes-placeholder'>Space for your notes!</h4>
                
            }
        </div>
    )
}