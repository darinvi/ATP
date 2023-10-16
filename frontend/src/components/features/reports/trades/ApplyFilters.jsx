import { useState } from "react"
import {applySelectedFilters } from "../../../../scripts/filterTrades";
import { useSelector, useDispatch } from "react-redux";
import { setFiltered } from "../../../../store/reports";

// FOR NOW REMOVING THE DISABLING OF A GIVEN VARIABLE IF USED.
// HAVE TO ADD 'BETWEEN' EXCEPT FOR THE GREATER/LESSER.
// HAVE TO FIX THE BEHAVIOUR ON VARIABLE ADD. STATES GET VERY CONFUSED.
export default function ApplyFilters() {
    const [showFilters, setShowFilters] = useState(false);
    const [currentFilter, setCurrentFilter] = useState(null)
    const [currentDuration, setCurrentDuration] = useState('All')
    const [currentDirection, setCurrentDirection] = useState('All')
    const [filters, setFilters] = useState([]);
    const [filterKeys, setFilterKeys] = useState(['net', 'net (absolute)','gross', 'gross (absolute)','time opened', 'time closed', 'duration held', 'entry price', 'quantity'])
    const [filterValue, setFilterValue] = useState(null);
    const [valueDirection, setValueDirection] = useState(null);


    const trades = useSelector(state => state.entities.reports.currentData)
    const dispatch = useDispatch();

    const renderFilterKeys = filterKeys && filterKeys.map(e => {
        return <option value={e} key={e}>
            {e}
        </option>
    })

    const renderFilters = filters && filters.map(e => {
        return <div
            className="flex gap-2 bg-cyan-300 px-2 rounded hover:bg-red-100 transform hover:scale-95"
            onClick={()=>{
                const newFilters = filters.filter(el => el[0] != e[0])
                // setFilterKeys([...filterKeys, e[0]])
                setFilters(newFilters)
            }}
        >
            <p>{e[0]}</p>
            <p>{e[1]}</p>
            <p>{e[2]}</p>
        </div>
    })

    // require filter value to be numeric
    // Only remove the variables that make no sense
    function handleFilterAdd() {
        // if (filtersNotToRepeat.contains(currentFilter)){
        //     const newKeys = filterKeys.filter(e => e != currentFilter)
        //     setFilterKeys(newKeys)
        // }
        setFilters([...filters, [currentFilter, valueDirection, filterValue]])
        setFilterValue("")
        setCurrentFilter("")
    }

    function getInputs() {
        return <div className="flex gap-4">
            <select
                className="bg-gray-100 shadow rounded transform hover:scale-105"
                onChange={e => setCurrentFilter(e.target.value)}
            >
                <option 
                    disabled={currentFilter !== ""}
                >Choose Variable</option>
                {renderFilterKeys}
            </select>
            <select
                className="bg-gray-100 shadow rounded transform hover:scale-105"
                onChange={(e) => setValueDirection(e.target.value)}
            >
                <option disabled={valueDirection}> gt / ls ?</option>
                <option value="Greater">Greater</option>
                <option value="Lesser">Lesser</option>
            </select>
            <p>than</p>
            <input
                type="text"
                className="shadow border border-gray-200 transform hover:scale-105 rounded"
                onChange={e => setFilterValue(e.target.value)}
                value={filterValue}
            ></input>
        </div>
    }

    function selectDurationAndDirection() {
        return <div className="flex gap-12">
            <div className="flex gap-2">
                <label htmlFor="select-duration">Trade Type (Intraday/Swing)</label>
                <select
                    value={currentDuration}
                    onChange={e => setCurrentDuration(e.target.value)}
                    id="select-duration"
                    className="shadow rounded bg-gray-100 transform hover:scale-105"
                >
                    <option>All</option>
                    <option>Intraday</option>
                    <option>Swing</option>
                </select>
            </div>
            <div className="flex gap-2">
                <label htmlFor="select-direction">Trade Direction (Short/Long)</label>
                <select
                    value={currentDirection}
                    onChange={e => setCurrentDirection(e.target.value)}
                    id="select-direction"
                    className="shadow rounded bg-gray-100 transform hover:scale-105"
                >
                    <option>All</option>
                    <option>Short</option>
                    <option>Long</option>
                </select>
            </div>
        </div>
    }

    // The way this works is once filtered, the original data is lost so it would require a new request to obtain it.
    function handleApplyButton() {
        dispatch(setFiltered(applySelectedFilters(trades, filters)))
    }
    
    function inputFilterButtons() {
        return <>
            <button
                className="bg-green-300 px-4 rounded transform hover:scale-105 h-8 disabled:bg-gray-100 disabled:scale-100 disabled:text-xs"
                onClick={handleFilterAdd}
                disabled={!(currentFilter && valueDirection && filterValue)}
            >Add</button>
            <button
                className="bg-yellow-200 px-4 rounded transform hover:scale-105 h-8"
                onClick={() => setShowFilters(false)}
            >Hide</button>
            <button
                className="bg-cyan-200 px-4 rounded transform hover:scale-105 h-8"
                onClick={handleApplyButton}
            >Apply</button>
        </>
    }

    function getFilterList() {
        return <div className="flex gap-2">
            <p>Filters: </p>
            {renderFilters}
        </div>
    }

    return <div>
        {!showFilters
            ?
            <>
                <button
                    className="bg-green-300 px-4 rounded transform hover:scale-105"
                    onClick={() => setShowFilters(true)}
                >Apply Filters</button>
            </>
            :
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    {getInputs()}
                    {getFilterList()}
                    {selectDurationAndDirection()}
                </div>
                {inputFilterButtons()}
            </div>
        }
    </div>

}