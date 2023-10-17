import { useState } from "react"

export default function SingleJournal(props) {
    const journal = props.journal
    const trainee = props.trainee

    const [hidden, setHidden] = useState(true);

    const renderScalar = Object.entries(journal).map( j => {
        const [k, v] = j
        if (!['id', 'user', 'tags', 'comments'].includes(k)) {
            return <p>{k}: {v}</p>
        }
    })

    // const scalarTotal = // Total of all journals

    const renderComments = journal.comments.lemght > 0 ? journal.comments.map( c => {
        return <p>{c.comment}</p>
    }) : <p>N/A</p>

    return <div className="shadow p-2" >
        <div 
            className="flex text-sm gap-2" 
            onMouseEnter={()=> setHidden(false)} 
            onMouseLeave={()=> setHidden(true)}
        >{renderScalar}</div>
        <div className={hidden ? "hidden" : ""}>
            <div className="flex flex-col gap-2">
                <p className="mx-auto">Comments:</p>
                {renderComments}
            </div>
        </div>
        <div className={hidden ? "hidden" : ""}>
            <div className="flex flex-col gap-2">
                <p className="mx-auto">Tags:</p>
                {renderComments}
            </div>
        </div>
    </div>
}