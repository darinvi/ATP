import { useSelector } from "react-redux"
import ShowTradeDetails from "./ShowTradeDetails";
import { useState } from "react";
import SingleTrade from "./SingleTrade";
import ApplyFilters from "./ApplyFilters";

export default function Trades() {

    const trades = useSelector(state => state.entities.reports.currentData);
    const [tradeInfo, setTradeInfo] = useState("");
    const [showTags, setShowTags] = useState(false);

    const renderTrades = trades && trades.map(el => {
        return <SingleTrade trade={el} setInfo={setTradeInfo} />
    })

    return <div className="flex flex-col items-center gap-4">
        <ApplyFilters />
        <p>RENDER FILTERED DATA, AT FIRST FILTERED = CURRENT</p>
        <div className="flex gap-32">
            {<div className="flex flex-col gap-2 overflow-y-scroll h-96">
                {renderTrades}
            </div>}
            <ShowTradeDetails trade={tradeInfo} />
        </div>
        {!showTags
            ?
            <button
                className="bg-gray-300 w-48 rounded"
                onClick={() => setShowTags(true)}
            >Show Tags</button>
            :
            <h1>WTF</h1>
        }
    </div>
}