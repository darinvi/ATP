import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setFiltered } from "../../../../store/reports";

// FOR NOW REMOVING THE DISABLING OF A GIVEN VARIABLE IF USED.
// HAVE TO ADD 'BETWEEN' EXCEPT FOR THE GREATER/LESSER.
// HAVE TO FIX THE BEHAVIOUR ON VARIABLE ADD. STATES GET VERY CONFUSED.
// ADD SOME VISUALIZATION ORIGINAL DATA VS FILTERED.
// ADD FILTERING BY TAG AS WELL.
export default function ApplyTradesFilters() {
    const [showFilters, setShowFilters] = useState(false);
    const [currentFilter, setCurrentFilter] = useState(null)
    const [currentDuration, setCurrentDuration] = useState('All')
    const [currentDirection, setCurrentDirection] = useState('All')
    const [filters, setFilters] = useState([]);
    const [filterKeys, setFilterKeys] = useState(['net', 'net (absolute)','gross', 'gross (absolute)','time opened', 'time closed', 'duration held', 'entry price', 'quantity'])
    const [filterValue, setFilterValue] = useState(null);
    const [valueDirection, setValueDirection] = useState(null);

    const disabledClass = "disabled:opacity-20 disabled:border-2 disabled:border-gray-900 disabled:scale-100 disabled:bg-gray-900 disabled:text-gray-300"

    const trades = useSelector(state => state.entities.reports.currentData)
    const dispatch = useDispatch();

    const renderFilterKeys = filterKeys && filterKeys.map(e => {
        return <option value={e} key={e}>
            {e}
        </option>
    })

    const renderFilters = filters && filters.map(e => {
        return <div
            className="flex gap-2 bg-cyan-300 px-2 rounded hover:bg-red-100 transform hover:scale-95 text-black text-sm"
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
                className="bg-cyan-900 hover:text-white rounded"
                onChange={e => setCurrentFilter(e.target.value)}
            >
                <option 
                    disabled={currentFilter !== ""}
                >Choose Variable</option>
                {renderFilterKeys}
            </select>
            <select
                className="bg-cyan-900 hover:text-white rounded"
                onChange={(e) => setValueDirection(e.target.value)}
            >
                <option disabled={valueDirection}> gt / ls ?</option>
                <option value="Greater">Greater</option>
                <option value="Lesser">Lesser</option>
            </select>
            <label 
                className="hover:text-white"
                htmlFor="gt-ls-criteria"
            >than</label>
            <input
                id="gt-ls-criteria"
                type="text"
                className="border border-cyan-700 rounded bg-cyan-700 hover:bg-cyan-800 focus:bg-cyan-800"
                onChange={e => setFilterValue(e.target.value)}
                value={filterValue}
            ></input>
        </div>
    }

    function selectDurationAndDirection() {
        return <div className="flex gap-12">
            <div className="flex gap-2 hover:text-white">
                <label htmlFor="select-duration">Trade Type (Intraday/Swing)</label>
                <select
                    value={currentDuration}
                    onChange={e => setCurrentDuration(e.target.value)}
                    id="select-duration"
                    className="rounded bg-cyan-900"
                >
                    <option>All</option>
                    <option>Intraday</option>
                    <option>Swing</option>
                </select>
            </div>
            <div className="flex gap-2 hover:text-white">
                <label htmlFor="select-direction">Trade Direction (Short/Long)</label>
                <select
                    value={currentDirection}
                    onChange={e => setCurrentDirection(e.target.value)}
                    id="select-direction"
                    className="rounded bg-cyan-900"
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
        // dispatch(setFiltered(applySelectedFilters(trades, filters)))
        dispatch(setFiltered(filters))
    }
    
    function inputFilterButtons() {
        return <>
            <button
                className={`hover:bg-green-200 hover:text-black border-2 border-cyan-800 px-4 rounded h-8 ${disabledClass}`}
                onClick={handleFilterAdd}
                disabled={!(currentFilter && valueDirection && filterValue)}
            >Add</button>
            <button
                className="hover:bg-yellow-200 hover:text-black px-4 rounded transform hover:scale-105 h-8 active:scale-100 border-2 border-cyan-800"
                onClick={() => setShowFilters(false)}
            >Hide</button>
            <button
                className="hover:bg-green-200 hover:text-black border-2 border-cyan-800 px-4 rounded transform hover:scale-105 h-8"
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
                    disabled={!trades}
                    className={`hover:bg-green-200 hover:text-black border-2 border-cyan-900 px-4 rounded transform hover:scale-105 ${disabledClass}`}
                    onClick={() => setShowFilters(true)}
                >Show Filters</button>
                {/* <p>Having the same filter type (e.g. absolute net) removes all tags on click.</p> */}
            </>
            :
            <div className="absolute top-0 left-1/4 flex gap-4 border-b-2 border-x-2 border-cyan-700 py-4 px-2 bg-cyan-900">
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