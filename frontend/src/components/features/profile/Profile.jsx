import ListJournals from "./journals/ListJournals"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearJournalList, clearTagList } from "../../../store/journal"

export default function Profile() {

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearJournalList());
            dispatch(clearTagList());
        }
    }, [])

    return <div className="flex justify-around w-full my-8">
        <ListJournals />
        <div className="flex flex-col justify-between w-64 text-sm">
            <h1>Get CEFs and show NAV change</h1>
            <h1>A group chat where anyone can post a comment, an others in the mentor group can respond</h1>
            <h1>FIX going from trainees journals -> Journal page causes an error</h1>
            <h1>FIx comments overflow. Very inconsistent, sometimes with scroll, sometimes goes on new line.</h1>
            <h1>Adding a comment will require a rerender? Need a way to visualize it straight away. The button click will also dispatch a reducer inside the singleComment that will change the state inside of it.</h1>
        </div>
    </div>
}