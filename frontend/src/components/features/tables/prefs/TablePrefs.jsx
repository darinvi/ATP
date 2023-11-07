import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { getPrefsData, sortByAvgVolume, sortByDivAmount, sortByDate, sortByATR, sortByTicker, sortByIndustry } from "../../../../store/tables";
import PrefColnames from "./PrefColnames";
import PrefDataRow from "./PrefDataRow";

export default function TablePrefs() {

    const dispatch = useDispatch();
    const prefsData = useSelector(state => state.entities.tables.prefs)
    const [sorted, setSorted] = useState("");

    useEffect(() => {
        if (!prefsData) {
            dispatch(getPrefsData())
        }
    }, [])

    function getTableHeaders() {
        return (
            <div className="flex w-full bg-gray-200 sticky top-0 border-y border-gray-500">
                    <PrefColnames text="Ticker" reducer={sortByTicker} sorted={sorted} setSorted={setSorted}/>
                    <PrefColnames text="AVG.Volume" reducer={sortByAvgVolume} sorted={sorted} setSorted={setSorted}/>
                    <PrefColnames text="Div.Amount" reducer={sortByDivAmount} sorted={sorted} setSorted={setSorted}/>
                    <PrefColnames text="Ex Date" reducer={sortByDate} sorted={sorted} setSorted={setSorted}/>
                    <PrefColnames text="ATR" reducer={sortByATR} sorted={sorted} setSorted={setSorted}/>
                    <PrefColnames text="Industry" reducer={sortByIndustry} sorted={sorted} setSorted={setSorted}/>
            </div>
        )
    }

    function getTableData(){
        return (
            <tbody>
                {prefsData && prefsData.map(e => <PrefDataRow data={e} />)}
            </tbody>
        )
    }

    return (
        <div
            className="flex flex-col"
        >
            {getTableHeaders()}
            {getTableData()}
        </div>
    )
}