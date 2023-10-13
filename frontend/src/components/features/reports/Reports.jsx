import { useSelector, useDispatch } from "react-redux"
import ReportTokenForm from "./ReportTokenForm";
import { useEffect, useState } from "react";
import GetReportsForm from './GetReportsForm';
import { loadAccounts, clearReportData, clearReportState } from "../../../store/reports";
import moment from 'moment/moment.js';

export default function Reports() {

    const reportToken = useSelector(state => state.entities.reports.reportToken);
    const accounts = useSelector(state => state.entities.reports.accounts);
    const lastLogin = useSelector(state => state.entities.reports.lastLogin);
    const dispatch = useDispatch();
    const [ showForm, setShowForm ] = useState(true)


    // FIX: CLEAR REPORT DATA ONLY CLEARS THE FETCHED DATA SO AFTER LOG OUT AND THEN LOG IN OF NEW ACCOUNT THE OLD REPORT IS DISPLAYED.
    // THIS WILL CAUSE A NEW ACCOUNT TO BE ABLE TO KEEP FETCHING REPORTS OF THE OLD USER

    useEffect(() => {
        // CLEAR DATA ONLY IF NO TOKEN OR 1.5H HAVE PASSED
        // Reload of page causes the loging to be required again. fix.
        if ( !reportToken || moment().diff(moment(lastLogin), "minutes") > 90 ) {
            dispatch(clearReportState())
        }

        return () => {
            dispatch(clearReportData())
        }
    }, [])
    
    function handleAccounts() {
        dispatch(loadAccounts(reportToken))
    }

    return reportToken
        ?
        <>
        {/* SET ACCOUNTS ACTION DISPATCHED TOO MANY TIMES HAVE TO FIX*/}
        {/* I HAVE TO ADD LOADING TO THE REDUCER AND ONLY DISPATCH IF NOT LOADING */}
        {!accounts && handleAccounts()}
        
        <div className="flex flex-col mx-auto items-center">
            
            {showForm ? 
                <GetReportsForm disableForm={setShowForm} /> 
                : 
                <button 
                    onClick={()=> setShowForm(true)}
                    className="shadow bg-gray-300 px-2 mt-12 mb-6"
                >Change Report Criteria</button>
            }
            <h1>RENDER REPORTS</h1>
        </div>
        </>

        :

        <ReportTokenForm />
}