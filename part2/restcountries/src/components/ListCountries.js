const Line = ({country, handleShow}) => {
  return (
    <tr>
      <td>
        {country.name.common}
      </td>
      <td>
        <button onClick={() => handleShow(country)}>show</button>
      </td>
    </tr>
  )
}

const ListCountries = ({filtered, handleShow}) => {

  return (
    <table>
      <tbody>
        {filtered.map(country => 
          <Line key={country.name.official} country={country} handleShow={handleShow}/>
          )}
      </tbody>
    </table>
  )
}

export default ListCountries