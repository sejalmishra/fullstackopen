import { useState } from 'react';
import Filter from "./components/filter";
import AddNewFilter from './components/addNewPeople';
import Persons from './components/persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [filterPersons,setFilterPersons] = useState([])
  const [search, setSearch] = useState("")
  

  const handleFilter = (event) => {
    setSearch(event.target.value)
    const result = persons.filter((person) => person.name.toLowerCase().includes(search))
    setFilterPersons(result)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleFilter={handleFilter}/>
      <AddNewFilter setPersons={setPersons} persons={persons}/>
      <h2>Numbers</h2>
      <Persons search={search} filterPersons={filterPersons} persons={persons}/>
    </div>
  )
}

export default App