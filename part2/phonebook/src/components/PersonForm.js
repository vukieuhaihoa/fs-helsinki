import React from 'react';

const PersonForm = (props) => {
  const { newName, setNewName, newNumber, setNewNumber, handleSubmit } = props;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
