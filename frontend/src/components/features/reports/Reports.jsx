import { useSelector, useDispatch } from "react-redux"
import ReportTokenForm from "./ReportTokenForm";
import { useEffect } from "react";
import GetReportsForm from './GetReportsForm';

export default function Reports() {

    const token = useSelector(state => state.entities.reports.reportToken);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     // if ( token older than 2 hours ) {
    //     //     dispatch( delete token -> need to log in again )
    //     // }

    // }, [])

    return token
        ?
        <div className="flex flex-col mx-auto items-center">
            <GetReportsForm />
            <h1>RENDER REPORTS</h1>
        </div>
        :
        <ReportTokenForm />
}