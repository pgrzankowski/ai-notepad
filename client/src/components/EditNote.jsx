import { useForm } from "react-hook-form"
import { Form, Button, Alert } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";



export default function EditNote() {
    const [serverResponse, setServerResponse] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const location = useLocation()
    const { noteId } = location.state;

    const { register, handleSubmit, watch, setValue, formState: { errors }} = useForm()

    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    const username = jwtDecode(token).sub

    const updateNote = (data) => {
        const requestOptions = {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify({
                title: data.title,
                content: data.content
            })
        }

        fetch(`/api/note/${username}/${noteId}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            setServerResponse(data.message)
            setShowAlert(true)
        })
    }

    useEffect(() => {
        console.log(username)

        const requestOptions = {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        }

        fetch(`/api/note/${username}/${noteId}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            setValue('title', data.title)
            setValue('content', data.content)
        })
    }, [])

    return (
        <div>
            <div className="creation-form">
                <h1>Edit Note</h1>

                {showAlert &&
                    <Alert variant="success" dismissible>
                        <p>{serverResponse}</p>
                    </Alert>
                }

                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title"
                    {...register("title", { required: true })} />
                </Form.Group>

                <hr/>

                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" as="textarea" placeholder="Content"
                    {...register("content", { required: true })} />
                </Form.Group>

                <Form.Group>
                    <Button as='sub' variant='dark' onClick={handleSubmit(updateNote)}>Save</Button>
                </Form.Group>

            </div>
        </div>
    )
}