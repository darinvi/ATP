import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getPrefsData } from "../../../store/tables";

export default function TablePrefs(){
    
    const dispatch = useDispatch();
    const prefsData = useSelector(state => state.entities.tables.prefs)

    useEffect(()=>{
        dispatch(getPrefsData())
    },[])

    return
}