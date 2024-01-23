import '../styles/Note.css'

export default function Note({ title, content }) {
    return (
        <div className="note">
            <h2>{title}</h2>
            <hr />
            <p>{content}</p>
        </div>
    )
}