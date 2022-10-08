import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';
import Country from './components/Country';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleOnChange = (e) => {
    setFilter(e.target.value);
    setSelectedCountry(null);
  };

  const handleShow = (cou) => setSelectedCountry(cou);

  const handleRenderResult = () => {
    if (!filter) {
      return null;
    }

    const result = countries.filter((cou) =>
      cou.name.common.toLowerCase().includes(filter.trim().toLowerCase())
    );

    if (selectedCountry) {
      return <Country cou={selectedCountry} />;
    }

    if (result.length === 1) {
      const cou = result[0];
      return <Country cou={cou} />;
    }

    return <Countries result={result} handleShow={handleShow} />;
  };

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      // console.log('get data success');
      setCountries(res.data);
    });
  }, []);

  return (
    <>
      <Filter filter={filter} handleOnChange={handleOnChange} />
      <>{handleRenderResult()}</>
    </>
  );
};

export default App;
