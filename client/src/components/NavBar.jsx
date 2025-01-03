import React, { useEffect} from 'react'
import '../styles/NavBar.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'


export default function NavBar() {
    const { isAuth, logout } = useAuth()

    useEffect(() => {
        console.log('isAuth: ', isAuth);

    }, [isAuth])

    

    const handleSignout = () => {
        logout();
        window.location.reload();
    }


    return (
        <div className="menu-container">
            <Link className="logo-text" to="/home">Notepad AI</Link>
            <ul>
                {isAuth
                ? 
                <li><button className="menuLink" onClick={handleSignout}>Log out</button></li>
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