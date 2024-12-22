import '../styles/ChatBot.css'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import send_prompt from '../assets/chat_bot/send_prompt.svg'
import { useCookies } from 'react-cookie'


export default function ChatBot() {
    const [conversation, setConversation] = useState([])
    const [cookies] = useCookies(['access_token'])

    const { register, reset, handleSubmit } = useForm()

    const sendPrompt = (data) => {
        const token = cookies.access_token
        const username = jwtDecode(token).sub

        const requestOptions = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                question: data.question
            })
        }

        setConversation(prevConversation => [...prevConversation, {id: uuidv4(), sender: "user", text: data.question}])

        fetch(`/api/assistant/${username}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data.response)
            setConversation(prevConversation => [...prevConversation, {id: uuidv4(), sender: "bot", text: data.response}])
        })

        reset({
            question: ''
        })
    }

    return (
        <div className="chat-container">
            <div className='conversation-container'>
                {
                    conversation.map(message => {
                        return (
                            <div key={message.id} className={`message ${message.sender}`}>{message.text}</div>
                        )
                    })
                }
                
            </div>
            <div className='prompt-container'>
                <div className='prompt'>
                    <Form.Group className='prompt-input'>
                        <Form.Control type='text' placeholder='Ask about your notes'
                        {...register("question", {required: true})} />
                    </Form.Group>
                    <Form.Group>
                        <Button className='p-2' variant='light' onClick={handleSubmit(sendPrompt)}><img src={send_prompt} height='20px' width='20px' /></Button>
                    </Form.Group>
                </div>
            </div>
        </div>
    )
}