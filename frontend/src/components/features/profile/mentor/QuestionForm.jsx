import { useState } from "react"
import { useDispatch } from "react-redux";
import { askQuestion } from "../../../../store/mentor";

export default function QuestionForm(props) {

    const [description, setDescription] = useState("");
    const [type, setType] = useState("general");
    const [question, setQuestion] = useState("");
    const [anonymous, setAnonymous] = useState(false);

    const dispatch = useDispatch();

    function handleQuestionAsk(e) {
        e.preventDefault()
        dispatch(askQuestion({ description, question, anonymous, question_type: type }))
        props.setShowForm(false)
    }

    return <form className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
            <label htmlFor="description">Description:</label>
            <input
                id="description"
                className="shadow rounded border border-gray-100 hover:bg-gray-200 w-96"
                onChange={e => setDescription(e.target.value)}
                type="text"
            ></input>
        </div>
        <div className="flex flex-col items-center gap-2">
            <label htmlFor="type">Type</label>
            <select
                className="shadow rounded border border-gray-100 hover:bg-gray-200"
                id="type"
                onChange={e => setType(e.target.value)}
            >
                <option value='general'>general</option>
                <option value='risk management'>risk management</option>
                <option value='emotional management'>emotional management</option>
                <option value='strategy'>strategy</option>
                <option value='research'>research</option>
                <option value='discipline'>discipline</option>
            </select>
        </div>
        <div className="flex flex-col items-center gap-2">
            <label htmlFor="question">Question:</label>
            <textarea
                id="question"
                className="shadow rounded border border-gray-100 hover:bg-gray-200 h-48 w-96 max-h-48"
                onChange={e => setQuestion(e.target.value)}
            ></textarea>
        </div>
        <div className="flex justify-around">
            <div className="flex gap-2">
                <label htmlFor="anonymous">Anonymous?</label>
                <input
                    type="checkbox"
                    id="anonymous"
                    checked={anonymous}
                    onChange={() => setAnonymous(prev => !prev)}
                />
            </div>
            <button
                disabled={!(description && question)}
                onClick={handleQuestionAsk}
                className="bg-green-200 px-4 rounded transform hover:scale-105 hover:bg-green-300 disabled:scale-100 disabled:bg-gray-200 disabled:text-sm"
            >Ask</button>
            <button
                className="bg-red-200 px-2 rounded transform hover:scale-105 hover:bg-red-300"
                onClick={e => {
                    e.preventDefault()
                    props.setShowForm(false);
                }}
            >Close</button>
        </div>
    </form>
}