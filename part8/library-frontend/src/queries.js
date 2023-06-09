import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author {
      name
    }
    genres
  }
}
`

export const GET_USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const GET_BOOKS_BY_GENRE = gql`
query getBooksByGenre($genre: String!) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
      born
    }
    genres
    id
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    published
    genres
    id
  }
}
`

export const EDIT_BORN = gql`
mutation editBorn($name: String!, $setBornTo: Int) {
  editAuthor (
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
    bookCount
  }
}
`

export const LOGIN = gql`
mutation something($username: String!, $password: String!) {
  login (
    username: $username,
    password: $password
  ) {
    value
  }
}
`