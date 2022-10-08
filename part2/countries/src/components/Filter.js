import React from 'react';

const Filter = ({ filter, handleOnChange }) => {
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          find countries <input value={filter} onChange={handleOnChange} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
