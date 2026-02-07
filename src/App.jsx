import React, { useState } from 'react'
import './App.css'

const API_KEY = '32b82ebaa0d07354783169d2b478ce55'

export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const getWeather = async () => {
    if (!city) {
      setError('Please enter a city name')
      return
    }

    try {
      setError('')
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )

      if (!response.ok) {
        throw new Error('City not found')
      }

      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setError(err.message)
      setWeather(null)
    }
  }

  return (
    <div className="app">
      <h1>Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Mokshagna Chowdhary. All rights reserved.</p>
      </footer>
    </div>
  )
}