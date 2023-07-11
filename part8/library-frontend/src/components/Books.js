import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = ({show, filterGenre, setFilterGenre}) => {

  if (!show) {
    return null
  }

  const result = useQuery(ALL_BOOKS) //eslint-disable-line

  /*
  if (result.loading) {
    return null
  }

  const allBooks = result.data.allBooks */
  const allBooks = result.loading ? [] : result.data.allBooks

  const books = allBooks.filter(book => filterGenre === "" ? true : book.genres.includes(filterGenre))
  const duplicateGenres = allBooks.flatMap(book => book.genres)
  const genres = [...new Set(duplicateGenres)]
  console.log(genres)

  const setGenre = (genre) => {
    console.log(`setting filter to ${genre}`)
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
