import '../styles/Login.css'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'

export default function Login() {
    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const { isAuth, username, login } = useAuth()
    const navigate = useNavigate()

    const loginUser = (loginData) => {
        const requestOptions = {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: loginData.username,
                password: loginData.password
            })
        }

        fetch('/api/auth/login', requestOptions)
        .then(res => {
            if (!res.ok) {
                throw new Error('Invalid server response')
            }
            return res.json();
        })
        .then(data => {
            if (data && data.access_token) {
                login(data.access_token)
                reset({
                    username: '',
                    password: ''
                })
        
                navigate('/home')
            } else {
                console.log('No access token reveived')
            }
        })
        .catch(err => {
            console.error('There was a problem while fetching: ', err)
        })
    }

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