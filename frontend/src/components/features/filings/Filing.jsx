import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadFilings, cleanFilings } from "../../../store/filings";
import ListFilings from "./ListFilings";
import ExternalHTMLViewer from "./ExternalHTMLViewer";


export default function WTF(){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(loadFilings())

        return () => {
            dispatch(cleanFilings());
        }
            
    },[])

    return (
        <>
            <p>ADD FILTERS FOR AN OPEN HTML FILING</p>
            <ListFilings />
            <ExternalHTMLViewer />
        </>
    )


}