import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieckx', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const [newSearch, setNewSearch] = useState("")
  const [filtered, setFiltered] = useState(persons)

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
      alert(`${newName} is already added to phonebook`)
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber
    }
    const temp = persons.concat(nameObject)
    setPersons(temp)  //sets persons to concatenated version
    
    setNewName("")  //clears the input field
    setNewNumber("")

    
    const filtered = temp.filter(person => 
      person.name.includes(newSearch)
      )
    
    setFiltered(filtered) 
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

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>

      <br/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleAdding={handleAdding}/>
      
      <h2>Numbers</h2>
      <Persons persons={filtered}/>

    </div>
    
  )
}

export default App