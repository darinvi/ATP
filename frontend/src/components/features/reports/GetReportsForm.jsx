import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loadAccounts } from "../../../store/reports";

export default function GetReportForm(){

    const [formFields, setFormFields] = useState([]);
    const dispatch = useDispatch();
    const reportToken = useSelector(state => state.entities.reports.reportToken)
    const accounts = useSelector(state => state.entities.reports.accounts)

    useEffect(()=>{
        if (!accounts) {
            // dispatch(loadAccounts(reportToken))
        }
    },[])

    const actions = {
        'accounts' : ['startDate', 'endDate', 'page', 'token', '']
    }

    return <h1>da</h1>

}