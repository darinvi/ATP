import { useDispatch } from "react-redux";
import { getDividendStats } from "../../../../store/backtests";
import { useState } from "react";
import DisplayStats from "./DisplayStats";

export default function DividendStats() {

    const dispatch = useDispatch();
    const [ticker, setTicker] = useState("");

    function handleButtonClick() {
        dispatch(getDividendStats(ticker))
    }

    return <div>
        <div className="flex gap-4">
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
        <DisplayStats />
    </div>
}