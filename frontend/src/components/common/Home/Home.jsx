import ListFilings from "../../features/filings/ListFilings"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { hideTime } from "../../../store/filings"
import RenderPlaybooks from "../../features/playbooks/renderPlaybooks/RenderPlaybooks"

export default function Home() {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(hideTime());
    },[])

    return (
        <div className="flex">
                <div className="overflow-y-auto h-[91.5vh] border border-gray-900 flex-1/4">
                    <ListFilings additionalClass={"w-fit "} />
                </div>
                <div className="overflow-y-auto h-[91.5vh] border border-gray-900 w-[50vw]">
                    <div className="flex bg-gray-300 sticky top-0 border-b border-gray-900">
                        <button className="bg-cyan-200 flex-1 border border-gray-800">Playbooks</button>
                        <button className="bg-cyan-200 flex-1 border border-gray-800">Trade Ideas</button>
                    </div>
                    <RenderPlaybooks />
                </div>
            {/* <h1>Add market holidays</h1>
            <h1>Trade ideas (with dinamic variables), can be commented by the mentors</h1>
            <h1>Add some components that summarize the other pages (filings list, mentor panel, etc)</h1> 
            <h1>Dont call all playbooks, only render a couple, then fetch more if scrolled all teh way down?</h1>
            */}
        </div>)
}