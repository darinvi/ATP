import { useState } from "react"

export default function ApplyFilters() {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({});
    const [currentFilter, setCurrentFilter] = useState(null)

    const filter_keys = ['net', 'gross', 'time opened', 'time closed', 'duration held', 'entry price', 'quantity']
    const render_filter_keys = filter_keys.map(e => {
        return <option value={e}>
            {e}
        </option>
    })

    function handleFilterAdd(e) {
        return
    }

    function handleFilterSelect(e) {
        setCurrentFilter(e.target.value)
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
                <div>

                    <div className="flex gap-4">
                        <select
                            className="bg-gray-100 shadow rounded transform hover:scale-105"
                            onChange={handleFilterSelect}
                        >
                            {render_filter_keys}
                        </select>
                        <select
                            className="bg-gray-100 shadow rounded transform hover:scale-105"
                        >
                            <option>Greater</option>
                            <option>Lesser</option>
                        </select>
                        <p>than</p>
                        <input
                            type="text"
                            className="shadow border border-gray-200 transform hover:scale-105 rounded"
                        ></input>

                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <label htmlFor="intraday">intraday</label>
                            <input type="checkbox" id="intraday"></input>
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="swing">swing</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="flex items-center gap-2 ml-12">
                            <label htmlFor="short">short</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="long">long</label>
                            <input type="checkbox"></input>
                        </div>
                    </div>
                </div>
                <button
                    className="bg-green-300 px-4 rounded transform hover:scale-105"
                    onClick={handleFilterAdd}
                >Add</button>
                <button
                    className="bg-yellow-200 px-4 rounded transform hover:scale-105"
                    onClick={() => setShowFilters(false)}
                >Hide</button>
            </div>
        }
    </div>

}