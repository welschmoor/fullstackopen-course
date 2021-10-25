import React, { useState, useRef } from 'react'

const notelist = ['oaiwdjoawijd', 'kek', 'bur']

const App4 = () => {
    const [notes, setNotes] = useState(notelist)
    const [newNote, setNewNote] = useState('')




    const submitHandler = (e) => {
        e.preventDefault()
        setNotes([...notes, newNote])
        console.log('submitted OK')
        setNewNote('')
    }

    const inputHandler = (e) => {
        setNewNote(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div>
            <ul>
                {notes.map((each) => {
                    return <li>{each}</li>
                })}
            </ul>
            <form onSubmit={submitHandler} name="form" >
                <input type="text" onChange={inputHandler} value={newNote} required />
            </form>
        </div>
    )
}
export default App4
