import { useState } from "react"
import JournalComment from "./JournalComment"
import { useDispatch } from "react-redux"
import { addCommentToTraineeJournal } from "../../../../store/journal"

export default function SingleJournal(props) {
    const [journal, setJournal] = useState(props.journal);
    const trainee = props.trainee;
    const tags = props.tags;
    // const type = props.type;

    const dispatch = useDispatch();

    const [hidden, setHidden] = useState(true);
    const [mentorComment, setMentorComment] = useState("");

    const renderScalar = Object.entries(journal).map(j => {
        const [k, v] = j
        if (!['id', 'user', 'tags', 'comments'].includes(k)) {
            return <div className='flex flex-col items-center'><p>{k}:</p>
                <p>{v}</p>
            </div>
        }
    })

    const renderComments = journal.comments.length > 0 ? journal.comments.map(c => {
        return <JournalComment comment={c} />
    }) : <p>N/A</p>

    const renderTags = tags ? tags.map(t => {
        return <p className="bg-cyan-200 rounded px-2">{t}</p>
    }) : <p>N/A</p>

    function handleCommentAdd() {
        dispatch(addCommentToTraineeJournal(mentorComment, journal.id))
    }

    return <div className={`shadow p-2 hover:bg-gray-100 ${hidden ? "" : "bg-gray-200"} p-2`}>

        <div
            className={`flex flex-col`}
            onClick={() => setHidden(prev => !prev)}
        >

            <div className="flex flex-col">
                <div className="flex justify-around">
                    <p className="text-lg mb-2 font-medium">{trainee.username}</p>
                    <p className="text-lg mb-2 font-medium">Date:</p>
                </div>
                <div
                    className="flex text-sm gap-4"
                >
                    {renderScalar}
                    <p>Average: </p>
                </div>
            </div>

            <div className={`flex flex-col gap-4 mt-2 ${hidden ? "hidden" : ""}`}>
                <div className="flex flex-col gap-2">
                    <p className="mx-auto text-lg font-medium">Comments:</p>
                    {renderComments}
                </div>

                <div className="flex flex-col gap-2">
                    <p className="mx-auto text-lg font-medium">Tags:</p>
                    <div className="flex gap-4">
                        {renderTags}
                    </div>
                </div>

            </div>
        </div>


        <div className={`flex gap-4 ${hidden ? "hidden" : ""} mt-6`}>
            <label
                htmlFor="add-coment"
                className="text-lg font-medium"
            >Add Comment:</label>
            <input
                id="add-comment"
                className="rounded"
                onChange={e => setMentorComment(e.target.value)}
                value={mentorComment}
            ></input>
            <button
                disabled={!mentorComment}
                onClick={handleCommentAdd}
                className="rounded bg-green-200 transform hover:scale-105 hover:bg-green-300 px-2 disabled:scale-100 disabled:bg-gray-200"
            >Add</button>
        </div>
    </div>
}