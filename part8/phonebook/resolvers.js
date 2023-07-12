const { GraphQLError } = require('graphql')
const jwt = require("jsonwebtoken")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({}) //all books
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allBooks: async (root, args) => {
      let query = {}
      if (args.genre) {
        query.genres = { $in: [args.genre] }
      }
      const retBooks = await Book.find(query).populate("author")  //populate author
      return retBooks
    },
    allAuthors: async () => {
      const authors = await Author.find({}) //bookCount not required
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser  //return the user from the context.currentUser field that was added
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        return null
      }

      let author = await Author.findOne({ name: args.author })  //try to find Author from database
      if (!author) {  //author not found
        author = new Author({
          name: args.author,
          born: null
        })
        try {
          await author.save() //create new author to db
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error
            }
          })
        }
      }
      const newBook = new Book({
        ...args,
        author: author._id  //save id that references author
      })
      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: {...args},
            error
          }
        })
      }

      return newBook
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        return null
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {  //if not found, return null
        return null
      } else if (args.setBornTo) {
        await Author.updateOne({ _id: author._id }, { born: args.setBornTo }) //update
        const updatedAuthor = Author.findOne({ _id: author._id})  //get updated one
        return updatedAuthor
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError("Creating the user failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: error,
              //args.name //is there .name even?
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extension: {
            code: "BAD_USER_INPUT"
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

module.exports = resolvers