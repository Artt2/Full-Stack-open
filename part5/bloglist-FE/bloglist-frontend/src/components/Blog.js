import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, blogs, setBlogs }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const hideWhenVisible = { display: detailsVisible ? "none" : "" }
  const showWhenVisible = { display: detailsVisible ? "" : "none" }

  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
  const loggedUser = JSON.parse(loggedUserJSON)
  const showRemoveButton = blog.user.username === loggedUser.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const likePost = async () => {
    const blogObject = {  //the new blog object for put
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.likePost(blogObject, blog.id)  //calling the service's likePost function
    //update the likes, since new data isnt asked from the database until refresh
    blog.likes = blogObject.likes
    //setDetailsVisible(!detailsVisible)
    setDetailsVisible(!detailsVisible)
  }

  const removeBlog = async () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (result) {
      const token = loggedUser.token
      await blogService.removeBlog(blog.id, token)

      const filteredBlogs = blogs.filter((b) => b.id !== blog.id)

      setBlogs(filteredBlogs)

    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}
          <button type="button" onClick={() => setDetailsVisible(false)}>hide</button>
        </div>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button type="button" onClick={() => setDetailsVisible(true)}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        likes {blog.likes} <button type="button" onClick={likePost}>like</button><br/>
        {blog.user.name}
        {showRemoveButton && (<button type="button" onClick={removeBlog}>remove</button>)}
      </div>
    </div>
  )
}

export default Blog