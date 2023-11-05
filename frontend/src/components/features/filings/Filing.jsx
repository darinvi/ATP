import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadFilings, cleanFilings } from "../../../store/filings";
import ListFilings from "./ListFilings";
import ExternalHTMLViewer from "./ExternalHTMLViewer";


export default function WTF() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadFilings())

        return () => {
            dispatch(cleanFilings());
        }

    }, [])

    return (
        <div className="flex mt-4 w-full">
            <div className="flex w-full justify-center gap-16">
                <ListFilings />
                <ExternalHTMLViewer />
            </div>
        </div>
    )


}