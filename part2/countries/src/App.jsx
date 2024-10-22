import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect( () => {
    countriesService
      .getAll()
      .then(returnedCountries => {
        setCountries(returnedCountries)
      })
  } ,[])

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const showCountry = (country) => {
    setFilter(country)
  }

  const showCountries = countries
    ? countries.filter( country => {
      const search = filter.toLowerCase()
      const countryName = country.name
      if (countryName.common.toLowerCase().includes(search) || countryName.official.toLowerCase().includes(search)){
        return true
      }
    })
    : countries

  return (
    <>
    <Filter valueFilter={filter} handleFilter={handleFilter}/>
    <Countries countries={showCountries} showCountry={showCountry}/>
    </>
  )
}

export default App
