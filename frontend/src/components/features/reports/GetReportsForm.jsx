import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loadAccounts } from "../../../store/reports";
import { tokenUndefined } from "../../../store/reports";
import { clearReportData } from "../../../store/reports";

export default function GetReportForm(){

    const dispatch = useDispatch();
    const reportToken = useSelector(state => state.entities.reports.reportToken)
    const accounts = useSelector(state => state.entities.reports.accounts)
    
    const [formFields, setFormFields] = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    useEffect(()=>{
        if (reportToken === 'undefined' || !reportToken){
            dispatch(tokenUndefined())
        }
        if (!accounts) {
            dispatch(loadAccounts(reportToken))
        }

        return () => {
            dispatch(clearReportData())
        }
    },[])

    function handleSubmitForm(e) {
        e.preventDefault();
    }

    return (
        <form className="flex gap-6 mt-8" onSubmit={handleSubmitForm}>
            <div className="flex gap-2">
                <label>from</label>
                <input
                    type="text"
                    className="shadow"
                    placeholder="dd/mm/yy"
                    onChange={ e => setStart(e.target.value)}
                ></input>
            </div>

            <div className="flex gap-2">
                <label>to</label>
                <input
                    type="text"
                    className="shadow"
                    placeholder="dd/mm/yy"
                    onChange={ e => setEnd(e.target.value)}
                ></input>
            </div>

            <button
                type="submit"
                className="disabled:text-sm disabled:text-white disabled:bg-gray-100 bg-gray-300 px-2"
                disabled={!(start && end)}
            >Load Report</button>
        </form>
    )

}
