import ListFilings from "../filings/ListFilings"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { hideTime } from "../../../store/filings"
import PostsFeed from "./feed/PostsFeed"

export default function Home() {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(hideTime());
    },[])

    return (
        <div className="flex">
                <div className="overflow-y-auto h-[92vh] border border-gray-900 overflow-x-hidden">
                    <ListFilings additionalClass={"w-fit "} />
                </div>
                <PostsFeed />
            {/* <h1>Add market holidays</h1>
            <h1>Trade ideas (with dinamic variables), can be commented by the mentors</h1>
            <h1>Add some components that summarize the other pages (filings list, mentor panel, etc)</h1> 
            <h1>Dont call all playbooks, only render a couple, then fetch more if scrolled all teh way down?</h1>
            */}
        </div>)
}