describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset") //reset db info

    const user = {
      username: "testuser",
      name: "Artt2",
      password: "testpassword",
    }

    cy.request("POST", "http://localhost:3003/api/users", user) //create new user

    cy.visit("http://localhost:3000") //visit blog page
  })

  it("Login form is shown", function () {
    cy.contains("Log in to application") //contains header for login form
  })

  describe("Login", function () {
    //inner describe for testing login
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("testuser") //get first input element
      cy.get("input:last").type("testpassword") //get last input element
      cy.get("#login-button").click()
      cy.contains("blogs") //contains blogs header
      cy.contains("create new") //contains create new header
    })

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("wronguser") //get first input element
      cy.get("input:last").type("wrongpassword") //get last input element
      cy.get("#login-button").click()
      cy.contains("wrong username or password") //notification is displayed
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("input:first").type("testuser") //get first input element
      cy.get("input:last").type("testpassword") //get last input element
      cy.get("#login-button").click()
    })

    it("A blog can be created", function () {
      cy.contains("new blog").click()
      cy.get("#title-textbox").type("testtitle")
      cy.get("#author-textbox").type("testauthor")
      cy.get("#url-textbox").type("testurl")
      cy.get("#create-button").click()
      cy.contains("testtitle by testauthor added") //notification is displayed
    })

    it("user can like a blog", function () {
      cy.contains("new blog").click()
      cy.get("#title-textbox").type("testtitle")
      cy.get("#author-textbox").type("testauthor")
      cy.get("#url-textbox").type("testurl")
      cy.get("#create-button").click()
      cy.contains("view").click() //view the whole blog
      cy.get("#like-button").click()
      cy.contains("view").click()
      cy.contains("likes 1") //likes increased to 1
    })

    it("user can remove a blog", function () {
      cy.contains("new blog").click()
      cy.get("#title-textbox").type("testtitle")
      cy.get("#author-textbox").type("testauthor")
      cy.get("#url-textbox").type("testurl")
      cy.get("#create-button").click()
      cy.contains("view").click() //view the whole blog
      cy.get("#remove-button").click()
      cy.contains("testtitle").not()
    })

    it.only("post sorted by likes", function () {
      cy.contains("new blog").click()
      cy.get("#title-textbox").type("testtitle")
      cy.get("#author-textbox").type("testauthor")
      cy.get("#url-textbox").type("testurl")
      cy.get("#create-button").click()
      cy.contains("view").click() //view the whole blog
      cy.get("#like-button").click()
      cy.contains("view").click()

      cy.contains("new blog").click()
      cy.get("#title-textbox").type("testtitle2")
      cy.get("#author-textbox").type("testauthor2")
      cy.get("#url-textbox").type("testurl2")
      cy.get("#create-button").click()

      cy.get(".blog")
        .eq(0)
        .should("contain", "testtitle")
        .and("contain", "likes 1") //first blog contains 1 likes
      cy.get(".blog")
        .eq(1)
        .should("contain", "testtitle2")
        .and("contain", "likes 0") //second blog contains 0 likes
    })
  })
})
