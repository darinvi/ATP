import GetReportsForm from "./GetReportsForm"
import ApplyTradesFilters from "./trades/ApplyTradesFilters"

export default function ChooseReport({showForm, setShowForm}) {
    
    return (
        <div className="mt-1 flex flex-col items-center w-full h-fit">
            <div className="mx-auto flex gap-2">
                <button
                    onClick={() => setShowForm(true)}
                    className="hover:bg-green-200 hover:text-black h-fit max-h-[10vh] rounded transform hover:scale-105 border-2 border-cyan-900 px-2"
                >
                    Change Report Criteria
                </button>
                <ApplyTradesFilters />
            </div>

            {showForm && <GetReportsForm setShowForm={setShowForm} />}

        </div>
    )
}