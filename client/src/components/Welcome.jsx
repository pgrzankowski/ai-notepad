import React, { useState, useEffect } from 'react';
import '../styles/Welcome.css'
import { Link } from 'react-router-dom'


export default function Welcome() {
    return (
        <div className="welcome">
            <div className="menu-container">
                <div className="logo-text">Notepad AI</div>
                <ul>
                    <li><Link className="menuLink" to="/login">Log in</Link></li>
                    <li><Link className="menuLink" to="/signup">Sign up</Link></li>
                </ul>
            </div>
            <div className='main-container'>
                <h1>Welcome to Notepad AI</h1>
                
                <h2>Your Intelligent Partner for All Your Note-Taking Needs</h2>
                <p>Hello and welcome to Notepad AI, the future of note-taking and organization!</p>
                
                <h3>Why Notepad AI?</h3>
                <p>Nowadays, managing your thoughts, ideas, and tasks efficiently is more important than ever. That's where Notepad AI steps in, your smart assistant designed to revolutionize the way you take notes.</p>

                <h3>What Can You Do with Notepad AI?</h3>
                <ul>
                    <li><b>Organize with Ease:</b> From personal memos to professional meetings, keep your notes organized and accessible.</li>
                    <li><b>AI-Powered Assistance:</b> Leverage cutting-edge AI to transcribe, summarize, and enhance your notes.</li>
                    <li><b>Collaborate and Share:</b> Work together with your team or share your thoughts with friends seamlessly.</li>
                    <li><b>Access Anywhere:</b> Your notes are always with you, accessible on any device, any time.</li>
                </ul>

                <h3>Get Started</h3>
                <ol>
                    <li><b>Create Your Account:</b> Quick and secure sign-up to get you started in no time.</li>
                    <li><b>Explore the Interface:</b> Intuitive and easy to navigate and use.</li>
                    <li><b>Start Creating:</b> Jot down your first note and experience the magic of AI-enhanced note-taking.</li>
                </ol>
            </div>
        </div>
    );
}
