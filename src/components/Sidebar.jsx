const SideBar = ({ handlers, searchHandler }) => {
    return (
        <>
            <div className="sidebar-selection-bay row">
                <h3>Popular Searches</h3>
            </div>
            <div className="sidebar-selection-bay row">
                <h4>Regions</h4>
                <button onClick={handlers.all} className="sidebar-button">All Countries</button>
                <button onClick={handlers.europe} className="sidebar-button">Europe</button>
                <button onClick={handlers.asia} className="sidebar-button">Asia</button>
                <button onClick={handlers.africa} className="sidebar-button">Africa</button>
                <button onClick={handlers.americas} className="sidebar-button">Americas</button>
                <button onClick={handlers.oceania} className="sidebar-button">Oceania</button>
                <button onClick={handlers.antarctic} className="sidebar-button">Antarctic</button>
            </div>
            <div className="sidebar-selection-bay row">
                <h4>Area</h4>
                <button onClick={handlers.tenLargestArea} className="sidebar-button">10 Largest Areas</button>
                <button onClick={handlers.twentyFiveLargestArea} className="sidebar-button">25 Largest Areas</button>
                <button onClick={handlers.fiftyLargestArea} className="sidebar-button">50 Largest Areas</button>
                <button onClick={handlers.tenSmallestArea} className="sidebar-button">10 Smallest Areas</button>
                <button onClick={handlers.twentyFiveSmallestArea} className="sidebar-button">25 Smallest Areas</button>
                <button onClick={handlers.fiftySmallestArea} className="sidebar-button">50 Smallest Areas</button>
            </div>
            <div className="sidebar-selection-bay row">
                <h4>Population</h4>
                <button onClick={handlers.tenLargestPop} className="sidebar-button">10 Largest Populations</button>
                <button onClick={handlers.twentyFiveLargestPop} className="sidebar-button">25 Largest Populations</button>
                <button onClick={handlers.fiftyLargestPop} className="sidebar-button">50 Largest Populations</button>
                <button onClick={handlers.tenSmallestPop} className="sidebar-button">10 Smallest Populations</button>
                <button onClick={handlers.twentyFiveSmallestPop} className="sidebar-button">25 Smallest Populations</button>
                <button onClick={handlers.fiftySmallestPop} className="sidebar-button">50 Smallest Populations</button>
            </div>
            <div className="sidebar-selection-bay row">
                <h4>Population Density</h4>
                <button onClick={handlers.tenHighestPopDensity} className="sidebar-button">10 Highest Populations</button>
                <button onClick={handlers.twentyFiveHighestPopDensity} className="sidebar-button">25 Highest Populations</button>
                <button onClick={handlers.fiftyHighestPopDensity} className="sidebar-button">50 Highest Populations</button>
                <button onClick={handlers.tenLowestPopDensity} className="sidebar-button">10 Lowest Populations</button>
                <button onClick={handlers.twentyFiveLowestPopDensity} className="sidebar-button">25 Lowest Populations</button>
                <button onClick={handlers.fiftyLowestPopDensity} className="sidebar-button">50 Lowest Populations</button>
            </div>
            <div className="sidebar-selection-bay row">
                <h4>Start of the Week</h4>
                <button onClick={handlers.saturday} className="sidebar-button">Saturday</button>
                <button onClick={handlers.sunday} className="sidebar-button">Sunday</button>
                <button onClick={handlers.monday} className="sidebar-button">Monday</button>
            </div>
        </>
    )
}

export default SideBar