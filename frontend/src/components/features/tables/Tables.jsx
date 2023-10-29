import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { clearTablesData } from "../../../store/tables";
import TablePrefs from "./TablePrefs";

export default function Tables(){

    const [prefsOpen, setPrefsOpen] = useState(false);
    const [cefsOpen, setCefsOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(()=>{
        return () => {
            dispatch(clearTablesData());
        }
    },[])

    return <div className="flex flex-col w-full">
        <div className="mx-auto">
            <button
                onClick={()=>{
                    if (cefsOpen) {
                        setCefsOpen(false);
                    }
                    setPrefsOpen(true);
                }}
                className={`bg-gray-200 hover:bg-green-300 px-4 border border-black ${prefsOpen && "bg-green-200"}`}
                >Prefs</button>
            <button
                onClick={()=>{
                    if (prefsOpen) {
                        setPrefsOpen(false);
                    }
                    setCefsOpen(true);
                }}
                className={`bg-gray-200 hover:bg-green-300 px-4 border border-black ${cefsOpen && "bg-green-200"}`}
            >Cefs</button>
        </div>
        {prefsOpen && <TablePrefs />}
    </div>
}