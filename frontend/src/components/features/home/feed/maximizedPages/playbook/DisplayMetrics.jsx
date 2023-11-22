import { useSelector } from "react-redux"
import MetricsTable from "./MetricsTable"

export default function DisplayMetrics() {

    const play = useSelector(state => state.entities.home.maximizedData)

    const metricSpan = "font-medium"

    return (
        <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-10 ml-4 mt-2">
                    <p>Created by: <span className={metricSpan}>{play.user.username}</span></p>
                    <p>Play: <span className={metricSpan}>{play.play}</span></p>
                    <p>Ticker: <span className={metricSpan}>{play.ticker}</span></p>
                </div>
                <p className="font-medium text-center mt-2 border-b w-fit mx-auto">Metrics for {play.date.split("T")[0]}</p>
            </div>
            <MetricsTable ticker={play.ticker} />
        </div>
    )
}