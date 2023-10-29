import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { clearTablesData } from "../../../store/tables";
import TablePrefs from "./prefs/TablePrefs";

export default function Tables(){

    const [prefsOpen, setPrefsOpen] = useState(false);
    const [cefsOpen, setCefsOpen] = useState(false);

    const dispatch = useDispatch();

    // useEffect(()=>{
    //     return () => {
    //         dispatch(clearTablesData());
    //     }
    // },[])
    

    return <div className="flex flex-col w-full mt-2">
        <div className="flex gap-1 mx-auto">
            <button
                onClick={()=>{
                    if (cefsOpen) {
                        setCefsOpen(false);
                    }
                    setPrefsOpen(true);
                }}
                className={`bg-gray-200 hover:bg-green-300 px-6 py-2 border border-black transform ${prefsOpen && "bg-green-200 scale-110 rounded"}`}
                >Prefs</button>
            <button
                onClick={()=>{
                    if (prefsOpen) {
                        setPrefsOpen(false);
                    }
                    setCefsOpen(true);
                }}
                className={`bg-gray-200 hover:bg-green-300 px-6 py-2 border border-black transform ${cefsOpen && "bg-green-200 scale-110 rounded"}`}
            >Cefs</button>
        </div>
        {prefsOpen && <TablePrefs />}
    </div>
}