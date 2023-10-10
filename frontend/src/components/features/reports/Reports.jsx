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

    useEffect(() => {
        // CLEAR DATA ONLY IF NO TOKEN OR 1.5H HAVE PASSED
        if ( !reportToken || moment().diff(moment(lastLogin), "minutes") > 90 ) {
            dispatch(clearReportState())
        }
        if (!accounts) {
            dispatch(loadAccounts(reportToken))
        }

        return () => {
            dispatch(clearReportData())
        }
    }, [])

    return reportToken
        ?

        
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


        :


        <ReportTokenForm />
}