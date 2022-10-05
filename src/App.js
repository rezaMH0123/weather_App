import React, { useEffect, useState } from 'react'
import { getCity, getWeathr } from './api/getapi'
import day from './assets/img/day.svg'
import night from './assets/img/night.svg'
function App() {
  const [inputValue, setInputValue] = useState()
  const [cityWeather, setCityWeather] = useState()
  const [weatherBgSrc, setWeatherBgSrc] = useState()
  const submitHandler = async (e) => {
    e.preventDefault()
    if (inputValue) {
      setCityWeather(await getSingleCity())
    } else {
      console.log('Please fill in the blank')
    }
  }
  const getSingleCity = async () => {
    const cityDetail = await getCity(inputValue)
    const weather = await getWeathr(cityDetail.Key)
    return {
      cityDetail,
      weather,
    }
  }
  useEffect(() => {
    if (cityWeather) {
      if (cityWeather.weather.IsDayTime) {
        setWeatherBgSrc(day)
      } else {
        setWeatherBgSrc(night)
      }
    }
  }, [cityWeather])
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 shadow-xl rounded-md w-[500px] h-[800px]">
        <div className="p-4">
          <h1 className="text-5xl text-center text-blue-400 font-sans">
            AccuWeather
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col items-center">
            <label className="mb-3" htmlFor="city">
              Enter a location for weather information
            </label>
            <input
              className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="city"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </div>
        <div className={`${cityWeather ? 'h-[77%] ' : 'hidden'}`}>
          <div className="w-full h-[75%] mb-8 relative">
            <img className="w-[100%] h-full" src={weatherBgSrc} alt="weather" />
            <div className="absolute left-[50%] -translate-x-2/4 translate-y-8 rounded-full bottom-1 bg-white">
              <img
                src={require(`./assets/img/icons/${cityWeather.weather.WeatherIcon}.svg`)}
                alt="icon"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-bold text-slate-700 mb-4">
              {cityWeather ? (
                cityWeather.cityDetail.EnglishName
              ) : (
                <span>city name</span>
              )}
            </h4>
            <div className="text-md mb-3">
              {cityWeather ? (
                cityWeather.weather.WeatherText
              ) : (
                <span>weather condition</span>
              )}
            </div>
            <div className="flex text-5xl">
              <span>
                {cityWeather ? (
                  cityWeather.weather.Temperature.Metric.Value
                ) : (
                  <span>Temperature</span>
                )}
              </span>
              <span>&deg;C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
