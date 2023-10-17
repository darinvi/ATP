import { useSelector } from "react-redux"
import SingleJournal from "./SingleJournal";
import SelectJournalOwner from "./SelectJournalOwner";
import { useState } from "react";

export default function ListJournals() {
    const journals = useSelector(state => state.entities.journal.currentJournals)
    const loading = useSelector(state => state.entities.journal.loading)
    const requested = useSelector(state => state.entities.journal.requested)
    const trainees = useSelector(state => state.auth.trainees)
    const tags = useSelector(state => state.entities.journal.tags)

    const [lastCallType, setLastCallType] = useState(null)

    const trainees_pks = trainees && trainees.map(e => e.id)


    const renderJournals = (journals && !loading && tags) ?
        journals.map(journal => {
            const trainee = lastCallType === 'Trainees' ? trainees.find(t => t.id === journal.user) : null
            const tagNames = journal.tags.length > 0 ? getTags(tags.tags, journal.tags) : null
            return <SingleJournal
                journal={journal}
                trainee={trainee}
                tags={tagNames}
                type={lastCallType}
            />
        }) :
        <p className={requested ? "" : "hidden"}>Loading...</p>


    function getTags(_tags, journal_tags) {
        let tagNames = []
        for (let t of _tags) {
            if (journal_tags.includes(t.id)) {
                tagNames.push(t.name)
            }
        }
        return tagNames
    }


    return <div className="flex flex-col gap-12">
        <p>If no date range specified, show the most recent journal (for each trainee if "TraineesO)</p>
        <SelectJournalOwner setLastCallType={setLastCallType} hasJournals={journals !== null} trainees={trainees_pks} />
        <div className="flex flex-col overflow-y-auto h-96">
            {renderJournals}
        </div>
    </div>
}