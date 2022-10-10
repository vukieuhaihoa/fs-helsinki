import React from 'react';
import './noti.css';

const Notification = ({ errorMessage, successMessage }) => {
  return (
    <>
      {errorMessage && <div className={'error'}>{errorMessage}</div>}
      {successMessage && <div className={'success'}>{successMessage}</div>}
    </>
  );
};

export default Notification;
