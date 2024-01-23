import '../styles/Menu.css'
import { Link } from 'react-router-dom'


export default function Menu() {
    return (
        <div className="menu-container">
            <h1>Notepad AI</h1>
            <ul>
                <li><Link className="menuLink" to="/login">Log in</Link></li>
                <li><Link className="menuLink" to="/signup">Sign up</Link></li>
            </ul>
        </div>
    )
}