import React, { useEffect, useState } from 'react'
import '../styles/NavBar.css'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
// import {useIsAuthenticated} from 'react-auth-kit'
import { Link } from 'react-router-dom'


export default function NavBar() {
    const getAuthState = useIsAuthenticated();
    const isAuth = getAuthState();

    const signout = useSignOut();

    useEffect(() => {
        console.log('isAuth: ', isAuth);
    }, [isAuth])

    

    const handleSignout = () => {
        signout();
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