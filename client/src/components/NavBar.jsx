import '../styles/NavBar.css'
import { useAuth, logout } from '../auth'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'




export default function NavBar() {

    const [logged] = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="menu-container">
            <div className="logo-text">Notepad AI</div>
            <ul>
                {logged
                ? 
                <li><button className="menuLink" onClick={handleLogout}>Log out</button></li>
                : 
                <>
                <li><Link className="menuLink" to="/login">Log in</Link></li>
                <li><Link className="menuLink" to="/signup">Sign up</Link></li>
                </>
                }
            </ul>
        </div>
    )
}