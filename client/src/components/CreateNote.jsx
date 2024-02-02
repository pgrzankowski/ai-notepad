import NavBar from "./NavBar"
import { useForm } from "react-hook-form"
import { Form, Button, Alert } from "react-bootstrap"
import '../styles/CreateNote.css'
import { jwtDecode } from "jwt-decode"
import { useState } from "react"

export default function CreateNote() {
    
    const [serverResponse, setServerResponse] = useState('')

    const { register, handleSubmit, watch, reset, formState:{ errors }} = useForm()

    const createNote = (data) => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
        const username = jwtDecode(token).sub

        const requestOptions = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify({
                title: data.title,
                content: data.content
            })
        }

        fetch(`/api/note/${username}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            setServerResponse(data.message)
            
        })

        reset({
            title: '',
            content: ''
        })
    }

    console.log(watch("title"))
    console.log(watch("content"))

    return (
        <div>
            <div className="creation-form">
                <h1>Create Note</h1>

                <Alert variant="success" dismissible>
                    <p>{serverResponse}</p>
                </Alert>

                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title"
                    {...register("title", { required: true, maxLength: 30 })} />
                </Form.Group>

                <hr/>

                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" as="textarea" placeholder="Content"
                    {...register("content", { required: true })} />
                </Form.Group>

                <Form.Group>
                    <Button as='sub' variant='dark' onClick={handleSubmit(createNote)}>Create</Button>
                </Form.Group>
            </div>
        </div>
    )
}