const Person = ({person}) => {
  return (
    <>
    <tr>
      <td>{person.name} {person.number}</td>
    </tr>
    </>
  )
}

const Persons = ({persons}) => {

  return (
    <>
      <table>
        <tbody>
          {persons.map(person =>
            <Person key={person.name} person={person}/>
            )}
        </tbody>
      </table>
    </>
  )
}

export default Persons