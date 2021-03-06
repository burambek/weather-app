import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&&lang=lang&appid=b9fa6f383ed758ddae81299e44b04d72`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
      });

      setLocation('');
    }
  };
  return (
    <div className='App'>
      <div className='search'>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Місто'
          type='text'
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp}℃</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p> {data.main.feels_like}℃</p> : null}
              <p>Відчувається як</p>
            </div>
            <div className='humitidy'>
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Вологість</p>
            </div>
            <div className='wind'>
              {data.wind ? <p>{data.wind.speed} км/г</p> : null}
              <p>Швидкість вітру</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
