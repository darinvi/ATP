import { loadPersonalJournals, loadTraineesJournals } from "../../../../store/journal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearJournalList } from "../../../../store/journal";
import { loadTraineesTags } from "../../../../store/journal";

export default function SelectJournalOwner(props) {
    const dispatch = useDispatch();
    const [journalOwner, setJournalOwner] = useState('Personal');
    const mentorStatus = useSelector(state => state.auth.mentor)

    function handleJournalClick() {
        if (journalOwner === 'Personal') {
            dispatch(loadPersonalJournals());
            props.setLastCallType('Personal');
        } else if (journalOwner === 'Trainees') {
            dispatch(loadTraineesJournals());
            props.setLastCallType('Trainees');
            dispatch(loadTraineesTags(props.trainees));
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
            {props.hasJournals
                &&
                <>
                    <button 
                        className="shadow bg-red-200 rounded px-2 transform hover:scale-105"
                        onClick={()=>{dispatch(clearJournalList())}}
                    >Clear</button>
                    <button 
                        className="shadow bg-yellow-100 rounded px-2 transform hover:scale-105"
                    >Sync P&L</button>
                </>
            }
        </div>
    }

    return getJournalSelect();
}