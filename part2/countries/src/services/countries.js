import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const weatherIconUrl = 'https://openweathermap.org/img/wn/'

const weather_key = import.meta.env.VITE_WEATHER_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getInfo = (country) => {
    const request = axios.get(`${baseUrl}/name/${country}`)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const request = axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric `)
    return request.then(response => response.data)
}

const getWeatherIcon = (icon) => {
    const request = axios.get(`${weatherIconUrl}${icon}@2x.png `)
    return request.then(response => response.data)
}

export default { getAll, getInfo, getWeather, getWeatherIcon }

