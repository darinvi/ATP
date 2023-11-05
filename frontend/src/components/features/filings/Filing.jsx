import { useDispatch } from "react-redux";
import ListFilings from "./ListFilings";
import ExternalHTMLViewer from "./ExternalHTMLViewer";
import { useEffect } from "react";
import { showTime } from "../../../store/filings";

export default function WTF() {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(showTime());
    },[])

    return (
        <div className="flex mt-4 w-full h-full">
            <div className="flex w-full justify-center gap-16">
                <div className='scroll w-fit overflow-y-auto h-[80vh] border border-gray-900'>
                    <ListFilings additionalClass={""} />
                </div>
                <ExternalHTMLViewer />
            </div>
        </div>
    )


}