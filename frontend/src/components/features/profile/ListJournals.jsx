import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { loadPersonalJournals, loadTraineesJournals } from "../../../store/journal";

export default function ListJournals() {

    const dispatch = useDispatch();
    const mentorStatus = useSelector(state => state.auth.mentor)
    const trainees = useSelector(state => state.auth.trainees)

    const [journalOwner, setJournalOwner] = useState('Personal');

    function handleJournalClick() {
        if (journalOwner === 'Personal'){
            dispatch(loadPersonalJournals());
        } else if (journalOwner === 'Trainees') {
            dispatch(loadTraineesJournals(trainees))
        }
    }

    function getJournalSelect() {
        return <div className="flex gap-4">
            {mentorStatus && <select 
                className="bg-gray-100 border border-gray-300 shadow rounded transform hover:bg-gray-200"
                onChange={e => setJournalOwner(e.target.value)}
            >
                <option value="Personal">Personal</option>
                <option value="Trainees">Trainees</option>
            </select>}
            <button 
                className="bg-green-300 px-4 rounded transform hover:scale-105"                
                onClick={handleJournalClick}
            >Get Journals</button>
        </div>
    }

    return <div>
        {getJournalSelect()}
    </div>
}