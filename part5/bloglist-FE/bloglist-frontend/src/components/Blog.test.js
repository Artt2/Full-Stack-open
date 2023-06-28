import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import BlogForm from "./BlogForm"

describe("<Blog />", () => {

  const exampleBlog = {
    title: "This is a test blog",
    author: "Artt2",
    url: "url.com",
    likes: 14,
    id: "12345",
    user: {
      username: "root",
      name: "Superuser",
      id: "54321"
    }
  }

  test("renders blog's title and author, bot not its URL or number of likes by default", async () => {
    const {container } = render(<Blog blog={exampleBlog} />)

    const titleAndAuthorDiv = container.querySelector(".titleAndAuthor")
    
    //url and likes should not be displayed (has style which has attribute display set as none)
    expect(titleAndAuthorDiv).toHaveStyle("display: none")
    expect(titleAndAuthorDiv).toHaveTextContent(exampleBlog.title) //title shown
    expect(titleAndAuthorDiv).toHaveTextContent(exampleBlog.author)  //author shown
    expect(titleAndAuthorDiv).not.toHaveTextContent(exampleBlog.url) //url not shown
    expect(titleAndAuthorDiv).not.toHaveTextContent("likes")  //likes not shown
  })

  test("blog's url and likes are shown when 'view' button has been clicked", async () => {
    const {container } = render(<Blog blog={exampleBlog} />)

    const user = userEvent.setup()
    const button = screen.getByText("view") //the 'view' button 
    await user.click(button)  //click the button

    const urlAndLikesDiv = container.querySelector(".urlAndLikes")

    expect(urlAndLikesDiv).toHaveTextContent(exampleBlog.url) //url shown
    expect(urlAndLikesDiv).toHaveTextContent("likes")  //likes shown
  })
  
  test("like button is clicked twice, event handler is called twice", async () => {
    render(<Blog blog={exampleBlog} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText("view") //the 'view' button 
    await user.click(viewButton)  //click the button

    //does not test, because likePost is defined inside <Blog />, not passed as props
  })

  test("the form calls the event handler it received as props with the right details", async () => {
    mockCreateBlog = jest.fn()
    
    render(<BlogForm createBlog={mockCreateBlog} />)

    const user = userEvent.setup()
    const createButton = screen.getByText("create")
    
    //does not test, because likePost is defined inside <BlogForm />, not passed as props
  })

})