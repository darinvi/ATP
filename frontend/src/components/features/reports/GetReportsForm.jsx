import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loadPositions, loadTrades, setCalledType } from "../../../store/reports";
import ClosingSVG from "../../utils/ClosingSVG";

export default function GetReportForm({ setShowForm }) {

    const dispatch = useDispatch();
    const reportToken = useSelector(state => state.entities.reports.reportToken)
    const accounts = useSelector(state => state.entities.reports.accounts)

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [datesValid, setDatesValid] = useState({ start: true, end: true });
    const [type, setType] = useState("");
    const [accountId, setAccountId] = useState("");

    const reportTypes = ['Totals', 'Summary', 'Trades']

    function handleSubmitForm(e) {
        e.preventDefault();
        dispatch(setCalledType(type))
        if (type == 'Totals') {
            dispatch(loadPositions(reportToken, start, end, accountId))
        } else if (type == 'Trades') {
            dispatch(loadTrades(reportToken, start, end, accountId))
        } else if (type == 'Summary') {
            console.log('ToDo: dispatch Summary')
        }
        setShowForm(false);
    }

    function validateDateInput(date) {
        // if (date == "") return true; 
        const [day, month, year] = date.split('/').map(Number);
        if (month < 1 || month > 12) {
            return false;
        }
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        const formattedYear = year < 100 ? `20${year}` : `${year}`;
        const maxDays = new Date(parseInt(formattedYear, 10), parseInt(formattedMonth, 10), 0).getDate();
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        if (parseInt(day) <= maxDays) {
            return `${formattedYear}-${formattedMonth}-${day}`
        } else {
            return `${formattedYear}-${formattedMonth}-${maxDays}`
        }
    }

    function handleStartInput(e) {
        const validated = validateDateInput(e.target.value)
        validated ?
            (() => {
                setStart(validated)
                setDatesValid({ ...datesValid, start: true })
            })()
            : setDatesValid({ ...datesValid, start: false })
    }

    function handleEndInput(e) {
        const validated = validateDateInput(e.target.value)
        validated ?
            (() => {
                setEnd(validated)
                setDatesValid({ ...datesValid, end: true })
            })()
            : setDatesValid({ ...datesValid, end: false })
    }

    function closeForm(e) {
        e.preventDefault();
        setShowForm(false);
    }

    const sharedClass = "hover:text-black border-2 border-cyan-800"
    const inputClass = "bg-cyan-700 rounded pl-2 focus:bg-cyan-800 hover:bg-cyan-800 text-white"

    // handle start year > end year and invalid inputs.
    return (
        <form
            onSubmit={handleSubmitForm}
            className="absolute bg-cyan-900 flex flex-col mx-auto gap-4 z-20 top-0 p-2 rounded-b-lg border-x-2 border-b-2 border-cyan-700"
        >
            <div className="flex gap-6" >
                <div className="flex gap-2 hover:text-white">
                    <label htmlFor="dateFrom">from</label>
                    <input
                        id="dateFrom"
                        type="text"
                        className={`${inputClass} ${!datesValid.start && 'bg-red-100'}`}
                        placeholder="dd/mm/yy"
                        // value={start}
                        onChange={handleStartInput}
                    ></input>
                </div>

                <div className="flex gap-2 hover:text-white">
                    <label htmlFor="dateTo">to</label>
                    <input
                        id="dateTo"
                        type="text"
                        className={`${inputClass} ${!datesValid.end && 'bg-red-100'}`}
                        placeholder="dd/mm/yy"
                        onChange={handleEndInput}
                    // value={start}
                    ></input>
                </div>
            </div>

            <div className="flex gap-4  hover:text-white">
                <label htmlFor="account-select">Account:</label>
                <select
                    id="account-select"
                    className="bg-cyan-900"
                    onChange={(e) => setAccountId(e.target.value)}
                >
                    {accounts && accounts.map(acc => {
                        return <option value={acc[0]}>{acc[1]} {acc[2]}</option>
                    })}
                </select>
                {/* Maybe a <button>ADD ACC</button> here would be perfect for creating the matrix. */}
            </div>

            <div className="flex gap-4 hover:text-white">
                <label htmlFor="report-select">Report Type:</label>
                <select
                    id="report-select"
                    className="bg-cyan-900"
                    onChange={(e) => setType(e.target.value)}
                >
                    {reportTypes.map(type => {
                        return <option value={type}>{type}</option>
                    })}
                </select>
            </div>

            <div className="flex gap-4 w-full border-t-2 border-cyan-800 pt-1 mx-auto">
                {/* <div className="mx-auto flex gap-4 my-2"> */}
                <div className="mx-auto flex gap-4 my-2">
                    <button
                        type="submit"
                        className={`hover:bg-green-200 px-2 rounded transform hover:scale-105 ${sharedClass}`}
                    >Load Report</button>
                    <ClosingSVG onClick={closeForm} />
                </div>
            </div>
        </form>
    )

}
