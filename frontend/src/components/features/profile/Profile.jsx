import ListJournals from "./journals/ListJournals"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearJournalList, clearTraineeTagList } from "../../../store/journal"
import AskMentor from "./mentor/AskMentor"

export default function Profile() {

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearJournalList());
            dispatch(clearTraineeTagList());
        }
    }, [])

    return <div className="flex justify-around w-full my-8">
        <ListJournals />
        <AskMentor />
        <div className="flex flex-col justify-between w-64 text-sm h-96">
            <h1>Get CEFs and show NAV change</h1>
            <h1 className="font-bold">A group chat where anyone can post a comment, an others in the mentor group can respond</h1>
            <h1>FIX going from trainees journals -> Journal page causes an error</h1>
            <h1>FIx comments overflow. Very inconsistent, sometimes with scroll, sometimes goes on new line.</h1>
            <h1>Adding a comment will require a rerender? Need a way to visualize it straight away. The button click will also dispatch a reducer inside the singleComment that will change the state inside of it.</h1>
            <h1>Clear should also clear trainee tags</h1>
            <h1>Filter journals based on average / specific scalar / tag / dates </h1>
            <h1>Ask Mentor && Questions Active/Answered</h1>
        </div>
    </div>
}