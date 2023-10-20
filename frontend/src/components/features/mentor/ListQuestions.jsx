import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUnansweredQuestions } from "../../../store/mentor"
import SingleQuestion from "./SingleQuestion";

export default function ListQuestions(){
    
    const dispatch = useDispatch();
    const questions = useSelector(state => state.entities.mentor.unanswered)

    useEffect(()=>{
        dispatch(getUnansweredQuestions())
    },[])

    const renderQuestions = questions.map( e => <SingleQuestion data={e} />)

    return <div className="flex flex-col gap-4 items-center m-4">
        {renderQuestions}
    </div>
}