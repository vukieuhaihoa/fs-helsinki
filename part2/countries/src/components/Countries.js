import React from 'react';

const Countries = ({ result, handleShow }) => {
  return (
    <div>
      {result.length < 10 ? (
        result.map((cou) => (
          <p key={cou.name.common}>
            {cou.name.common}{' '}
            <button onClick={() => handleShow(cou)}>show</button>
          </p>
        ))
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default Countries;
