import { useSelector } from "react-redux"
import PositionsSingleDay from "./PositionsSingleDay"
import EquityCurve from "../EquityCurve"

export default function Positions() {
    const currentData = useSelector(state => state.entities.reports.currentData)

    const total = currentData && Object.values(currentData).reduce((prev, curr) => {
        const sum = prev[prev.length - 1] + curr.TOTALS.total
        prev.push(parseFloat(sum.toFixed(2)))
        return prev
    }, [0])

    const renderReports = currentData && Object.entries(currentData).map(e => {
        const [date, data] = e;
        return <PositionsSingleDay day={date} positions={data} />
    })

    return (
        <div className="flex overflow-y-auto px-4">
            {
                currentData
                &&
                <div className="flex flex-col gap-8 overflow-y-scroll h-[80vh] w-1/2">
                    {/* <p>HAVE A FILTER FOR DAYS WHERE PFF / SPY / TLT GAP MORE THAN x. </p>
                    <p>ON CLICK OF SPECIFIC DAY, ALLOW FOR ADDING COMMENTS TO THE JOURNAL FOR SAID DAY. </p>
                    <p>FILTER DAYS BASED ON TAGS / AVERAGE / SPECIFIC</p> */}
                    {renderReports}
                </div>
            }
            {total && <EquityCurve data={total} />}
        </div>

    )
}