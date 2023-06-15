const Country = ({country}) => {
  const languages = Object.entries(country.languages)

  return (
    <>
      <h1>{country.name.common}</h1>  
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <br/>
      <b>languages</b>
      <ul>
        {languages.map(([code, language]) => 
          <li key={code}>{language}</li>
          )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </>
  )

}

export default Country