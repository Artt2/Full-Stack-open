const Person = ({person, handleRemove}) => {
  return (
    <>
    <tr>
      <td>
        {person.name} {person.number}
      </td>
      <td>
        <button onClick={() => handleRemove(person.id)}>delete</button>
      </td>
    </tr>
    </>
  )
}

const Persons = ({persons, handleRemove}) => {

  return (
    <>
      <table>
        <tbody>
          {persons.map(person =>
            <Person key={person.name} person={person} handleRemove={handleRemove}/>
            )}
        </tbody>
      </table>
    </>
  )
}

export default Persons