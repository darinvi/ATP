import { useSelector } from "react-redux"
import ShowTradeDetails from "./ShowTradeDetails";
import { useState } from "react";
import SingleTrade from "./SingleTrade";
import ApplyFilters from "../filters/ApplyTradesFilters";
import TradeChart from "./TradeChart";

export default function Trades() {

    const trades = useSelector(state => state.entities.reports.currentData);
    const [tradeInfo, setTradeInfo] = useState("");
    const [showTags, setShowTags] = useState(false);
    const [renderCheckbox, setRenderCheckbox] = useState({ 'duration': false, 'direction': false })

    const renderTrades = trades && trades.map(el => {
        return <SingleTrade trade={el} setInfo={setTradeInfo} />
    })

    return <div className="flex flex-col items-center gap-4 h-full">
        <div className="flex gap-4">
            <div
                className="flex flex-col gap-2 overflow-y-auto h-[80vh] text-black"
            >
                {renderTrades}
            </div>
            <ShowTradeDetails trade={tradeInfo} />
            {trades && <TradeChart />}
        </div>
        {/* {!showTags
            ?
            <button
                className="bg-gray-300 w-48 rounded"
                onClick={() => setShowTags(true)}
            >Show Tags</button>
            :
            <h1>WTF</h1>
        } */}
        </div>
}