const Search = ({newSearch, handleSearchChange}) => {


  return(
    <>
      <form>
        find countries<input value={newSearch} onChange={handleSearchChange}/>
      </form>
    </>
  )
}

export default Search