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
                <div className="flex flex-col gap-6 items-center">
                    <button
                        className="bg-orange-200 px-2 rounded transform hover:scale-105 hover:bg-orange-300 w-36"
                        onClick={handleButtonClick}
                    >Ask Mentor</button>
                    <ListQuestions />
                </div>
                :
                <QuestionForm setShowForm={setShowForm} />
        }
    </div>
}