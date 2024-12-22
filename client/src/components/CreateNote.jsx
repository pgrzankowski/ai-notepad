import { useForm } from "react-hook-form"
import { Form, Button, Alert } from "react-bootstrap"
import '../styles/CreateNote.css'
import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import { useCookies } from "react-cookie"


export default function CreateNote() {
    
    const [serverResponse, setServerResponse] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [cookies] = useCookies(['access_token'])

    const { register, handleSubmit, watch, reset, formState:{ errors }} = useForm()

    const createNote = (data) => {
        const token = cookies.access_token
        console.log(token)
        const username = jwtDecode(token).sub
        console.log(username)

        const requestOptions = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
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
            setShowAlert(true)
            
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

                {showAlert &&
                    <Alert variant="success" dismissible>
                        <p>{serverResponse}</p>
                    </Alert>
                }

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