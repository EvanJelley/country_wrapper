import { useEffect, useState } from 'react'
import axios, { all } from 'axios'
import lodash from 'lodash'

import './App.css'
import Table from './components/Table'
import { set } from 'lodash'

// NEXT: SEARCH COMPONENT TO FILTER COUNTRIES, THEN ORDERING TABS ON TABLE HEADERS

const URL = "https://restcountries.com/v3.1/all"

let tableHeaders = ['Name', 'Capital', 'Flag', 'Region', 'Area', 'Population', 'Population Density', 'Start of Week']

function App() {

  let [countriesList, getCountries] = useState([])

  let [countries, setCountries] = useState([])

  const fetchCountries = async () => {

    try {
      const response = await axios.get(URL)
      getCountries(response.data)
      setCountries(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  let [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  if (searchTerm.length > 0) {
    countries = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      typeof country.capital === 'object' && country.capital[0].toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const commonQueryHandlers = {
    all: () => {
      setCountries(countriesList)
    },
    europe: () => {
      setCountries(countriesList.filter(country => country.region === 'Europe'))
    },
    asia: () => {
      setCountries(countriesList.filter(country => country.region === 'Asia'))
    },
    africa: () => {
      setCountries(countriesList.filter(country => country.region === 'Africa'))
    },
    americas: () => {
      setCountries(countriesList.filter(country => country.region === 'Americas'))
    },
    oceania: () => {
      setCountries(countriesList.filter(country => country.region === 'Oceania'))
    },
    antarctic: () => {
      setCountries(countriesList.filter(country => country.region === 'Antarctic'))
    },
    monday: () => {
      setCountries(countriesList.filter(country => country.startOfWeek === 'monday'))
    },
    sunday: () => {
      setCountries(countriesList.filter(country => country.startOfWeek === 'sunday'))
    },
    saturday: () => {
      setCountries(countriesList.filter(country => country.startOfWeek === 'saturday'))
    },
    tenLargestArea: () => { 
      setCountries(lodash.orderBy(countriesList, ['area'], ['desc']).slice(0, 10))
    },
    twentyFiveLargestArea: () => {
      setCountries(lodash.orderBy(countriesList, ['area'], ['desc']).slice(0, 25))
    },
    fiftyLargestArea: () => {
      setCountries(lodash.orderBy(countriesList, ['area'], ['desc']).slice(0, 50))
    },
    tenSmallestArea: () => {
      setCountries(lodash.orderBy(countriesList, ['area'], ['asc']).slice(0, 10))
    },
    twentyFiveSmallestArea: () => {
      setCountries(lodash.orderBy(countriesList, ['area'], ['asc']).slice(0, 25))
    },
    fiftySmallestArea: () => {
      setCountries(lodash.orderBy(countriesList, ['area'], ['asc']).slice(0, 50))
    },
    tenLargestPop: () => {
      setCountries(lodash.orderBy(countriesList, ['population'], ['desc']).slice(0, 10))
    },
    twentyFiveLargestPop: () => {
      setCountries(lodash.orderBy(countriesList, ['population'], ['desc']).slice(0, 25))
    },
    fiftyLargestPop: () => {
      setCountries(lodash.orderBy(countriesList, ['population'], ['desc']).slice(0, 50))
    },
    tenSmallestPop: () => {
      setCountries(lodash.orderBy(countriesList, ['population'], ['asc']).slice(0, 10))
    },
    twentyFiveSmallestPop: () => {
      setCountries(lodash.orderBy(countriesList, ['population'], ['asc']).slice(0, 25))
    },
    fiftySmallestPop: () => {
      setCountries(lodash.orderBy(countriesList, ['population'], ['asc']).slice(0, 50))
    },
    tenHighestPopDensity: () => {
      setCountries(lodash.orderBy(countriesList, [country => country.population / country.area], ['desc']).slice(0, 10))
    },
    twentyFiveHighestPopDensity: () => {
      setCountries(lodash.orderBy(countriesList, [country => country.population / country.area], ['desc']).slice(0, 25))
    },
    fiftyHighestPopDensity: () => {
      setCountries(lodash.orderBy(countriesList, [country => country.population / country.area], ['desc']).slice(0, 50))
    },
    tenLowestPopDensity: () => {
      setCountries(lodash.orderBy(countriesList, [country => country.population / country.area], ['asc']).slice(0, 10))
    },
    twentyFiveLowestPopDensity: () => {
      setCountries(lodash.orderBy(countriesList, [country => country.population / country.area], ['asc']).slice(0, 25))
    },
    fiftyLowestPopDensity: () => {
      setCountries(lodash.orderBy(countriesList, [country => country.population / country.area], ['asc']).slice(0, 50))
    },
  }

  return (
    <>
      <div className='nav'>
        <h3>Country Search</h3>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-2'>
            <div className='sidebar'>
              <SideBar handlers={commonQueryHandlers} searchHandler={handleSearch} />
            </div>
          </div>
          <div className='col-12 col-md-10'>
            <h2>Countries</h2>
            {countries.length === 0 && searchTerm.length == 0 && <p>Loading...</p>}
            <div className='table-responsive'>
              <Table countries={countries} headers={tableHeaders} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const SideBar = ({ handlers, searchHandler }) => {
  return (
    <div>
      Search: <input type="text" placeholder="A country, capital, or region" onChange={searchHandler} />
      <br />
      <h3>Common Queries</h3>
      <button onClick={handlers.all}>All Countries</button>
      <h4>Regions</h4>
      <button onClick={handlers.europe}>Europe</button>
      <button onClick={handlers.asia}>Asia</button>
      <button onClick={handlers.africa}>Africa</button>
      <button onClick={handlers.americas}>Americas</button>
      <button onClick={handlers.oceania}>Oceania</button>
      <button onClick={handlers.antarctic}>Antarctic</button>
      <h4>Area</h4>
      <button onClick={handlers.tenLargestArea}>10 Largest Areas</button>
      <button onClick={handlers.twentyFiveLargestArea}>25 Largest Areas</button>
      <button onClick={handlers.fiftyLargestArea}>50 Largest Areas</button>
      <button onClick={handlers.tenSmallestArea}>10 Smallest Areas</button>
      <button onClick={handlers.twentyFiveSmallestArea}>25 Smallest Areas</button>
      <button onClick={handlers.fiftySmallestArea}>50 Smallest Areas</button>
      <h4>Population</h4>
      <button onClick={handlers.tenLargestPop}>10 Largest Populations</button>
      <button onClick={handlers.twentyFiveLargestPop}>25 Largest Populations</button>
      <button onClick={handlers.fiftyLargestPop}>50 Largest Populations</button>
      <button onClick={handlers.tenSmallestPop}>10 Smallest Populations</button>
      <button onClick={handlers.twentyFiveSmallestPop}>25 Smallest Populations</button>
      <button onClick={handlers.fiftySmallestPop}>50 Smallest Populations</button>
      <h4>Population Density</h4>
      <button onClick={handlers.tenHighestPopDensity}>10 Highest Populations</button>
      <button onClick={handlers.twentyFiveHighestPopDensity}>25 Highest Populations</button>
      <button onClick={handlers.fiftyHighestPopDensity}>50 Highest Populations</button>
      <button onClick={handlers.tenLowestPopDensity}>10 Lowest Populations</button>
      <button onClick={handlers.twentyFiveLowestPopDensity}>25 Lowest Populations</button>
      <button onClick={handlers.fiftyLowestPopDensity}>50 Lowest Populations</button>
      <h4>Start of the Week</h4>
      <button onClick={handlers.saturday}>Saturday</button>
      <button onClick={handlers.sunday}>Sunday</button>
      <button onClick={handlers.monday}>Monday</button>
    </div>
  )
}

export default App
