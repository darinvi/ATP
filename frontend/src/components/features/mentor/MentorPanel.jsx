import { useSelector, useDispatch } from "react-redux"
import ListQuestions from "./ListQuestions"
import { useEffect } from "react";

export default function MentorPanel(){

    const isMentor = useSelector(state => state.auth.mentor);
    const dispatch = useDispatch();

    useEffect(()=>{})

    function mentorPanel() {
        return <div className="flex flex-col gap-6 w-full">
            <ListQuestions />
        </div> 
    }

    return isMentor ? mentorPanel() : <p>Not A Mentor</p>
}