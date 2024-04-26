const Table = ({ countries, headers }) => {
    return (
        <table>
            <tr>
                {headers.map(header => <th>{header}</th>)}
            </tr>
            {countries.map(country => {
                return <Country country={country} />
            })}
        </table>
    )
}

const Country = ({ country }) => {
    return (
        <tr>
            <td>{country.name.common}</td>
            <td>{country.capital}</td>
            <td>{country.flag}</td>
            <td>{country.region}</td>
            <td>{(country.area || 0).toLocaleString()} sq km</td>
            <td>{(country.population || 0).toLocaleString()}</td>
            <td>{country.startOfWeek}</td>
        </tr>
    )
}

export default Table