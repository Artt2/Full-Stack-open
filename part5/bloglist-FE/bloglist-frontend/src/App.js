import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import loginService from "./services/login"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [user, setUser] = useState(null)

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

  const blogFormRef = useRef()

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

  const createBlog = async (blogObject) => {
    const blogFromDatabase = await blogService.create(blogObject)  //add blog to database

    const blogObjectWithUser = {
      ...blogFromDatabase,
      user: user
    }

    setBlogs(blogs.concat(blogObjectWithUser))  //the new blog is not pulled from db, this serves until refresh
    blogFormRef.current.toggleVisibility()
  }

  if (user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errormessage} type="error" />
        <LoginForm username={username} setUsername={setUsername} handleLogin={handleLogin} password={password} setPassword={setPassword} />
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
        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} setMessage={setMessage} />
        </Togglable>

        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
        )}
      </div>
    )
  }
}

export default App