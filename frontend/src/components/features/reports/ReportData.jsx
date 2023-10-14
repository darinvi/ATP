import { useSelector } from "react-redux"
import PositionsSingleDay from "./PositionsSingleDay"
import EquityCurve from "./EquityCurve"

export default function ReportData(){
    const currentData = useSelector(state => state.entities.reports.currentData) 
    
    const total = currentData && Object.values(currentData).reduce((prev, curr) => {
        const sum = prev[prev.length - 1] + curr.TOTALS.total
        prev.push(parseFloat(sum.toFixed(2)))
        return prev
    }, [0])

    
    const renderReports = currentData && Object.entries(currentData).map( e => {
        const [date, data] = e;
        return <PositionsSingleDay day={date} positions={data} />
    })

    function testTotals() {
        console.log(total)
    }


    return <div className="flex">
    <div className="flex flex-col gap-8 overflow-y-scroll h-96">
        {renderReports}
    </div>
    <button onClick={testTotals}>test</button>
    {total && <EquityCurve data={total} />}
    </div> 
}