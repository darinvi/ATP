import ListJournals from "./journals/ListJournals"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearJournalList } from "../../../store/journal"

export default function Profile() {

    const dispatch = useDispatch();

    useEffect(()=>{
        return () =>{
            dispatch(clearJournalList());
        } 
    },[])

    return <div className="flex justify-around w-full my-8">
        <ListJournals />
        <h1>Get CEFs and show NAV change</h1>
        <h1 className="w-48">A group chat where anyone can post a comment, an others in the mentor group can respond</h1>
    </div>
}