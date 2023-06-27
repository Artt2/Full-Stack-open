import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog}) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const hideWhenVisible = { display: detailsVisible ? "none" : ""}
  const showWhenVisible = { display: detailsVisible ? "" : "none"}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
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

  return (
    <div style={blogStyle}>
      <div>
        <div style={showWhenVisible}>
          {blog.title}
          <button type="button" onClick={() => setDetailsVisible(false)}>hide</button>
        </div>
        <div style={hideWhenVisible}>
        {blog.title}
          <button type="button" onClick={() => setDetailsVisible(true)}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        likes {blog.likes} <button type="button" onClick={likePost}>like</button><br/>
        {blog.author}
      </div>
    </div>
  )
}

export default Blog