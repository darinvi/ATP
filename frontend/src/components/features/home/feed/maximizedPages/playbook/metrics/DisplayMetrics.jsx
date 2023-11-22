import { useSelector } from "react-redux"
import MetricsTable from "./MetricsTable"

export default function DisplayMetrics() {

    const play = useSelector(state => state.entities.home.maximizedData)

    const metricSpan = "font-medium text-lg"

    return (
        <div className="flex-1 flex flex-col justify-around items-center w-full">
            <p>Created by: <span className={metricSpan}>{play.user.username}</span></p>
            <p>Play: <span className={metricSpan}>{play.play}</span></p>
            <p>Ticker: <span className={metricSpan}>{play.ticker}</span></p>
            <div
                className="flex flex-col gap-2 w-full border-t-2"
            >
                <p className="text-center mt-2 w-fit mx-auto text-sm text-gray-400">({play.date.split("T")[0]})</p>
                <MetricsTable ticker={play.ticker} />
            </div>
        </div>
    )
}