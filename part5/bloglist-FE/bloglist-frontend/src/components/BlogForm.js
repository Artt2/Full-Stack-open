import { useState } from "react"
import { useDispatch } from "react-redux"
import { setMessage, resetMessage } from "../reducers/notificationReducer"
import { Form } from "react-bootstrap"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    dispatch(setMessage(`${title} by ${author} added`))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <Form onSubmit={addBlog}>
      <Form.Group>
        <div>
          title:
          <Form.Control
            id="title-textbox"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <Form.Control
            id="author-textbox"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <Form.Control
            id="url-textbox"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </Form.Group>
    </Form>
  )
}

export default BlogForm
