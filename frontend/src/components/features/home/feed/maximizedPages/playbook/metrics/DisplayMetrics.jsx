import { useSelector } from "react-redux"
import MetricsTable from "./MetricsTable"
import CommentSectionButtons from "../comments/CommentSectionButtons"

export default function DisplayMetrics() {

    const play = useSelector(state => state.entities.home.maximizedData)

    const metricSpan = "font-medium text-lg"

    return (
        <div className="flex-1 flex flex-col w-full ml-2">
            <div className="flex-1 flex flex-col justify-around">
                <p>Created by: <span className={metricSpan}>{play.user.username}</span></p>
                <p>Play: <span className={metricSpan}>{play.play}</span></p>
                <div className="flex gap-6">
                    <p>Ticker: <span className={metricSpan}>{play.ticker}</span></p>
                    <CommentSectionButtons />
                </div>
            </div>
            <div
                className="flex flex-col gap-2 w-full border-t-2 flex-1 h-1/2 overflow-y-auto pb-1"
            >
                <p className="text-center mt-2 w-fit mx-auto text-sm text-gray-400">({play.date.split("T")[0]})</p>
                <MetricsTable ticker={play.ticker} date={play.date.split("T")[0]} />
            </div>
        </div>
    )
}