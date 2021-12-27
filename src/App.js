import React, { useState, useEffect } from 'react'

import loginService from './services/login'
import noteService from './services/notes'  // has functions     getAll(), create(newObject), update(id, newObject)
import Notification from './components/Notification'

import Footer from "./components/Footer.js"


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({})
  const [showAll, setShowAll] = useState(true)
  const [errorStr, setErrorStr] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  ////////////////////////////////////////////////////////////////////////////////
  // FETCH all notes
  useEffect(() => {
    let unsubBool = false
    noteService.getAll().then(res => {
      if (!unsubBool) {
        setNotes(res)
      }
    }).catch(error => { console.log('kek:', error.message) })

    return () => { unsubBool = true }
  }, [])


  ////////////////////////////////////////////////////////////////////////////////
  // Token Check in Local Storage.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])



  const filteredNotes = (showAll ? notes : notes.filter(e => e.important)) //only show important notes

  ////////////////////////////////////////////////////////////////////////////////
  // ADD new Note
  const submitHandler = (e) => {
    e.preventDefault()

    noteService
      .create(newNote)
      .then(res => {
        console.log(res)

        console.log('submitted OK')
        setNewNote({ content: '' })   // empty the input field
        setNotes([...notes, res])
      }).catch(error => {
        setErrorStr(`${error.response.data}`)
        console.log("<><><>ValidationError", error.response.data, "end//ValidationError")
      })
  }


  const inputHandler = (e) => {
    setNewNote({
      id: notes.length + 1,     // it is better to let server do the IDs
      content: e.target.value,
      important: Math.random() < 0.5,
      date: new Date().toISOString(),
    })
    console.log(e.target.value)
  }

  const btnHandler = () => {
    setShowAll(p => !p)
  }

  //////////////////////////////////////////////////////////////////////
  // CHANGE note with axios PUT
  const toggleImoprtance = (id) => {

    const findNote = notes.find(e => e.id === id)
    const updatedNote = { ...findNote, important: !findNote.important }
    noteService.update(id, updatedNote)
      .then(res => {    // set state with updated note.
        console.log('resdata', res)
        setNotes(notes.map(e => {
          return e.id === id ? res : e
        }))
      }).catch(error => {
        setErrorStr(`the note ${findNote.content} was already deleted`)
        setTimeout(() => {
          setErrorStr(null)
        }, 5000)

        setNotes(notes.filter(e => e.id !== id))
      })
  }


  /////////////////////////////
  //   LOGIN 
  const loginHandler = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorStr('Wrong credentials')
      setTimeout(() => {
        setErrorStr(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={loginHandler}>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={submitHandler} name="form" >
      <input type="text" onChange={inputHandler} value={newNote.content} required />
    </form>
  )


  return (
    <div>
      <Notification message={errorStr} />
      {user === null && loginForm()}
      {user !== null && noteForm()}
      {user !== null && <div>Hello, {user.name}</div>}


      <button type="button" onClick={btnHandler}>{showAll ? 'displaying all' : 'displaying important'}</button>
      <ul>
        {filteredNotes.map((each) => {
          return <li key={each.id}><button onClick={() => toggleImoprtance(each.id)}>{each.important ? "V" : <>&nbsp;</>}</button> {each.content} </li>
        })}
      </ul>



      <Footer />
    </div>
  )
}

export default App
