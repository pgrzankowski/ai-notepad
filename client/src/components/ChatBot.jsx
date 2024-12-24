import '../styles/ChatBot.css'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '../hooks/AuthProvider'
import send_prompt from '../assets/chat_bot/send_prompt.svg'
import assistant from "../assets/toolbar/ai-bot.svg"
import Markdown from 'react-markdown'


export default function ChatBot() {
    const { user } = useAuth()
    const { register, reset, handleSubmit } = useForm()
    const [buttonAnimation, setButtonAnimation] = useState(false)
    const [conversation, setConversation] = useState([
        {id: uuidv4(), sender: "bot", text: `Hello, ${user.username}! How can I help you?`}
    ])
    const [isThinking, setIsThinking] = useState(false)


    const sendPrompt = (data) => {
        setIsThinking(true)
        setButtonAnimation(true);
        setTimeout(() => setButtonAnimation(false), 300);

        const requestOptions = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                question: data.question
            })
        }

        setConversation(prevConversation => [...prevConversation, {id: uuidv4(), sender: "user", text: data.question}])

        fetch(`/api/assistant/${user.username}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data.response)
            setConversation(prevConversation => [...prevConversation, {id: uuidv4(), sender: "bot", text: data.response}])
        })
        .finally(() => setIsThinking(false))

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
                            <div key={message.id} style={{display: 'flex'}}>
                                {message.sender === 'bot'
                                ?   <div className='bot'>
                                        <img src={assistant} />
                                        <div>
                                            <Markdown>{message.text}</Markdown>
                                        </div>
                                    </div>
                                :   <div className='user'>
                                        {message.text}
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                {isThinking &&
                <div className='bot'>
                    <img src={assistant} />
                    <div className='message bot thinking'>
                        Thinking...
                    </div>
                </div>
                }
                
            </div>
            <div className='prompt-container'>
                <Form.Group className='prompt-input-container'>
                    <Form.Control type='text' placeholder='Ask about your notes' 
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(sendPrompt)()}
                    className='prompt-input'
                    {...register("question", {required: true})} />
                </Form.Group>
                <Form.Group>
                    <button 
                    className={`prompt-send ${buttonAnimation ? 'animate' : ''}`}
                    onClick={handleSubmit(sendPrompt)}>
                        <img src={send_prompt} />
                    </button>
                </Form.Group>
            </div>
        </div>
    )
}