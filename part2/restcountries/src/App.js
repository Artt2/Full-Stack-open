import {useState, useEffect } from 'react'
import countriesService from './services/countries'
import Search from './components/Search'
import ListCountries from './components/ListCountries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  // have a state for a singular country, NULL as initial value (then if (null))
  const [singleCountry, setSingleCountry] = useState(null)

  const [newSearch, setNewSearch] = useState("")

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
        setFiltered(initialCountries)
      })
  }, [])

  /*
    changing newSearch calls this effect
    this is because handleSearchChange does not get called
    when setNewSearch is set to only one countrys name
  */
 
  useEffect(() => { 
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(newSearch.toLowerCase())
    );
    setFiltered(filtered);
    setSingleCountry(filtered.length === 1 ? filtered[0] : null);
  }, [newSearch]);
  
  const handleSearchChange = (event) => {
    const temp = event.target.value
    setNewSearch(event.target.value) //update input field
    console.log("input changed")
    //update the filtered countries
    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(temp.toLowerCase())
      )

    setFiltered(filtered)

    if (filtered.length === 1) {
      setSingleCountry(filtered[0])
    } else {
      setSingleCountry(null)
    }

  }

  const handleShow = (country) => {
    setSingleCountry(country)
    setNewSearch(country.name.common) //this does not trigger handleSearchChange
  }

  let content
  if (filtered.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else if (filtered.length > 1 && filtered.length <= 10) {
    content = <ListCountries filtered={filtered} handleShow={handleShow}/>
  } else if (filtered.length === 1) {
    content = <Country country={singleCountry} />
  }

  return (
    <>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      {content}
    </>
  )
}

export default App;
