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

    // FilingRow clicked form the Home page to go to Filing page and render the html cliced. <------------- 1
    // On click of the date to render a bar chart of the ticker for that date.
    // On click of the user 
    // Add market holidays
    // Trade ideas (with dinamic variables), can be commented by the mentors
    // Add some components that summarize the other pages (filings list, mentor panel, etc) 
    // Dont call all playbooks, only render a couple, then fetch more if scrolled all teh way down?
    // Press on playbook to render playbook form page
    // Mark posts as read is a good way to keep the page simple and not have to worry about rendering tons of playbooks (even ones already read)
    return (
        <div className="flex">
                <div className="overflow-y-auto h-[92vh] border border-gray-900 overflow-x-hidden">
                    <ListFilings additionalClass={"w-fit "} />
                </div>
                <PostsFeed />
        </div>)
}