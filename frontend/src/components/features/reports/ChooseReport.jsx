import GetReportsForm from "./GetReportsForm"
import ApplyTotalsFilters from "./filters/ApplyTotalsFilters";
import ApplyTradesFilters from "./filters/ApplyTradesFilters"
import { useSelector } from "react-redux"

export default function ChooseReport({showForm, setShowForm}) {
    
    const tradeType = useSelector(state => state.entities.reports.type);

    const mapFilters = {
        'Trades': <ApplyTradesFilters />,
        'Totals': <ApplyTotalsFilters />,
    }

    return (
        <div className="relative pt-1 flex flex-col items-center w-1/2 h-fit">
            <div className="mx-auto flex gap-2">
                <button
                    onClick={() => setShowForm(true)}
                    className="hover:bg-green-200 hover:text-black h-fit max-h-[10vh] rounded transform hover:scale-105 border-2 border-cyan-900 px-2"
                >
                    Change Report Criteria
                </button>
                {tradeType && mapFilters[tradeType]}
            </div>

            {showForm && <GetReportsForm setShowForm={setShowForm} />}

        </div>
    )
}