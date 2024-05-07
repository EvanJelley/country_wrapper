import lodash from 'lodash'
import { useEffect, useState } from 'react'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function popDensity (country) {
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

    return (
        <table>
            <tr>
                {headers.map(header =>
                    header != "Flag" && header != "Start of Week"
                        ? <th><button onClick={handleSort} className='headerButton'>{header}</button></th>
                        : <th>{header}</th>
                )}
            </tr>
            {sortedCountries.map(country => {
                return <CountryDataRow country={country} />
            })}
        </table>
    )
}

const CountryDataRow = ({ country }) => {
    return (
        <tr>
            <td>{country.name.common}</td>
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