import { useState } from 'react';
import service from "../service/phonebook"

const AddNewPerson = ({setPersons,persons,setErrorMessage,setErrorMessageType}) => {

    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")

    const handleSubmit = (event) => {
    event.preventDefault();
    const found = persons.find(person => person.name===newName) 
    if(found){
    const newObject = {
      name: found.name,
      number: newNumber,
    }
    if(window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)){
      service.update(found.id, newObject)
    .then(returnNewPerson => {
      setPersons(persons.map(people => people.id !== found.id ? people : returnNewPerson))
      setErrorMessage(`Changed ${found.name}'s new number to ${newObject.number}`)
      setErrorMessageType("positive")
      setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
      setNewName("")
      setNewNumber("")
    })
    .catch(error => {
      console.log("error",error)
    })
    }
    }else{
    const newObject = {
      name: newName,
      number: newNumber,
    }
    service.addNewPerson(newObject)
    .then(returnNewPerson => {
      setPersons(current => [...current,returnNewPerson])
      setErrorMessage(`Added ${newObject.name}`)
      setErrorMessageType("positive")
      setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
      setNewName("")
      setNewNumber("")
    })
    .catch(error => {
      console.log("erroe",error)
      if(error.response.data.error){
        setErrorMessage(error.response.data.error)
      setErrorMessageType("negative")
      setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
      }else{
      setErrorMessage(error.response.data.message)
      setErrorMessageType("negative")
      setTimeout(() => {
          setErrorMessage(null)
      }, 5000)}
    })
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={(e)=>setNewName(e.target.value)}/>
        </div>
        <div>number: <input value={newNumber} onChange={(e)=>setNewNumber(e.target.value)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddNewPerson;