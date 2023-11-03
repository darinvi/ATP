import { useState } from "react"
import { deleteAnsweredQuestion } from "../../../../store/mentor";
import { useDispatch } from "react-redux";

export default function SinglePersonalQuestion(props) {

    const [hidden, setHidden] = useState(true);

    const question = props.data
    const numAnswers = question.answers.length

    const dispatch = useDispatch();

    const renderAnswers = question.answers.map(a => {
        return <p className="break-words border-b border-gray-400"><span className="font-medium">{a.username}:</span> {a.answer}</p>
    })

    return <div className="bg-gray-200 w-96 rounded-lg hover:rounded-none hover:bg-gray-300 break-words flex flex-col gap-4">
        
        <div
            className="w-full px-6 py-2"
            onClick={() => setHidden(prev => !prev)}
        >
            
            <div className="flex justify-around">
                <p className="break-words"><span className="font-medium">Description:</span> {question.description}</p>
                <p className={numAnswers >= 2 ? "text-green-700" : "text-red-700"}>({numAnswers} Answers)</p>
            </div>
            
            <div className={`flex flex-col gap-2 mt-4 ${hidden ? "hidden" : ""}`}>
                <p className="mx-auto font-medium">Question:</p>
                <p>{question.question}</p>
                <p className="mx-auto font-medium">Comments:</p>
                {renderAnswers}
            </div>
            
        </div>
        {<button
            className={`${hidden ? "hidden" : ""} mx-auto bg-red-200 rounded px-2 transform hover:scale-105 hover:bg-red-300`}
            onClick={()=>{
                dispatch(deleteAnsweredQuestion(question.id));
            }}
        >Mark As Read</button>}
        {/* {question.answered && <button
            className={`${hidden ? "hidden" : ""} mx-auto bg-red-200 rounded px-2 transform hover:scale-105 hover:bg-red-300`}
            onClick={()=>{
                dispatch(deleteAnsweredQuestion(question.id));
            }}
        >Mark As Read</button>} */}
    </div>
}