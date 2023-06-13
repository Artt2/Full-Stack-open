const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, handleAdding}) => {

  return (
    <>
      <form onSubmit={handleAdding}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm