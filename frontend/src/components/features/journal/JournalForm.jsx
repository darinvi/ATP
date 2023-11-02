import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import journal, { loadTags, submitDailyJournal } from "../../../store/journal"

// very poorly written chunk of code, first form I wrote in the project, can't reuse components now.
export default function JournalForm() {

    const [selectedTags, setSelectedTags] = useState({});
    const [currentTag, setCurrentTag] = useState();
    const [commentCounter, setCommentCounter] = useState(0);
    const [comments, setComments] = useState({});
    const [currentComment, setCurrentComment] = useState("");

    const [patience, setPatience] = useState(null);
    const [discipline, setDiscipline] = useState(null);
    const [preparation, setPreparation] = useState(null);
    const [riskManagement, setRiskManagement] = useState(null);
    const [emotionalManagement, setEmotionalManagement] = useState(null);

    const tags = useSelector(state => state.entities.journal.tags);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!tags) {
            dispatch(loadTags());
        }
    }, [])

    const renderTags = tags && tags.map(tag => {
        return <option key={tag.id} value={[tag.name, tag.id]}>{tag.name}</option>
    })

    function handleTagAdd(e) {
        e.preventDefault()
        const [tagName, id] = currentTag.split(',')
        setSelectedTags({ ...selectedTags, [tagName]: id })
        console.log(selectedTags)
    }

    function handleTagClick(val) {
        const newTags = Object.fromEntries(
            Object.entries(selectedTags).filter(([k, v]) => v !== val)
        );
        setSelectedTags(newTags);
    }

    function handleCommentCreate(e) {
        e.preventDefault();
        const currentCounter = commentCounter;
        setComments({ ...comments, [currentCounter]: currentComment })
        setCommentCounter(prev => prev + 1)
        setCurrentComment("")
    }

    function handleCommentDelete(e, key) {
        e.preventDefault()
        let neweComments = {}
        for (let [k, v] of Object.entries(comments)) if (k != key) neweComments[k] = v
        setComments({ ...neweComments })
    }

    function handleCommentEdit(e, k) {
        setCurrentComment(comments[k])
        handleCommentDelete(e, k)
    }

    const renderNumbers = [1, 2, 3, 4, 5].map((num) => {
        return <option>{num}</option>
    })

    // ABSOLUTELY DISCUSTING CODE. THIS IS THE QUICK FIX FOR THE PROBLEM I HADE, I HAVE TO FIX IT LATER
    function createChoiceSelect() {
        return <div className="flex gap-8">
            <div className="flex gap-2">
                <label htmlFor="patience">patience</label>
                <select
                    id="patience"
                    onChange={(e) => setPatience(e.target.value)}
                    className="shadow bg-gray-100 hover:bg-gray-200"
                >
                    <option disabled={patience}>N/A</option>
                    {renderNumbers}
                </select>
            </div>
            <div className="flex gap-2">
                <label htmlFor="discipline">discipline</label>
                <select
                    id="discipline"
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="shadow bg-gray-100 hover:bg-gray-200"
                >
                    <option disabled={discipline}>N/A</option>
                    {renderNumbers}
                </select>
            </div>
            <div className="flex gap-2">
                <label htmlFor="preparation">preparation</label>
                <select
                    id="preparation"
                    onChange={(e) => setPreparation(e.target.value)}
                    className="shadow bg-gray-100 hover:bg-gray-200"
                >
                    <option disabled={preparation}>N/A</option>
                    {renderNumbers}
                </select>
            </div>
            <div className="flex gap-2">
                <label htmlFor="risk-management">risk management</label>
                <select
                    id="risk-management"
                    onChange={(e) => setRiskManagement(e.target.value)}
                    className="shadow bg-gray-100 hover:bg-gray-200"
                >
                    <option disabled={riskManagement}>N/A</option>
                    {renderNumbers}
                </select>
            </div>
            <div className="flex gap-2">
                <label htmlFor="emotional-management">emotional management</label>
                <select
                    id="emotional-management"
                    onChange={(e) => setEmotionalManagement(e.target.value)}
                    className="shadow bg-gray-100 hover:bg-gray-200"
                >
                    <option disabled={emotionalManagement}>N/A</option>
                    {renderNumbers}
                </select>
            </div>
        </div>
    }

    const listSelectedTags = selectedTags && Object.entries(selectedTags).map(([k, v]) => {
        return <p
            key={v}
            className="bg-blue-300 px-4 tranform hover:scale-90 hover:bg-red-300 rounded"
            onClick={() => handleTagClick(v)}
        >{k}</p>
    })

    function handleFormSubmit(e) {
        e.preventDefault()
        const journal = {
            patience: parseInt(patience),
            discipline: parseInt(discipline),
            preparation: parseInt(preparation),
            risk_management: parseInt(riskManagement),
            emotional_management: parseInt(emotionalManagement),
            comments: Object.values(comments),
            tags: Object.values(selectedTags).map(Number)
        }
        dispatch(submitDailyJournal(journal))
        // console.log(journal)
        setPatience(null)
        setDiscipline(null)
        setPreparation(null)
        setRiskManagement(null)
        setEmotionalManagement(null)
        setCurrentComment("")
        setComments({})
        setSelectedTags({})
    }

    // ToDo: check whether daily report already created.
    return <>
        <h1>SUBMITING DOES NOT RESET THE FORM</h1>
        <form className="flex flex-col items-center" onSubmit={handleFormSubmit}>
            <div className="flex items-center h-12 gap-4">
                <label htmlFor="tags-select">Select tags: </label>
                <select
                    id='tags-select'
                    className="w-36 shadow bg-gray-100 hover:bg-gray-200"
                    onChange={(e) => setCurrentTag(e.target.value)}
                >
                    <option
                        value=""
                        disabled={currentTag}
                    >Select a Tag</option>
                    {renderTags}
                </select>

                <button
                    onClick={handleTagAdd}
                    disabled={!currentTag}
                    className="bg-green-300 px-4 h-8 transform hover:scale-110 disabled:scale-100 disabled:bg-gray-100 rounded"
                >Add</button>
            </div>

            {listSelectedTags &&
                <div className="flex items-center gap-4">
                    <p className="text-2xl">Tags:</p>
                    {listSelectedTags}
                </div>
            }

            <div className="flex gap-8 my-12">
                {createChoiceSelect()}
            </div>

            <div className="flex flex-col items-center">

                <div className="flex items-center gap-2">
                    <input
                        className="w-96 shadow bg-gray-100"
                        onChange={(e) => { setCurrentComment(e.target.value) }}
                        value={currentComment}
                    ></input>

                    <button
                        disabled={currentComment === ""}
                        className="bg-green-300 transform hover:scale-105 px-4 hover:bg-gray-300 disabled:scale-100 disabled:bg-gray-100 rounded"
                        onClick={handleCommentCreate}
                    >Add Comment</button>
                </div>

                {comments != {} &&
                    <div className="flex flex-col gap-4 items-center">
                        <p className="text-2xl">Comments:</p>
                        {Object.entries(comments).map(([k, v]) => {
                            return <div className="flex gap-4">
                                <p className="break-words w-96">{v}</p>
                                <button
                                    onClick={e => handleCommentEdit(e, k)}
                                    className="rounded bg-yellow-200 px-2 text-xs hover:text-sm max-h-8"
                                >edit</button>
                                <button
                                    onClick={e => handleCommentDelete(e, k)}
                                    className="rounded bg-red-200 px-2 text-xs hover:text-sm max-h-8"
                                >Delete</button>
                            </div>
                        })}
                    </div>
                }

            </div>
            <button
                type="submit"
                className="mt-12 bg-blue-300 rounded px-4 transform hover:scale-105 rounded disabled:scale-100 disabled:bg-gray-100"
                disabled={!(patience && discipline && preparation && riskManagement && emotionalManagement)}
            >Submit Daily Journal</button>
        </form>
    </>

}