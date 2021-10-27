import React, { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'  // has functions     getAll(), create(newObject), update(id, newObject)


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
        let unsubBool = false
        noteService.getAll().then(res=>{
            console.log(res)
            if (!unsubBool){
                setNotes(res)
            }
        }).catch(error=> {console.log('kek:', error.message)})

        return ()=> {unsubBool = true}
    },[])

      
      


    const filteredNotes = (showAll? notes : notes.filter(e => e.important)) //only show important notes


    // adding new Note
    const submitHandler = (e) => {
        e.preventDefault()

        noteService.create(newNote)
        .then(res => {
            console.log(res)

            console.log('submitted OK')
            setNewNote({content: ''})   // empty the input field
            setNotes([...notes, res])
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

    // Changing note with axios PUT
    const toggleImoprtance = (id) => {
        console.log(`toggle ${id}`)
        const url = `http://localhost:3001/notes/${id}`
        const findNote = notes.find(e=> e.id === id)
        const updatedNote = {...findNote, important: !findNote.important}
        noteService.update(id, updatedNote)
        .then(res=> {    // set state with updated note.
            console.log('resdata', res)
            setNotes(notes.map(e=> {
                return e.id === id ?  res : e
            }))
        }).catch(error => {
            alert(`the note ${findNote.content} was already deleted`)
            setNotes(notes.filter(e => e.id !== id))
        })
        
    }


    return (
        <div>
            <button type="button" onClick={btnHandler}>{showAll? 'displaying all' : 'displaying important'}</button>
            <ul>
                {filteredNotes.map((each) => {
                    return <li key={each.id}><button onClick={()=> toggleImoprtance(each.id)}>{each.important? "V": <>&nbsp;</>}</button> {each.content} </li>
                })}
            </ul>
            <form onSubmit={submitHandler} name="form" >
                <input type="text" onChange={inputHandler} value={newNote.content} required />
            </form>
        </div>
    )
}
export default App4
