import '../styles/Login.css'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = () => {
        console.log("Form submitted");
        console.log(username)
        console.log(password)

        setUsername('')
        setPassword('')
    }

    return (
        <div className="login">
            <div className='form'>
                <div>
                    <h1>Log in</h1>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' placeholder='username'
                        value={username}
                        name='username'
                        onChange={(e) => {setUsername(e.target.value)}} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='password'
                        value={password}
                        name='password'
                        onChange={(e) => {setPassword(e.target.value)}} />
                    </Form.Group>

                    <Form.Group>
                        <Button as='sub' variant='dark' onClick={loginUser}>Log in</Button>
                    </Form.Group>

                    <Form.Group>
                        <small>Do not have an account? <Link to='/signup'>Create one</Link></small>
                    </Form.Group>
                </div>
            </div>
        </div>
    )
}