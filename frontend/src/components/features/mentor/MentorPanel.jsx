import { useSelector } from "react-redux"

export default function MentorPanel(){

    const isMentor = useSelector(state => state.auth.mentor)

    function mentorPanel() {
        return <h1>Mentor</h1>
    }

    return isMentor ? mentorPanel() : <p>Not A Mentor</p>
}