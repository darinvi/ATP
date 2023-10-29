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
            <thead className="items-center bg-gray-100 border-b sticky top-0">
                <tr>
                    <PrefColnames text="Ticker" reducer={sortByTicker} sorted={sorted} setSorted={setSorted}/>
                    <PrefColnames text="AVG.Volume" reducer={sortByAvgVolume} sorted={sorted} setSorted={setSorted}/>
                    <PrefColnames text="Div.Amount" reducer={sortByDivAmount} sorted={sorted} setSorted={setSorted}/>
                    <PrefColnames text="Ex Date" reducer={sortByDate} sorted={sorted} setSorted={setSorted}/>
                    <PrefColnames text="ATR" reducer={sortByATR} sorted={sorted} setSorted={setSorted}/>
                    <PrefColnames text="Industry" reducer={sortByIndustry} sorted={sorted} setSorted={setSorted}/>
                </tr>
            </thead>
        )
    }

    function getTableData() {
        return (
            <tbody>
                {prefsData && prefsData.map(e => <PrefDataRow data={e} />)}
            </tbody>
        )
    }

    return (
        <table
            className="table-fixed items-center mt-4"
        >
            {getTableHeaders()}
            {getTableData()}
        </table>
    )
}