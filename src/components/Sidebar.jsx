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

export default SideBar