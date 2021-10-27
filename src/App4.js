import React, { useState, useEffect } from 'react'
import axios from 'axios'

// const notelist = [
//     {
//       id: 1,
//       content: 'HTML is easy',
//       date: '2019-05-30T17:30:31.098Z',
//       important: true
//     },
//     {
//       id: 2,
//       content: 'Browser can execute only JavaScript',
//       date: '2019-05-30T18:39:34.091Z',
//       important: false
//     },
//     {
//       id: 3,
//       content: 'GET and POST are the most important methods of HTTP protocol',
//       date: '2019-05-30T19:20:14.298Z',
//       important: true
//     }
//   ]

const App4 = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState({})
    const [showAll, setShowAll] = useState(true)

    useEffect(()=> {
        axios.get('http://localhost:3001/notes').then(res=>{
            console.log(res.data)
            setNotes(res.data)
          }).catch(error=> {console.log('kek:', error.message)})

    },[])

      
      


    const filteredNotes = (showAll? notes : notes.filter(e => e.important)) //only show important notes


    // adding new Note
    const submitHandler = (e) => {


        e.preventDefault()

        axios.post('http://localhost:3001/notes', newNote)
        .then(res => {
            console.log(res)
            console.log('submitted OK')
            setNewNote({content: ''})   // empty the input field
            setNotes([...notes, newNote])
        })
    }

    const inputHandler = (e) => {
        setNewNote({
            id: notes.length+1,     // it is better to let server do the IDs
            content: e.target.value,
            important: Math.random() < 0.5,
            date: new Date().toISOString(),
        })
        console.log(e.target.value)
    }

    const btnHandler = () => {
        setShowAll(p=>!p)
    }


    return (
        <div>
            <button type="button" onClick={btnHandler}>{showAll? 'displaying all' : 'displaying important'}</button>
            <ul>
                {filteredNotes.map((each) => {
                    return <li key={each.id}>{each.content}</li>
                })}
            </ul>
            <form onSubmit={submitHandler} name="form" >
                <input type="text" onChange={inputHandler} value={newNote.content} required />
            </form>
        </div>
    )
}
export default App4
