import { useSelector } from "react-redux"

export default function DisplayStats(){

    const stats = useSelector(state => state.entities.backtests.dividends);
    
    function displayStatsClose(){
        return <div className="flex flex-col gap-6 mt-6 border border-gray-200 px-8 py-2 transform hover:scale-105 rounded-xl hover:rounded-none">
            <div className="flex flex-col mx-auto bg-gray-200 w-full items-center rounded-md">
                <p>Close Relative To Flat:</p>
            </div>
            <p># Green Close: <span className="font-medium">{stats.green_close}</span></p>
            <p># Red Close: <span className="font-medium">{stats.red_close}</span></p>
            <p>Percentage Green Close: <span className="font-medium">{parseFloat(stats.pct_green).toFixed(2)}</span>%</p>
            <p>Average Green Close: <span className="font-medium">{parseFloat(stats.avg_green * 100).toFixed(2)}</span> cents</p>
            <p>Average Red Close: <span className="font-medium">{parseFloat(stats.avg_red * 100).toFixed(2)}</span> cents</p>
            <p>Average Close: <span className="font-medium">{parseFloat(stats.avg_close * 100).toFixed(2)}</span> cents</p>
        </div>
    }

    function displaStatsOpen(){
        // <p></p>
        return <div className="flex flex-col gap-6 mt-6 border border-gray-200 px-8 py-2 transform hover:scale-105 rounded-xl hover:rounded-none">
            <div className="flex flex-col mx-auto bg-gray-200 w-full items-center rounded-md">
                <p>Close Relative To Open:</p>
            </div>
            <p># Higer Close: <span className="font-medium">{stats.open_pos}</span></p>
            <p># Lower Close: <span className="font-medium">{stats.open_neg}</span></p>
            <p>Percentage Higher Close: <span className="font-medium">{parseFloat(stats.percentage_open).toFixed(2)}</span>%</p>
            <p>Average Higher Close: <span className="font-medium">{parseFloat(stats.avg_pos_open * 100).toFixed(2)}</span> cents</p>
            <p>Average Lower Close: <span className="font-medium">{parseFloat(stats.avg_neg_open * 100).toFixed(2)}</span> cents</p>
            <p>Average Close: <span className="font-medium">{parseFloat(stats.average_open * 100).toFixed(2)}</span> cents</p>
        </div>
    }

    function displayStatsFlat(){
        return <div className="flex flex-col gap-6 mt-6 border border-gray-200 px-8 py-2 transform hover:scale-105 rounded-xl hover:rounded-none">
            <div className="flex flex-col mx-auto bg-gray-200 w-full items-center rounded-md">
                <p>Open Relative To Flat:</p>
            </div>
            <p># Green Opens: <span className="font-medium">{stats.positive}</span></p>
            <p># Red Opens: <span className="font-medium">{stats.negative}</span></p>
            <p>Percentage Green Opens: <span className="font-medium">{parseFloat(stats.percentage).toFixed(2)}</span>%</p>
            <p>Average Green Open: <span className="font-medium">{parseFloat(stats.avg_positive * 100).toFixed(2)}</span> cents</p>
            <p>Average Red Open: <span className="font-medium">{parseFloat(stats.avg_negative * 100).toFixed(2)}</span> cents</p>
            <p>Average Open: <span className="font-medium">{parseFloat(stats.average * 100).toFixed(2)}</span> cents</p>
        </div>
    }

    return <>
        {stats ? 
            <div className="flex flex-col gap-2 border px-8 pb-4">
                <p
                    className="bg-gray-200 mx-auto px-12 font-medium text-lg"
                >Data For Past {stats.positive + stats.negative} Ex-Dates</p>
                <div className="flex gap-8">
                    {displayStatsFlat()} 
                    {displaStatsOpen()}
                    {displayStatsClose()}
                </div>
            </div>
        : <></>}
    </>
}