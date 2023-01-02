import service from "../service/phonebook"
const Persons = ({search,filterPersons,persons,setPersons,setErrorMessage,setErrorMessageType}) => {

  const deletingPerson = async (id,name) => {
    if(window.confirm(`Delete ${name} ?`)){
    service.deletePerson(id)
    .then(response => {
      if(response.data=='deleted'){ 
        setPersons(persons.filter(people => people.id!==id))
        setErrorMessage(`${name} deleted`)
        setErrorMessageType("positive")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }).catch((error) => {
      console.log("error",error)
      setErrorMessage(`Information of ${name} has already been removed from server`)
      setErrorMessageType("negetive")
      setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
    })

    } 
  }
  return (
    <div>
      {(search!=="") ? 
      filterPersons.map((person) => {
      return (
        <div>
        <span key={person.id}>{person.name} {person.number}</span>
        <button onClick={()=>deletingPerson(person._id)}>delete</button>
        </div>
      )
    }) : 
      persons.map((person) => {
      return (
        <div key={person.id}>
        <span>{person.name} {person.number}</span>
        <button onClick={()=>deletingPerson(person.id,person.name)}>delete</button>
        </div>
      )
    })}
    </div>
  )
}

export default Persons;