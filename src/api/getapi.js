const key = process.env.REACT_APP_WEATHER_KEY
export const getCity = async (cityName) => {
  const cityUrl = process.env.REACT_APP_CITY_URL
  const query = `?apikey=${key}&q=${cityName}`

  const respons = await fetch(cityUrl + query)
  const data = await respons.json()
  return data[0]
}
export const getWeathr = async (id) => {
  const weatherUrl = process.env.REACT_APP_CURRENT_CONDITION
  const query = `${id}?apikey=${key}`
  const respons = await fetch(weatherUrl + query)
  const data = await respons.json()
  return data[0]
}
