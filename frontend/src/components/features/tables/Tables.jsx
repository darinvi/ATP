import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { clearTablesData } from "../../../store/tables";
import TablePrefs from "./prefs/TablePrefs";

export default function Tables(){

    const [prefsOpen, setPrefsOpen] = useState(false);
    const [cefsOpen, setCefsOpen] = useState(false);
    
    return <div className="flex flex-col w-full overflow-y-auto h-[92vh]">
        <div className="flex gap-1 mx-auto py-2 items-center">
            <button
                onClick={()=>{
                    if (cefsOpen) {
                        setCefsOpen(false);
                    }
                    setPrefsOpen(true);
                }}
                className={`bg-gray-200 hover:bg-green-300 px-6 border border-black transform ${prefsOpen && "bg-green-200 scale-110 rounded"}`}
                >Prefs</button>
            <button
                onClick={()=>{
                    if (prefsOpen) {
                        setPrefsOpen(false);
                    }
                    setCefsOpen(true);
                }}
                className={`bg-gray-200 hover:bg-green-300 px-6 border border-black transform ${cefsOpen && "bg-green-200 scale-110 rounded"}`}
            >Cefs</button>
        </div>
        {/* MOVE TABLE OPEN STATE TO REDUX, CREATE A SEPARATE COMPONENT FOR BUTTONS. ADD TICKER COMMONS TABLE AS WELL */}
        {/* MAKE THE TABLES RESPONSIVE, EASY TO USE ON MOBILE. */}
        {prefsOpen && <TablePrefs />}
    </div>
}