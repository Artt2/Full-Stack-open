import { useQuery } from "@apollo/client"
import { ALL_BOOKS, GET_USER } from "../queries"

const Recommended = ({show}) => {

  if (!show) {
    return null
  }

  const booksResult = useQuery(ALL_BOOKS) //eslint-disable-line
  const userResult = useQuery(GET_USER) //eslint-disable-line

  const allBooks = booksResult.loading ? [] : booksResult.data.allBooks

  if (userResult.loading) {
    return null
  }

  const user = userResult.data.me

  const recommendedBooks = allBooks.filter(book => book.genres.includes(user.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {user.favoriteGenre}</p>
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Recommended