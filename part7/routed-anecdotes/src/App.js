import { useState } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const {reset: resetContent, ...content} = useField("text")
  const {reset: resetAuthor, ...author} = useField("text")
  const {reset: resetUrl, ...url} = useField("text")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: url.value,
      votes: 0
    })

    navigate("/")
    props.setNotification(`a new anecdote ${content} created!`)
    setTimeout(() => {
      props.setNotification("")
    }, 5000)
  }

  const resetForm = () => {
    content.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content}/>
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...url} />
        </div>
        <button>create</button>
      </form>
      <button onClick={resetForm}>reset</button>
    </div>
  )

}

const Anecdote = ({ anecdote }) => {

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.url}>{anecdote.url}</a></p>
    </div>
  )
}

const Notification = ({ message }) => (
  <p>{message}</p>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch("/anecdotes/:id")
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification.length !== 0 ? <Notification message={notification}/> : null }
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/Create" element={<CreateNew addNew={addNew} setNotification={setNotification} />} /> 
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote}/>}/>
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App