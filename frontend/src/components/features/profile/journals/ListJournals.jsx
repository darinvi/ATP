import { useSelector } from "react-redux"
import SingleJournal from "./SingleJournal";
import SelectJournalOwner from "./SelectJournalOwner";
import { useState } from "react";

export default function ListJournals() {
    const journals = useSelector(state => state.entities.journal.currentJournals)
    const loading = useSelector(state => state.entities.journal.loading)
    const requested = useSelector(state => state.entities.journal.requested)
    const trainees = useSelector(state => state.auth.trainees)

    const [lastCallType, setLastCallType] = useState(null)

    const trainees_pks = trainees && trainees.map( e => e.id)

    const renderJournals = (journals && !loading) ?
        journals.map(journal => {
            const trainee = lastCallType === 'Trainees' ? trainees.find( t => t.id === journal.user) : null
            return <SingleJournal journal={journal} trainee={trainee} />
        }) :
        <p className={requested ? "" : "hidden"}>Loading...</p>

    return <div className="flex flex-col gap-2">
        <SelectJournalOwner setLastCallType={setLastCallType} hasJournals={journals !== null} trainees={trainees_pks} />
        {renderJournals}
    </div>
}