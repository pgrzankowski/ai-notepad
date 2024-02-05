import '../styles/ChatBot.css'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { jwtDecode } from 'jwt-decode'

export default function ChatBot() {

    const { register, watch, reset, handleSubmit } = useForm()

    const sendPrompt = (data) => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
        const username = jwtDecode(token).sub

        const requestOptions = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify({
                question: data.question
            })
        }

        fetch(`/api/note/chat-bot/${username}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data.response)
        })

        reset({
            question: ''
        })
    }

    return (
        <div className="chat-container">
            <div className='conversation-container'>
                
            </div>
            <div className='prompt-container'>
                <div className='prompt'>
                    <Form.Group className='prompt-input'>
                        <Form.Control type='text' placeholder='Ask about your notes'
                        {...register("question", {required: true})} />
                    </Form.Group>
                    <Form.Group>
                        <Button variant='primary' onClick={handleSubmit(sendPrompt)}>^</Button>
                    </Form.Group>
                </div>
            </div>
        </div>
    )
}