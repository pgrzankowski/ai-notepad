import { useForm } from "react-hook-form"
import { Form, Button, Alert } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";


export default function EditNote() {
    const [serverResponse, setServerResponse] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [cookies] = useCookies(['access_token'])

    const location = useLocation()
    const { noteId } = location.state;

    const { register, handleSubmit, watch, setValue, formState: { errors }} = useForm()

    const token = cookies.access_token
    const username = jwtDecode(token).sub

    const updateNote = (data) => {
        const requestOptions = {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
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
                'Authorization': `Bearer ${token}`
            }
        }

        fetch(`/api/note/${username}/${noteId}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
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