import { useState } from 'react'
import React from 'react'
import '../styles/SignUp.css'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const submitForm = () => {
        console.log("Form submitted");
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)

        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div className="form">
            <div>
                <h1>Sign Up</h1>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='username'
                    value={username}
                    name='username'
                    onChange={(e) => {setUsername(e.target.value)}} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='email@email.com'
                    value={email}
                    name='email'
                    onChange={(e) => {setEmail(e.target.value)}} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='password'
                    value={password}
                    name='password'
                    onChange={(e) => {setPassword(e.target.value)}} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='password'
                    value={confirmPassword}
                    name='confirmPassword'
                    onChange={(e) => {setConfirmPassword(e.target.value)}} />
                </Form.Group>
                
                <Form.Group>
                    <Button as='sub' variant='dark' onClick={submitForm}>Sign Up</Button>
                </Form.Group>

                <Form.Group>
                        <small>Already have an account? <Link to='/login'>Log in</Link></small>
                    </Form.Group>
            </div>
        </div>
    )
}