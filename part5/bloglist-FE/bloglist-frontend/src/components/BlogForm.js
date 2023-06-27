import { useState } from "react"

const BlogForm = ({ createBlog, setMessage }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: title,
        author: author,
        url: url,
      })
    
    setMessage(`${title} by ${author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000) 
    
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
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
}

export default BlogForm