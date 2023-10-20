import { useState } from "react"
import { useDispatch } from "react-redux";
import { answerQuestion } from "../../../store/mentor";

export default function SingleQuestion(props) {

    const [showInput, setShowInput] = useState(false);
    const [answer, setAnswer] = useState("");
    
    const dispatch = useDispatch();
    
    const q = props.data

    function handleAnswerButton(){
        setAnswer("");
        setShowInput(false);
        dispatch(answerQuestion(q.id, answer))
    }

    return <div
        className="bg-gray-200 px-4 py-2 w-full rounded-2xl hover:bg-gray-300 hover:rounded"
    >
        <div
            className="flex flex-col gap-2"
            onClick={() => setShowInput(prev => !prev)}
        >
            <p className="text-lg font-medium mx-auto">{q.username}</p>
            <div className="mx-auto flex gap-36">
                <p>Type: {q.question_type}</p>
                <p>Description: {q.description}</p>
            </div>
            <p className="text-lg break-words">{q.question}</p>
        </div>
        <div className={`w-full ${showInput ? "" : "hidden"} flex items-center gap-4 mt-4`}>
            <textarea
                className="w-full h-24"
                onChange={e => setAnswer(e.target.value)}
                value={answer}
            ></textarea>
            <div className="flex flex-col gap-2">
                <button
                    disabled={!answer}
                    className="bg-green-200 px-4 py-2 rounded transform hover:scale-105 hover:bg-green-300 disabled:scale-100 disabled:bg-gray-200"
                    onClick={handleAnswerButton}
                >Answer</button>
                <button
                    disabled={!answer}
                    className="bg-red-200 px-6 py-2 rounded transform hover:scale-105 hover:bg-red-300 disabled:scale-100 disabled:bg-gray-200"
                    onClick={()=>setAnswer("")}
                >Clear</button>
            </div>

        </div>
    </div>
}