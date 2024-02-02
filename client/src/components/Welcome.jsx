import React, { useState, useEffect } from 'react';
import '../styles/Welcome.css'
import { Link } from 'react-router-dom'
import Note from './Note'



export default function Welcome() {
    return (
        <div className="welcome">
            <div className='main-container'>
                <div className='main-message'>
                    <h1>Welcome to Notepad AI</h1>
                    <h2>Your Intelligent Partner for All Your Note-Taking Needs</h2>
                </div>

                <div className='information-box'>
                    <div className='why-notepad-container'>
                        <h3>Why Notepad AI?</h3>
                        <p>Nowadays, managing your thoughts, ideas, and tasks efficiently is more important than ever. That's where Notepad AI steps in, your smart assistant designed to revolutionize the way you take notes.</p>
                    </div>

                    <div className='get-started-container'>
                        <h3>Start noting!</h3>
                        <p>Enjoy intuitive interface which is easy to navigate and use. Write down your first note and experience the magic of AI-enhanced note-taking.</p>
                        <Link className="menuLink" to="/signup">Get Started</Link>
                    </div>

                </div>
                

                <div className='what-can-you-do'>
                    <h3>What Can You Do with Notepad AI?</h3>
                    <div className='ideas-container'>
                        <Note title='Organize with Ease' content='From personal memos to professional meetings, keep your notes organized and accessible.'></Note>
                        <Note title='AI-Powered Assistance' content='Leverage cutting-edge AI to transcribe, summarize, and enhance your notes.'></Note>
                        <Note title='Collaborate and Share' content='Work together with your team or share your thoughts with friends seamlessly.'></Note>
                    </div>
                </div>
            </div>
        </div>
    );
}
