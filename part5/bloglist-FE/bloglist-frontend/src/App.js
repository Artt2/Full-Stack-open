import { useState, useEffect } from "react"
import Blog from "./components/Blog"
//import LoginForm from './components/LoginForm'
import loginService from "./services/login"
import blogService from "./services/blogs"
import Notification from "./components/Notification"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const [errormessage, setErrormessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => { //gets all the blogs at startup from API
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => { //tries to find user and add it at startup
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //sets the token for blogService
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {  //handles the submit of the login form
    event.preventDefault()
    try {
      //log user in using the API
      const user = await loginService.login({ //returns json info 
        username, password,
      })
      //sets the token for blogService
      blogService.setToken(user.token)
      //sets the user to localStorage
      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("logging in not succesful")
      setErrormessage("wrong username or password")
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem("loggedBlogappUser")
  }
  
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    setMessage(`${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
          <input 
          type="text"
          value={title}
          name="Title"
          onChange={({ target}) => setTitle(target.value)}  
        />
      </div>
      <div>
        author:
          <input 
          type="text"
          value={author}
          name="Author"
          onChange={({ target}) => setAuthor(target.value)}  
        />
      </div>
      <div>
        url:
          <input 
          type="text"
          value={url}
          name="Url"
          onChange={({ target}) => setUrl(target.value)}  
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  if (user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errormessage} type="error" />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input 
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
    </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} type="newBlog" />
        <p>{user.name} logged in</p>
        <button type="button" onClick={handleLogout}>logout</button>

        <h2>create new</h2>
        {blogForm()}

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

}

export default App