import { useDispatch, useSelector } from "react-redux"
import { getPersonalQuestions } from "../../../../store/mentor"
import SinglePersonalQuestion from "./SinglePersonalQuestion";

export default function ListQuestions() {

    const dispatch = useDispatch();
    const questions = useSelector(state => state.entities.mentor.personal)

    return <div className="flex flex-col gap-4 items-center">
        <button
            className="bg-cyan-200 px-2 rounded transform hover:scale-105 hover:bg-cyan-300 w-36"
            onClick={() => dispatch(getPersonalQuestions())}
        >My Questions</button>
        { questions && questions.map(q => <SinglePersonalQuestion data={q} />)}
    </div>
}