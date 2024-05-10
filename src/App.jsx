import { useEffect, useState } from 'react'
import axios, { all } from 'axios'
import lodash from 'lodash'

import './App.css'
import Table from './components/Table'
import SideBar from './components/Sidebar'
import PopUpWindow from './components/PopUp'
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

  let [about, setAbout] = useState(false)

  const handleAbout = () => {
    about ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden'
    setAbout(!about)
  }

  return (
    <>
      <nav className='navbar'>
        <div className="nav-item">
          <button id="about" onClick={handleAbout}>About</button>
        </div>
        <h3 className="navbar-brand">Country Search</h3>
        <form className="form-inline search-nav">
          <input className="nav-item search-bar" type="text" placeholder="search" onChange={handleSearch} />
        </form>
      </nav>
      {about && <PopUpWindow content={<About />} handleClosePopUp={handleAbout} />}
      <div className='container mx-2'>
        <div className='row'>
          <div className='col-12 col-md-2'>
            <div className='sidebar'>
              <SideBar handlers={commonQueryHandlers} searchHandler={handleSearch} />
            </div>
          </div>
          <div className='col-12 col-md-10'>
            <h2 id="table-title">Country List</h2>
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

const About = () => {
  return (
    <div className="about-content">
      <h2>About This Project</h2>
      <div className='about-text'>
        <p>Welcome to the Country Data Explorer! This project is designed to showcase the abilities of a budding web developer in utilizing modern technologies to create dynamic and responsive web applications.</p>
        <p>At the heart of this project is the integration of a REST API to fetch and display data about various countries. By leveraging the Country REST API, this application allows users to explore detailed information about different nations, enhancing their understanding of the world.</p>
        <p>Built with the React framework, the Country Data Explorer exemplifies the use of contemporary web development practices, including the use of functional components, hooks, and state management. This project not only serves as a practical application of these concepts but also as a testament to the power of integrating external APIs into a React-based architecture.</p>
        <p>For more details, dive into the code on GitHub: <a href="https://github.com/EvanJelley/country_wrapper">Country Data Explorer Repository</a></p>
      </div>
    </div>

  )
}


export default App
