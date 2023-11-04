import { useDispatch, useSelector } from "react-redux"
import { loadCloseDiffs } from "../../../../store/backtests";
import ClosesChart from "./ClosesChart";



export default function MarketProfile(){

    const dispatch = useDispatch();
    const diffs = useSelector(state => state.entities.backtests.closeDiffs);


    return (
        <div className="flex gap-8">
            {/* <div className="w-20 flex flex-col gap-8 overflow-y-auto h-[80vh]">
                <p>Num of stocks closed higher/lower.</p>
                <p>Avg </p>
                <p>Num of stocks. Closed higher/lower; Opened Green/Red. (prefs/spy500/cefs).</p>
                <p>Charts of the above throughout time.</p>
            </div>  */}
            <div className="flex gap-8">
                <button onClick={()=>dispatch(loadCloseDiffs())}>Load</button>
            </div>
            <ClosesChart data={diffs} label={"Percentage of stocks closing green"} />
        </div>
    )
}