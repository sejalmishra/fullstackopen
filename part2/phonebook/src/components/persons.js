const Persons = ({search,filterPersons,persons}) => {

  return (
    <div>
      {(search!=="") ? 
      filterPersons.map((person) => {
      return (
        <p key={person.id}>{person.name} {person.number}</p>
      )
    }) : 
      persons.map((person) => {
      return (
        <p key={person.id}>{person.name} {person.number}</p>
      )
    })}
    </div>
  )
}

export default Persons;