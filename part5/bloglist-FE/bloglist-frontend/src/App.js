import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import loginService from "./services/login"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import { useDispatch, useSelector } from "react-redux"
import { setMessage, resetMessage } from "./reducers/notificationReducer"
import Users from "./components/Users"
import { Routes, Route, Link } from "react-router-dom"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [user, setUser] = useState(null)

  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    //gets all the blogs at startup from API
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    //tries to find user and add it at startup
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //sets the token for blogService
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef(null) //initialize with null

  const handleLogin = async (event) => {
    //handles the submit of the login form
    event.preventDefault()
    try {
      //log user in using the API
      const user = await loginService.login({
        //returns json info
        username,
        password,
      })
      //sets the token for blogService
      blogService.setToken(user.token)
      //sets the user to localStorage
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("logging in not succesful")
      //setErrormessage("wrong username or password")
      dispatch(setMessage("wrong username or password"))
      setTimeout(() => {
        //setErrormessage(null)
        dispatch(resetMessage())
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem("loggedBlogappUser")
  }

  const createBlog = async (blogObject) => {
    const blogFromDatabase = await blogService.create(blogObject) //add blog to database

    const blogObjectWithUser = {
      ...blogFromDatabase,
      user: user,
    }

    setBlogs(blogs.concat(blogObjectWithUser)) //the new blog is not pulled from db, this serves until refresh
    blogFormRef.current.toggleVisibility()
  }

  const MainPage = () => {
    return (
      <div>
        <h2>create new</h2>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} setMessage={setMessage} />
        </Togglable>
        <h2>blogs</h2>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              className="blog"
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
            />
          ))}
        </div>
    )
  }

  const padding = {
    padding: 5
  }

  const navBarStyle = {
    backgroundColor: "lightgray"
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} type="error" />
        <LoginForm
          username={username}
          setUsername={setUsername}
          handleLogin={handleLogin}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blog app</h2>
        <Notification message={notification} type="newBlog" />

        <div style={navBarStyle}>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          {user.name} logged in
          <button id="logout-button" type="button" onClick={handleLogout}>
            logout
          </button>
        </div>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/users" element={<Users />} />
        </Routes>

      </div>
    )
  }
}

export default App
