import { useSelector, useDispatch } from "react-redux"
import ReportTokenForm from "./ReportTokenForm";
import { useEffect, useState } from "react";
import { loadAccounts, clearReportData, clearReportState } from "../../../store/reports";
import moment from 'moment/moment.js';
import Positions from "./positions/Positions";
import Trades from "./trades/Trades";
import ChooseReport from "./ChooseReport";

export default function Reports() {

    const reportToken = useSelector(state => state.entities.reports.reportToken);
    const accounts = useSelector(state => state.entities.reports.accounts);
    const lastLogin = useSelector(state => state.entities.reports.lastLogin);
    const lastTypeCalled = useSelector(state => state.entities.reports.type);
    const loading = useSelector(state => state.entities.reports.loading);
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(true)


    const mapTypeToComponent = {
        'Totals': <Positions />,
        'Trades': <Trades />
    }

    // FIX: CLEAR REPORT DATA ONLY CLEARS THE FETCHED DATA SO AFTER LOG OUT AND THEN LOG IN OF NEW ACCOUNT THE OLD REPORT IS DISPLAYED.
    // THIS WILL CAUSE A NEW ACCOUNT TO BE ABLE TO KEEP FETCHING REPORTS OF THE OLD USER

    useEffect(() => {
        // CLEAR DATA ONLY IF NO TOKEN OR 1.5H HAVE PASSED
        // Reload of page causes the loging to be required again. fix.
        if (!reportToken || moment().diff(moment(lastLogin), "minutes") > 90) {
            dispatch(clearReportState())
        }

        return () => {
            dispatch(clearReportData())
        }
    }, [])

    function handleAccounts() {
        dispatch(loadAccounts(reportToken))
    }

    // SET ACCOUNTS ACTION DISPATCHED TOO MANY TIMES HAVE TO FIX
    // I HAVE TO ADD LOADING TO THE REDUCER AND ONLY DISPATCH IF NOT LOADING 
    // Add go to journal on reports 
    return (

        reportToken
            ?

            <div className="flex flex-col items-center text-gray-300 gap-2 h-[92vh] w-full overflow-y-auto">
                {!accounts && handleAccounts()}

                <ChooseReport
                    showForm={showForm}
                    setShowForm={setShowForm}
                />

                {/* {!loading
                    ? */}
                    <div className="w-full h-full">
                        {mapTypeToComponent[lastTypeCalled]}
                    </div>
                    {/* : */}
                    {/* <p className="text-2xl text-black animate-ping">Loading...</p> */}
                {/* } */}

            </div>

            :

            <ReportTokenForm />
    )
}