import { useDispatch } from "react-redux";
import { getDividendStats } from "../../../../store/backtests";
import { useState } from "react";

export default function TickerInput() {

    const dispatch = useDispatch();
    const [ticker, setTicker] = useState("");

    function handleButtonClick() {
        dispatch(getDividendStats(ticker))
    }

    return (
        <div className="flex gap-4 mx-auto mb-4 h-fit">
            <label>Ticker:</label>
            <input
                type="text"
                className="shadow hover:bg-gray-100 focus:bg-gray-200"
                onChange={e => setTicker(e.target.value)}
                value={ticker}
            ></input>
            <button
                onClick={handleButtonClick}
                disabled={!ticker}
                className="bg-green-200 hover:bg-green-300 transform hover:scale-105 px-2 rounded disabled:bg-gray-100 disabled:scale-100"
            >Get</button>
        </div>
    )
}