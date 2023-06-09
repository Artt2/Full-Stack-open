import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [filterGenre, setFilterGenre] = useState("")

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage("recommended")}>recommended</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} filterGenre={filterGenre} setFilterGenre={setFilterGenre} />

      {<NewBook show={page === 'add'} />}

      {<Recommended show={page === "recommended"} />}

      <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
