import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loadAccountPositions } from "../../../store/reports";

export default function GetReportForm(props) {

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
        dispatch(loadAccountPositions(reportToken, start, end, accountId))
        props.disableForm(false);

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

    // handle start year > end year and invalid inputs.
    return (
        <form onSubmit={handleSubmitForm} className="flex flex-col mx-auto gap-4 mt-12 mb-6 items-center">
            <div className="flex gap-6" >
                <div className="flex gap-2">
                    <label htmlFor="dateFrom">from</label>
                    <input
                        id="dateFrom"
                        type="text"
                        className={`shadow rounded ${!datesValid.start && 'bg-red-100'}`}
                        placeholder="dd/mm/yy"
                        // value={start}
                        onChange={handleStartInput}
                    ></input>
                </div>

                <div className="flex gap-2">
                    <label htmlFor="dateTo">to</label>
                    <input
                        id="dateTo"
                        type="text"
                        className={`shadow rounded ${!datesValid.end && 'bg-red-100'}`}
                        placeholder="dd/mm/yy"
                        onChange={handleEndInput}
                    // value={start}
                    ></input>
                </div>
            </div>

            <div className="flex gap-4">
                <label htmlFor="account-select">Account:</label>
                <select id="account-select" className="shadow" onChange={(e)=>setAccountId(e.target.value)}>
                    {accounts && accounts.map(acc => {
                        return <option value={acc[0]}>{acc[1]} {acc[2]}</option>
                    })}
                </select>
                {/* Maybe a <button>ADD ACC</button> here would be perfect for creating the matrix. */}
            </div>

            <div className="flex gap-4">
                <label htmlFor="report-select">Type:</label>
                <select
                    id="report-select"
                    className="shadow"
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="" disabled={type}>Choose Report Type:</option>
                    {reportTypes.map(type => {
                        return <option value={type}>{type}</option>
                    })}
                </select>
            </div>

            <button
                type="submit"
                className="disabled:text-sm disabled:text-white disabled:bg-gray-100 bg-gray-300 w-48 rounded"
            // disabled={}
            >Load Report</button>
            <h1 className="text-2cl">{start}</h1>
            <h1 className="text-2cl">{end}</h1>
        </form>
    )

}
