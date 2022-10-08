import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
};

const checkExistName = (name, arr) => {
  if (arr.length === 0) return false;
  const res = arr.find((ele) => ele.name.toLowerCase() === name.toLowerCase());
  // console.log(res);
  if (res === undefined) {
    return false;
  }
  return true;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkExistName(newName, persons)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      id: guid(),
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPerson));
  };

  const personRender =
    filter.length !== 0
      ? persons.filter((ele) =>
          ele.name.toLowerCase().includes(filter.trim().toLowerCase())
        )
      : persons;

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/persons').then((res) => {
      console.log('promise fulfilled');
      setPersons(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons person={personRender} />
    </div>
  );
};

export default App;
