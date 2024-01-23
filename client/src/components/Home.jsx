import React, { useState, useEffect } from 'react';
import Note from './Note'
import Menu from './Menu'
import NoteContainer from './NoteContainer'
import '../styles/Home.css'


function Home() {
    const [allNotes, setAllNotes] = useState([]);

    useEffect(() => {
        fetch('api/note')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setAllNotes(data)
        })
    }, []);

    return (
        <div className="home">
            <Menu />
            <NoteContainer notes={allNotes} />
        </div>
    );
}

export default Home;