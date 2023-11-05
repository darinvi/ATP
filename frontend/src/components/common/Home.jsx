import ListFilings from "../features/filings/ListFilings"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { hideTime } from "../../store/filings"

export default function Home() {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(hideTime());
    },[])

    return (
        <div className="flex items-center gap-4">
            <div className="scroll w-fit overflow-y-auto h-[91.5vh] border border-gray-900 px-1 ">
                <ListFilings additionalClass={"w-fit "} />
            </div>
            {/* <h1>Add market holidays</h1>
            <h1>Trade ideas (with dinamic variables), can be commented by the mentors</h1>
            <h1>Add some components that summarize the other pages (filings list, mentor panel, etc)</h1> */}
        </div>)
}