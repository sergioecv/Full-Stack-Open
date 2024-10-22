import countriesService from '..services/countries'

const Countries = ( {countries, showCountry} ) => {

    const [weather, setWeather] = useState(null)
    const [wind, setWind] = useState(null)
    const [weatherIcon, setWeatherIcon] = useState(null)
    const iconUrl = 'https://openweathermap.org/img/wn/'
  
    useEffect( () => {
      if (countries.length === 1){
        const lat = countries[0].capitalInfo.latlng[0]
        const lon = countries[0].capitalInfo.latlng[1]
  
        countriesService
        .getWeather(lat,lon)
        .then(response => {
          setWeather(response.main.temp)
          setWind(response.wind.speed)
          setWeatherIcon(`${iconUrl}${response.weather[0].icon}@2x.png`)
        })
      }
    }, [countries])
  
  
    if (countries.length === 1){
      
      const country = countries[0]
      const languages = Object.values(country.languages)
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area}</p>
  
          <h3>languages:</h3>
          <ul>
            {languages.map( item => (
                <li key={item}> {item} </li>
            ))}
          </ul>
          <img src={country.flags.png} alt="flag"/>
  
          <h2> Weather in {country.name.common}</h2>
          {weather && 
            (
              <div>
                <p>temperature is {weather} Celsius </p>
                <img src={weatherIcon} alt='Weather Icon'/>
                <p>wind {wind} m/s</p>
              </div>
            )
          }
        </div>
      )
    } else if (countries.length > 10){
      return (
        <p>Too many matches, specify another filter</p>
      )
    }
  
    return (
      <>
        {countries.map( item => (
            <div key={item.name.common}>
            {item.name.common} 
            <button onClick={() => showCountry(item.name.common)}> show </button>
            </div>
        ))}
      </>
    )
  }

  export default Countries