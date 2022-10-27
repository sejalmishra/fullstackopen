import { useState } from 'react';

const AddNewFilter = ({setPersons,persons}) => {

    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")

    const handleSubmit = (event) => {
    event.preventDefault();
    const found = persons.find(person => person.name===newName) 
    if(found){
    alert(`${newName} is already added to phonebook`)
    }else{
      const newObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    setPersons(current => [...current,newObject])
    }
    setNewName("")
    setNewNumber("")
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

export default AddNewFilter;