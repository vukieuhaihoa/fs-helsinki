import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const { capital } = props;

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const unit = 'm';
    console.log({ api_key });
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}&units=${unit}`
      )
      .then((res) => {
        // console.log(res.data);
        setWeatherData(res.data);
      });
  }, [capital]);

  return (
    <>
      {weatherData && (
        <div>
          <h2>Weather in {capital}</h2>
          <p>temperature {weatherData.current.temperature} Celsius</p>
          <img src={weatherData.current.weather_icons[0]} alt='' />
          <p>wind {weatherData.current.wind_speed} km/s</p>
        </div>
      )}
    </>
  );
};

export default Weather;
