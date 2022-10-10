import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';

const checkExistName = (name, arr) => {
  if (arr.length === 0) return false;
  const res = arr.find((ele) => ele.name.toLowerCase() === name.toLowerCase());
  // console.log(res);
  if (res === undefined) {
    return null;
  }
  return res;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkPersonExist = checkExistName(newName, persons);
    if (checkPersonExist) {
      const ok = window.confirm(
        `${newName} was already added to phonebook, replace the old number with a new one ?`
      );
      if (ok) {
        const newPersonUpdate = {
          ...checkPersonExist,
          number: newNumber,
        };
        personsService
          .updateById(checkPersonExist.id, newPersonUpdate)
          .then((data) => {
            setPersons(
              persons.map((per) =>
                per.id !== newPersonUpdate.id ? per : newPersonUpdate
              )
            );

            setSuccessMessage('Updated ' + newPersonUpdate.name);
            setTimeout(() => setSuccessMessage(null), 3000);
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data) {
              setErrorMessage(err.response.data.error);
              setTimeout(() => setErrorMessage(null), 3000);
              return;
            }
            setErrorMessage(
              `Information of ${newPersonUpdate.name} has already been removed from server`
            );
            setTimeout(() => setErrorMessage(null), 3000);
            return;
          });
      }
      setNewName('');
      setNewNumber('');
      return;
    }
    const newPerson = {
      // id: guid(),
      name: newName,
      number: newNumber,
    };

    personsService
      .addNew(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));

        setSuccessMessage('Added ' + newPerson.name);
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch((err) => {
        if (err.response.data) {
          setErrorMessage(err.response.data.error);
          setTimeout(() => setErrorMessage(null), 3000);
          return;
        }
        setErrorMessage(`Error when add new person on db`);
        setTimeout(() => setErrorMessage(null), 3000);
      });

    setNewName('');
    setNewNumber('');
  };

  const handleDeletePerson = (person) => {
    const ok = window.confirm(`Delete ${person.name} ?`);
    if (ok) {
      personsService
        .deleteById(person.id)
        .then((data) => {
          // console.log(data);
          setPersons(persons.filter((per) => per.id !== person.id));

          setSuccessMessage('Deleted ' + person.name);
          setTimeout(() => setSuccessMessage(null), 3000);
        })
        .catch((err) => {
          if (err.response.data) {
            setErrorMessage(err.response.data.error);
            setTimeout(() => setErrorMessage(null), 3000);
            return;
          }
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setTimeout(() => setErrorMessage(null), 3000);
          return;
        });
    }
    return;
  };

  const personRender =
    filter.length !== 0
      ? persons.filter((ele) =>
          ele.name.toLowerCase().includes(filter.trim().toLowerCase())
        )
      : persons;

  useEffect(() => {
    console.log('effect');
    personsService
      .getAll()
      .then((data) => setPersons(data))
      .catch((err) => alert('Error when get data from server.'));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
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
      <Persons persons={personRender} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
