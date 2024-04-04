import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = 'd541f00180964fbe855144539243101';

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <h2 >{weatherData.location.name}</h2>
          <p className="weather-card">Temperature: {weatherData.current.temp_c}°C</p>
          <p className="weather-card">Humidity: {weatherData.current.humidity}%</p>
          <p className="weather-card">Condition: {weatherData.current.condition.text}</p>
          <p className="weather-card">Wind Speed: {weatherData.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
}

export default App;

