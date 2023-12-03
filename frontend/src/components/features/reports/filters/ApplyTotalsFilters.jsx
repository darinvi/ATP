import { useState } from "react"

export default function ApplyTotalsFilters() {

    const [showFilters, setShowFilters] = useState(false);

    const disabledClass = "disabled:opacity-20 disabled:border-2 disabled:border-gray-900 disabled:scale-100 disabled:bg-gray-900 disabled:text-gray-300"
    const buttonClass = "w-fit px-2 border-2 border-cyan-800 rounded hover:text-black transform active:scale-95"

    function getButtons(){        
        return (
            <div className="flex gap-4">
                <button
                    className={`${buttonClass} ${disabledClass} hover:bg-green-200`}
                >Apply</button>
                <button
                    className={`${buttonClass} ${disabledClass} hover:bg-red-200`}
                    onClick={()=> setShowFilters(false)}
                >Close</button>
            </div>
        )
    }

    function getCriteriaSelect(){
        return (
            <div 
                className="flex gap-6"
            >
                <div 
                    className="flex gap-2 hover:text-white"
                >
                    <label
                        htmlFor="criteria-select-totals-profit-and-loss"
                    >Criteria:</label>
                    <select
                        id="criteria-select-totals-profit-and-loss"
                        className="w-fit bg-cyan-900"
                    > 
                        <option>net</option>
                        <option>total</option>
                        <option>realized</option>
                        <option>unrealized</option>
                        <option>total qty</option>
                        <option>commissions</option>
                        <option>ecn fees</option>
                        <option>reg. fees</option>
                        <option>trades</option>
                    </select>
                </div>
                <div
                    className="flex gap-2 hover:text-white"
                >
                    <label
                        htmlFor="criteria-select-totals-profit-and-loss"
                    >Criteria:</label>
                    <select
                        id="criteria-select-totals-profit-and-loss"
                        className="w-fit bg-cyan-900"
                    > 
                        <option>Above</option>
                        <option>Below</option>
                    </select>
                </div>
                <input
                    type="number"
                    className="rounded bg-cyan-700 active:bg-cyan-800 hover:bg-cyan-800"
                />
                <button
                    className={`${buttonClass} ${disabledClass} hover:bg-green-200`}
                >
                    Add
                </button>
            </div>
        )
    }

    function getFilters(){
        return (
            <div
                className="absolute z-20 w-full bg-cyan-900 border-x-2 border-b-2 border-cyan-700 rounded-b p-4 left-0 top-0 flex flex-col gap-2"
            >
                {getCriteriaSelect()}
                {getButtons()}
            </div>
        )
    }

    return <div>
        {!showFilters
            ?
            <>
                <button
                    // disabled={!trades}
                    className={`hover:bg-green-200 hover:text-black border-2 border-cyan-900 px-4 rounded transform hover:scale-105 ${disabledClass}`}
                    onClick={() => setShowFilters(true)}
                >Show Filters</button>
            </>
            :
            <>
                {getFilters()}
            </>
        }
    </div>

}