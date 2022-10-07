import React from 'react';

const Persons = ({ person }) => {
  return (
    <>
      {person.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
