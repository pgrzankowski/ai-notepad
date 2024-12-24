import { createContext, useContext, useState, useEffect } from 'react'
import {Cookies} from 'react-cookie'
import { jwtDecode } from 'jwt-decode'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState(null)

    const cookies = new Cookies()

    useEffect(() => {
        const token = cookies.get('access_token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const username = decodedToken.sub;
                setIsAuth(true);
                setUser({ username, token });
            } catch (error) {
                console.error('Invalid token:', error);
                cookies.remove('access_token');
            }
        }
    }, []);

    const login = (access_token) => {
        cookies.set('access_token', access_token)
        const username = jwtDecode(access_token).sub
        setIsAuth(true)
        setUser({username, token: access_token})
    }

    const logout = () => {
        cookies.remove('access_token')
        setIsAuth(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{isAuth, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}