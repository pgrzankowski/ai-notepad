import React from 'react'
import '../styles/SignUp.css'
import { useState } from 'react'
import { Form, Button, Alert, AlertLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function SignUp() {

    const { register, handleSubmit, watch, reset, formState:{ errors } } = useForm()
    const [showAlert, setShowAlert] = useState(false)
    const [serverResponse, setServerResponse] = useState('')

    const submitForm = (data) => {

        if (data.password === data.confirmPassword) {
            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password
                })
            }
    
            fetch('/api/auth/signup', requestOptions)
            .then(res => res.json())
            .then(data => {
                setServerResponse(data.message)
                setShowAlert(true)
            })
            .catch(err => console.log(err))
    
            reset({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } else {
            alert('Passwords do not match')
        }
    }

    console.log(watch("username"))
    console.log(watch("email"))
    console.log(watch("password"))
    console.log(watch("confirmPassword"))

    return (
        <div className="form">
            <div>
                <h1>Sign Up</h1>

                {showAlert &&
                    <Alert variant='success' onClose={() => setShowAlert(false)} dismissible>
                        <p>{serverResponse}</p>
                    </Alert>
                }

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='username'
                    {...register("username", { required: true, maxLength: 25 })} />
                    {errors.username?.type === "required" && <span className='formError'>Username is required</span>}
                    {errors.username?.type === "maxLength" && <span className='formError'>Can't be longer than 25 characters</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='email@email.com'
                    {...register("email", { required: true, maxLength: 80 })} />
                    {errors.email && <span className='formError'>Email is required</span>}
                    {errors.email?.type === "maxLength" && <span className='formError'>Can't be longer than 80 characters</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='password'
                    {...register("password", { required: true, minLength: 8 })} />
                    {errors.password?.type === "required" && <span className='formError'>Password is required</span>}
                    {errors.password?.type === "minLength" && <span className='formError'>Must be at least 8 characters long</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='password'
                    {...register("confirmPassword", { required: true, minLength: 8 })} />
                    {errors.confirmPassword?.type === "required" && <span className='formError'>Passwords must match</span>}
                    {errors.confirmPassword?.type === "minLength" && <span className='formError'>Must be at least 8 characters long</span>}
                </Form.Group>
                
                <Form.Group>
                    <Button as='sub' variant='dark' onClick={handleSubmit(submitForm)}>Sign Up</Button>
                </Form.Group>

                <Form.Group>
                        <small>Already have an account? <Link to='/login'>Log in</Link></small>
                    </Form.Group>
            </div>
        </div>
    )
}