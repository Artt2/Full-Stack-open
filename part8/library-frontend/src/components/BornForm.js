import { ALL_AUTHORS, EDIT_BORN } from "../queries"
import { useMutation } from "@apollo/client"
import { useState } from "react"

const BornForm = ({ authors }) => {
  const [born, setBorn] = useState("")
  const [selectState, setSelectState] = useState(authors[0].name)
  const [ changeBorn ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS}],
  })

  const handleSelect = (event) => {
    console.log(`changed to: ${event.target.value}`)
    setSelectState(event.target.value)
  }

  const submitYear = async (event) => {
    event.preventDefault()

    changeBorn({ variables: {name: selectState, setBornTo: Number(born)}})

    setBorn("")
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <select value={selectState} onChange={handleSelect}>
        {authors.map((author) => (
          <option key={author.name} value={author.name}>{author.name}</option>
        ))}
      </select>
      <form onSubmit={submitYear}><br/>
        born <input 
          type="number" 
          value={born} 
          onChange={({ target }) => setBorn(target.value)} 
        />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BornForm