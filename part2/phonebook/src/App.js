import { useState, useEffect } from 'react';
import Filter from "./components/filter";
import AddNewPerson from './components/addNewPeople';
import Persons from './components/persons';
import service from './service/phonebook'
import Notification from './components/notification';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterPersons,setFilterPersons] = useState([])
  const [search, setSearch] = useState("")
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageType,setErrorMessageType] = useState("");
  

  const handleFilter = (event) => {
    setSearch(event.target.value)
    const result = persons.filter((person) => person.name.toLowerCase().includes(search))
    setFilterPersons(result)
  }

  useEffect(() => {
    service.getAll()
    .then(result => setPersons(result))
    .catch(error => {
      console.log("error",error)
    })
  },[])


  return (
    <div>
      <Notification message={errorMessage} errorMessageType={errorMessageType}/>
      <h2>Phonebook</h2>
      <Filter search={search} handleFilter={handleFilter}/>
      <AddNewPerson setPersons={setPersons} persons={persons} setErrorMessage={setErrorMessage} setErrorMessageType={setErrorMessageType}/>
      <h2>Numbers</h2>
      <Persons search={search} filterPersons={filterPersons} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} setErrorMessageType={setErrorMessageType}/>
    </div>
  )
}

export default App