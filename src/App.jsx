import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'
import Table from './components/Table'

// NEXT: SEARCH COMPONENT TO FILTER COUNTRIES, THEN ORDERING TABS ON TABLE HEADERS

const URL = "https://restcountries.com/v3.1/all"

let tableHeaders = ['Name', 'Capital', 'Flag', 'Region', 'Area', 'Population', 'Start of Week']

function App() {

  let [countries, setCountries] = useState([])

  const fetchCountries = async () => {

    try {
      const response = await axios.get(URL)
      console.log(response.data)
      setCountries(response.data)
    } catch (error) {
      console.log(error)
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

  return (
    <>
      <h2>Country Search</h2>
      Search: <input type="text" placeholder="A country, capital, or region" onChange={handleSearch} />
      {countries.length === 0 && <p>Loading...</p>}
      <Table countries={countries} headers={tableHeaders} />
    </>
  )
}

export default App
