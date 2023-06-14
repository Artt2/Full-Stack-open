import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const [newSearch, setNewSearch] = useState("")
  const [filtered, setFiltered] = useState(persons)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //re-renders the page when persons is updated (the json data is received from the server)
  useEffect(() => {
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(newSearch.toLowerCase())
    );
    setFiltered(filteredPersons);
  }, [persons, newSearch]); //triggers persons or newSearch updates

  const handleNameChange = (event) => {
    setNewName(event.target.value)  //sets the input fields string into the newName state
  }

  const handleAdding = (event) => {
    event.preventDefault() //prevents page from reloading 

    //check if name is already in persons

    const found = persons.some(person =>
      person.name === newName
      )
    
    if (found) {
      const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if (replace) {
        const oldObject = persons.filter(person => person.name === newName)[0]
        const newObject = { ...oldObject, number: newNumber}

        personService
          .update(newObject.id, newObject)
          .then(() => {
            setPersons(persons.map(person => person.id !== newObject.id ? person : newObject ) );  //sets persons again
            //setFiltered(filtered.map(person => person.id !== newObject.id ? person : newObject)); //sets filtered again
            setNewName("")
            setNewNumber("")
          })

      }
      //setFiltered again with the new persons info 
      const filtered = persons.filter(person => {
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      })
      setFiltered(filtered)
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber
    }
    const temp = persons.concat(nameObject) //THIS MIGHT CAUSE ERRORS

    personService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))  //set the new people
        setNewName("")  //clears the input fields
        setNewNumber("")
      })
    
    const filtered = temp.filter(person => //filters again, with the new person added
      person.name.includes(newSearch)
      )
    
    setFiltered(filtered) //shows the newly added person on the list right away
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const temp = event.target.value
    setNewSearch(event.target.value) //update the input field

    //update the filteredPersons list

    const filtered = persons.filter(person => 
      person.name.toLowerCase().includes(temp.toLowerCase())
      )
    
    setFiltered(filtered)
  }

  const handleRemove = (id) => {

    if (!(window.confirm(`Delete ${persons.filter(person => person.id === id)[0].name}`))) {
      return
    }

    personService
      .remove(id) //removes the person (sends DELETE request)
      .then(() => { //once filled
        setPersons(persons.filter(person => person.id !== id) );  //sets persons again
        setFiltered(filtered.filter(person => person.id !== id)); //sets filtered again
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>

      <br/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleAdding={handleAdding}/>
      
      <h2>Numbers</h2>
      <Persons persons={filtered} handleRemove={handleRemove}/>

    </div>
    
  )
}

export default App