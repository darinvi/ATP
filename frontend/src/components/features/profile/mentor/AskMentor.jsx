import QuestionForm from "./QuestionForm";
import { useState } from "react";

export default function AskMentor() {

    const [showForm, setShowForm] = useState(false);

    function handleButtonClick() {
        setShowForm(true);
    }



    return <div>
        {
            !showForm
                ?
                <button
                    className="bg-orange-200 px-2 rounded transform hover:scale-105 hover:bg-orange-300"
                    onClick={handleButtonClick}
                >Ask Mentor</button>
                :
                <QuestionForm setShowForm={setShowForm} />
        }
    </div>
}