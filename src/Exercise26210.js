import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Searchinput from "./phoneComponents/Searchinput"
import Form from "./phoneComponents/Form"
import Personlist from "./phoneComponents/Personlist"

const contacts = [
  { name: 'Arto Hellas', phone: '222-222-222' },
  { name: 'Arti Smis', phone: '645-222-3452' },
  { name: 'Mike Bless', phone: '412-222-3543' },
  { name: 'John Adamns', phone: '2675-222-222' },
  { name: 'Monkey Type', phone: '567-3543-3452' },
]

const App5 = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')  // only show contacts whose name .includes(filter) string
    

    useEffect(()=> {
      let unsub = false
      
      axios
        .get('http://localhost:3001/persons')
        .then(res => {
            if (!unsub) {setPersons(res.data)}
      })
      
      return () => {unsub = true}
    },[])
  



    const submitHandler = (e) => {
      e.preventDefault()

      // checking for duplicates
      let abort = false
      persons.forEach(each => {
        if (each.name.toLowerCase() === newName.toLowerCase()) {abort = true};
      })
      if (abort) {
        alert(`name ${newName} already exists!`)
        setNewName('')
        setNewPhone('')
        return
      }

      setPersons([...persons, {name: newName, number: newPhone } ])
      setNewName('')
      setNewPhone('')
    }


    const inputHandler = (e) => {
      setNewName(e.target.value)
    }
    const inputHandler2 = (e) => {
      setNewPhone(e.target.value)
    }

    const searchInputHandler = (e) => {
      setFilter(e.target.value)
    }

    return (
    <center>
        <h1>Phonebook</h1>
        <Searchinput onChange={searchInputHandler} />
        <h2>+Add contact</h2>
        <Form sending={{submitHandler, newName, inputHandler, inputHandler2, newPhone}}/>
        <br/>
    
        <h2>Numbers</h2>

        <Personlist sending={{filter, persons}}/>

    </center>
    )
}

export default App5
