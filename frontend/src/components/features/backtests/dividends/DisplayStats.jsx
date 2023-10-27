import { useSelector } from "react-redux"

export default function DisplayStats(){

    const stats = useSelector(state => state.entities.backtests.dividends);
    
    function displayStats(){
        return <div className="flex flex-col gap-6 mt-6 border border-gray-200 px-8 py-2">
            <div className="flex flex-col mx-auto bg-gray-200 w-full items-center">
                <p>Data For Past {stats.positive + stats.negative} Ex-Dates</p>
            </div>
            <p># Green Opens: <span className="font-medium">{stats.positive}</span></p>
            <p># Red Opens: <span className="font-medium">{stats.negative}</span></p>
            <p>Percentage Green Opens: <span className="font-medium">{parseFloat(stats.percentage).toFixed(2)}</span>%</p>
            <p>Average Green Open: <span className="font-medium">{parseFloat(stats.avg_positive).toFixed(3)*100}</span> cents</p>
            <p>Average Red Open: <span className="font-medium">{parseFloat(stats.avg_negative).toFixed(3)*100}</span> cents</p>
            <p>Average Open: <span className="font-medium">{parseFloat(stats.average).toFixed(3)*100}</span> cents</p>
            <p>ADD AVERAGE CLOSES RELATIVE TO OPEN (Instead to flat)</p>
        </div>
    }

    return <>
        {stats ? displayStats() : <></>}
    </>
}