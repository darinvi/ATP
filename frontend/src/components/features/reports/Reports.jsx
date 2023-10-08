import { useSelector, useDispatch } from "react-redux"
import ReportTokenForm from "./ReportTokenForm";
import { useEffect, useState } from "react";
import GetReportsForm from './GetReportsForm';

export default function Reports() {

    const token = useSelector(state => state.entities.reports.reportToken);
    // const dispatch = useDispatch();
    const [ showForm, setShowForm ] = useState(true)


    // useEffect(() => {
    //     // if ( token older than 2 hours ) {
    //     //     dispatch( delete token -> need to log in again )
    //     // }

    // }, [])

    return token
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