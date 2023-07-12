import { useQuery } from "@apollo/client"
import { ALL_BOOKS, GET_BOOKS_BY_GENRE } from "../queries"

const Books = ({show, filterGenre, setFilterGenre}) => {
  if (!show) {
    return null
  }
  
  const result = useQuery(ALL_BOOKS) //eslint-disable-line

  const allBooks = result.loading ? [] : result.data.allBooks
  
  //const books = allBooks.filter(book => filterGenre === "" ? true : book.genres.includes(filterGenre))

  //get books by genre using allBooks with a variable
  const booksByGenreResult = useQuery(GET_BOOKS_BY_GENRE, { variables: { genre: filterGenre } })  //eslint-disable-line
  
  const books = booksByGenreResult.loading ? [] : booksByGenreResult.data.allBooks

  const duplicateGenres = allBooks.flatMap(book => book.genres)
  const genres = [...new Set(duplicateGenres)]

  const setGenre = (genre) => {
    setFilterGenre(genre)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        ))}
        {<button onClick={() => setFilterGenre("")}>all genres</button>}
      </div>
    </div>
  )
}

export default Books
