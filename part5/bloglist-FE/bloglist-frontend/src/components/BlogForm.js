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
          id="title-textbox"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author-textbox"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url-textbox"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  )
}

export default BlogForm