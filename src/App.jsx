import { useState } from 'react'
import axios from 'axios'

import './App.css'

const URL = "https://restcountries.com/v3.1/all"

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

  return (
    <>
      <h2>Country Search</h2>
      <button onClick={fetchCountries}>Fetch Countries</button>
      <table>
        <th>Name</th>
        <th>Capital</th>
        <th>Flag</th>
        <th>Region</th>
        <th>Area</th>
        <th>Population</th>
        <th>Start of Week</th>
        {countries.map(country => {
          return (
            <tr>
              <td>{country.name.common}</td>
              <td>{country.capital}</td>
              <td>{country.flag}</td>
              <td>{country.region}</td>
              <td>{country.area}sq km</td>
              <td>{country.population}</td>
              <td>{country.startOfWeek}</td>
            </tr>
          )
        })}
      </table>
    </>
  )
}

export default App
