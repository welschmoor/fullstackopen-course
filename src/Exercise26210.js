import React, { useState } from 'react'


const contacts = [
  { name: 'Arto Hellas', phone: '222-222-222' },
  { name: 'Arti Smis', phone: '645-222-3452' },
  { name: 'Mike Bless', phone: '412-222-3543' },
  { name: 'John Adamns', phone: '2675-222-222' },
  { name: 'Monkey Type', phone: '567-3543-3452' },
]

const App5 = () => {
    const [persons, setPersons] = useState(contacts)
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')
    

    const submitHandler = (e) => {
      e.preventDefault()

      // checking for duplicates
      let abort = false
      persons.map(each => {
        if (each.name.toLowerCase() === newName.toLowerCase()) abort = true;
      })
      if (abort) {
        alert(`name ${newName} already exists!`)
        setNewName('')
        setNewPhone('')
        return
      }

      setPersons([...persons, {name: newName, phone: newPhone } ])
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
        <h2>Phonebook</h2>
        Search: <input input="text" placeholder="search contacts" onChange={searchInputHandler} />
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={submitHandler}>
            <div>
                name: <input value={newName} onChange={inputHandler} required/>
            </div>
            <div>
                phone: <input value={newPhone} onChange={inputHandler2} required />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        <br/>
        <br/>
        <br/>
        <h2>Numbers</h2>
        <ul>
        {!filter && persons.map(each=>{
          return(
            <li key={each.name}>
              {each.name} {each.phone}
            </li>
          )
        })}

        {
        filter && persons.filter(each=> {
          if (each.name.toLowerCase().includes(filter.toLowerCase())) return true
        }).map(each=>{
          return(
            <li key={each.name}>
              {each.name} {each.phone}
            </li>
          )
        })
        }

        </ul>

    </center>
    )
}

export default App5
