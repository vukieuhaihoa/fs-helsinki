import React from 'react';
import Weather from './Weather';

const Country = ({ cou }) => {
  // console.log(cou);
  return (
    <>
      <h1>{cou.name.common}</h1>
      {cou.capital.map((cap) => (
        <p key={cap}>capital {cap}</p>
      ))}
      <p>area {cou.area}</p>
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {Object.keys(cou.languages).map((key) => {
          return <li key={key}>{cou.languages[key]}</li>;
        })}
      </ul>
      <img src={cou.flags.png} alt={'flag'} />
      <div>
        <Weather capital={cou.capital} />
      </div>
    </>
  );
};

export default Country;
