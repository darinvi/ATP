import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { tokenUndefined } from "../../../store/reports";
import { clearReportData } from "../../../store/reports";
import { loadAccounts } from "../../../store/reports";

export default function GetReportForm(props) {

    const dispatch = useDispatch();
    const reportToken = useSelector(state => state.entities.reports.reportToken)
    const accounts = useSelector(state => state.entities.reports.accounts)

    const [formFields, setFormFields] = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const actions = {

    }

    useEffect(() => {
        if (reportToken === 'undefined' || !reportToken) {
            dispatch(tokenUndefined())
        }
        if (!accounts) {
            dispatch(loadAccounts(reportToken))
        }

        return () => {
            dispatch(clearReportData())
        }
    }, [])

    function handleSubmitForm(e) {
        e.preventDefault();
        props.disableForm(false)
    }

    return (
        <form onSubmit={handleSubmitForm} className="flex flex-col mx-auto gap-4 mt-12 mb-6 items-center">
            <div className="flex gap-6" >
                <div className="flex gap-2">
                    <label htmlFor="dateFrom">from</label>
                    <input
                        id="dateFrom"
                        type="text"
                        className="shadow"
                        placeholder="dd/mm/yy"
                        onChange={e => setStart(e.target.value)}
                    ></input>
                </div>

                <div className="flex gap-2">
                    <label htmlFor="dateTo">to</label>
                    <input
                        id="dateTo"
                        type="text"
                        className="shadow"
                        placeholder="dd/mm/yy"
                        onChange={e => setEnd(e.target.value)}
                    ></input>
                </div>
            </div>

            <div className="flex gap-4">
                <label htmlFor="account-select">Account:</label>
                <select id="account-select" className="shadow">
                    {accounts && accounts.map(acc => {
                        return <option>{acc[1]} {acc[2]}</option>
                    })}
                </select>
                {/* Maybe a <button>ADD ACC</button> here would be perfect for creating the matrix. */}
            </div>

            <button
                type="submit"
                className="disabled:text-sm disabled:text-white disabled:bg-gray-100 bg-gray-300 w-48"
            // disabled={}
            >Load Report</button>
        </form>
    )

}
