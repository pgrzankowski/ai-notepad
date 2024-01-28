import '../styles/Login.css'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = (data) => {
        console.log(data)

        reset({
            username: '',
            password: ''
        })
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors}
    } = useForm()

    console.log(watch("username"))
    console.log(watch("password"))

    return (
        <div className="login">
            <div className='form'>
                <div>
                    <h1>Log in</h1>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' placeholder='username'
                        {...register("username", { required: true, maxLength: 25 })} />
                        {errors.username?.type === "required" && <span className='formError'>Username is required</span>}
                        {errors.username?.type === "maxLength" && <span className='formError'>Can't be longer than 25 characters</span>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='password'
                        {...register("password", { required: true, minLength: 8 })} />
                        {errors.password?.type === "required" && <span className='formError'>Password is required</span>}
                        {errors.password?.type === "minLength" && <span className='formError'>Must be at least 8 characters long</span>}
                    </Form.Group>

                    <Form.Group>
                        <Button as='sub' variant='dark' onClick={handleSubmit(loginUser)}>Log in</Button>
                    </Form.Group>

                    <Form.Group>
                        <small>Do not have an account? <Link to='/signup'>Create one</Link></small>
                    </Form.Group>
                </div>
            </div>
        </div>
    )
}