import lodash from 'lodash'
import { useState } from 'react'

import PopUpWindow from './PopUp';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function popDensity(country) {
    return (country.population / country.area).toFixed(2)
}


const SORTS = {
    NONE: list => list,
    NAMEASC: list => lodash.orderBy(list, ['name.common'], ['asc']),
    NAMEDESC: list => lodash.orderBy(list, ['name.common'], ['desc']),
    CAPITALASC: list => lodash.orderBy(list, ['capital'], ['asc']),
    CAPITALDESC: list => lodash.orderBy(list, ['capital'], ['desc']),
    REGIONASC: list => lodash.orderBy(list, ['region'], ['asc']),
    REGIONDESC: list => lodash.orderBy(list, ['region'], ['desc']),
    AREAASC: list => lodash.orderBy(list, ['area'], ['asc']),
    AREADESC: list => lodash.orderBy(list, ['area'], ['desc']),
    POPULATIONASC: list => lodash.orderBy(list, ['population'], ['asc']),
    POPULATIONDESC: list => lodash.orderBy(list, ['population'], ['desc']),
    POPULATION_DENSITYASC: list => lodash.orderBy(list, [country => country.population / country.area], ['asc']),
    POPULATION_DENSITYDESC: list => lodash.orderBy(list, [country => country.population / country.area], ['desc']),
};

const Table = ({ countries, headers }) => {

    let [sortKey, setSortKey] = useState('NONE')

    const handleSort = (e) => {
        let key = sortKey == e.target.innerText.toUpperCase().replace(' ', '_') + 'ASC' ? e.target.innerText.toUpperCase().replace(' ', '_') + 'DESC' : e.target.innerText.toUpperCase().replace(' ', '_') + 'ASC'
        return setSortKey(key)
    }

    let sortedCountries = SORTS[sortKey](countries)

    let [countryToDetail, setCountryToDetail] = useState(null)

    const handelCountryDetail = (e) => {
        let country = countries.find(country => country.name.common === e.target.innerText)
        if (countryToDetail === country) {
            setCountryToDetail(null)
            document.body.style.overflow = 'auto'
        } else {
            setCountryToDetail(country)
            document.body.style.overflow = 'hidden'
        }
    }

    const handleCloseCountryDetail = () => {
        setCountryToDetail(null)
        document.body.style.overflow = 'auto'
    }

    return (
        <>
            {countryToDetail && <PopUpWindow content={<CountryDetail country={countryToDetail} />} handleClosePopUp={handleCloseCountryDetail} />}
            <table>
                <thead>
                    <tr>
                        {headers.map((header, index) =>
                            header != "Flag" && header != "Start of Week"
                                ? <th key={index}><button onClick={handleSort} className='headerButton'>{header}</button></th>
                                : <th key={index}>{header}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {sortedCountries.map((country) => {
                        return <CountryDataRow key={country.ccn3 + country.name.common} country={country} handleCountrySelect={handelCountryDetail} />
                    })}
                </tbody>
            </table>
        </>
    )
}

const CountryDetail = ({ country }) => {
    return (
        <div className='row'>
            <div className='col-12 col-md-6'>
                <div className='countryDetailContent'>
                    <h3>{country.name.common}</h3>
                    {country.capital
                        ? <p>
                            <span className="countryDetailLabel">Capital{country.capital.length > 1 ? 's' : ''}:</span> {country.capital.length < 2 ? country.capital
                                : country.capital.map((capital, index) => {
                                    if (index === country.capital.length - 1) {
                                        return capital;
                                    } else {
                                        return capital + ", ";
                                    }
                                })}
                        </p>
                        : <p><span className="countryDetailLabel">Capital:</span>None</p>
                    }
                    <p><span className="countryDetailLabel">Coordinates:</span> {Math.abs(Number(country.latlng[0]).toFixed(2))}&deg;
                        {Number(country.latlng[1]) > 0 ? 'N ' : 'S '}
                        {Math.abs(Number(country.latlng[1]).toFixed(2))}&deg;
                        {Number(country.latlng[0]) > 0 ? 'E' : 'W'}
                    </p>
                    <p><span className="countryDetailLabel">Continent{country.continents.length > 1 ? 's' : ''}:</span> {country.continents.map((continent, index) => {
                        if (index === country.continents.length - 1) {
                            return continent;
                        } else {
                            return continent + ", ";
                        }
                    })}</p>
                    {country.borders
                        ? <p><span className="countryDetailLabel">Borders:</span> {country.borders.map((border, index) => {
                            if (index === country.borders.length - 1) {
                                return border;
                            } else {
                                return border + ", ";
                            }
                        })}
                        </p>
                        : <p><span className="countryDetailLabel">Borders:</span> None</p>}
                    <p><span className="countryDetailLabel">Area:</span> {(country.area || 0).toLocaleString()} km<sup>2</sup></p>
                    {country.languages
                        ? <p><span className="countryDetailLabel">Languages:</span> {Object.values(country.languages).map((language, index) => {
                            if (index === Object.values(country.languages).length - 1) {
                                return language;
                            } else {
                                return language + ", ";
                            }
                        })}
                        </p>
                        : <p><span className="countryDetailLabel">Languages:</span> None</p>
                    }
                    <p><span className="countryDetailLabel">Population:</span> {(country.population || 0).toLocaleString()}</p>
                    <p><span className="countryDetailLabel">Population Density:</span> {popDensity(country)} people/km<sup>2</sup></p>
                    <p><span className="countryDetailLabel">Independent:</span> {country.independent ? 'Yes' : 'No'}</p>
                    <p><span className="countryDetailLabel">UN Member:</span> {country.unMember ? 'Yes' : 'No'}</p>
                    {country.currencies
                        ? <p><span className='countryDetailLabel'>{Object.values(country.currencies).length > 1 ? 'Currencies: ' : 'Currency: '}</span>
                            {Object.values(country.currencies).map((currency, index) => {
                                if (index === Object.values(country.currencies).length - 1) {
                                    return currency.name;
                                } else {
                                    return currency.name + ", ";
                                }
                            })}
                        </p>
                        : <p><span className='countryDetailLabel'>Currency:</span> None</p>}
                </div>
            </div>
            <div className='col-12 col-md-6'>
                <div className='countryDetailVisuals'>
                    <div className='flag'>
                        <p><span className="countryDetailLabel">Flag:</span></p>
                        <img className="countryDetailFlag" src={country.flags.png} alt={country.name.common} />
                    </div>
                    <div className="coatOfArms">
                        <p><span className="countryDetailLabel">Coat of Arms:</span></p>
                        <img className='countryDetailCoatOfArms' src={country.coatOfArms.png} alt={country.name.common} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const CountryDataRow = ({ country, handleCountrySelect }) => {
    return (
        <tr>
            <td><button onClick={handleCountrySelect} className='countryButton'>{country.name.common}</button></td>
            <td>{country.capital}</td>
            <td>{country.flag}</td>
            <td>{country.region}</td>
            <td>{(country.area || 0).toLocaleString()} km&sup2;</td>
            <td>{(country.population || 0).toLocaleString()}</td>
            <td>{popDensity(country)}/km&sup2;</td>
            <td>{capitalizeFirstLetter(country.startOfWeek)}</td>
        </tr>
    )
}

export default Table