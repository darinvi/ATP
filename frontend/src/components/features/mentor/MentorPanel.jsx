import { useSelector, useDispatch } from "react-redux"
import ListQuestions from "./ListQuestions"

export default function MentorPanel(){

    const isMentor = useSelector(state => state.auth.mentor)

    function mentorPanel() {
        return <div>
            <h1>Mentor</h1>
            <ListQuestions />
        </div> 
    }

    return isMentor ? mentorPanel() : <p>Not A Mentor</p>
}