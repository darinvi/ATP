import QuestionForm from "./QuestionForm";
import ListQuestions from "./ListQuestions";
import { useState } from "react";

export default function AskMentor() {

    const [showForm, setShowForm] = useState(false);
    const [showQuestions, setShowQuestions] = useState(true);

    function handleButtonClick() {
        setShowForm(true);
    }



    return <div>
        {
            !showForm
                ?
                <div className="flex gap-6">
                    <button
                        className="bg-orange-200 px-2 rounded transform hover:scale-105 hover:bg-orange-300"
                        onClick={handleButtonClick}
                    >Ask Mentor</button>
                    <button
                        className="bg-cyan-200 px-2 rounded transform hover:scale-105 hover:bg-cyan-300"
                        onClick={()=>setShowQuestions(true)}
                    >My Questions</button>
                </div>
                :
                <QuestionForm setShowForm={setShowForm} />
        }
        { showQuestions && <ListQuestions setShowQuestions={setShowQuestions} /> }
    </div>
}