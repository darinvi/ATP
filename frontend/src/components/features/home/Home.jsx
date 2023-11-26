import ListFilings from "../filings/ListFilings"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { hideTime } from "../../../store/filings"
import PostsFeed from "./feed/PostsFeed"
import { setLastPage } from "../../../store/filings"
import MaximizedPage from "./feed/maximizedPages/MaximizedPage"
import { setMaximized } from "../../../store/home"

export default function Home() {

    const dispatch = useDispatch();
    const maximized = useSelector(state => state.entities.home.maximized)

    useEffect(() => {
        dispatch(hideTime());
        dispatch(setLastPage("home"));
    }, [])

    // On click of the date to render a bar chart of the ticker for that date.
    // Add market holidays
    // Trade ideas (with dinamic variables), can be commented by the mentors
    // Dont call all playbooks, only render a couple, then fetch more if scrolled all teh way down?
    return (
        <div className="flex">
            <div
                className="overflow-y-auto h-[92vh] border border-gray-900 overflow-x-hidden"
            >
                <ListFilings additionalClass={"w-fit"} />
            </div>
            <PostsFeed />
            {maximized && <MaximizedPage />}
        </div>)
}