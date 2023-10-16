import ListJournals from "./ListJournals"
import { useEffect } from "react"

export default function Profile() {

    useEffect(()=>{
        return // CLEAR THE JOURNALS AFTER DISMOUNT
    },[])

    return <div className="flex justify-around w-full my-8">
        <ListJournals />
        <h1>List Journals (of trainees as well for mentors)</h1>
        <h1>Get CEFs and show NAV change</h1>
    </div>
}