import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadTags } from "../../../store/journal"

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
        dispatch(loadTags());
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


    function createChoiceSelect(labelName, setVal) {
        return <div className="flex gap-2">
            <label htmlFor={`${labelName}`}>{labelName}</label>
            <select
                id={`${labelName}`}
                onChange={(e) => setVal(e.target.value)}
                className="shadow bg-gray-100 hover:bg-gray-200"
            >
                {[1, 2, 3, 4, 5].map((num) => {
                    return <option
                        key={num}
                        value={num}
                    >{num}</option>
                })}
            </select>
        </div>
    }

    const listSelectedTags = selectedTags && Object.entries(selectedTags).map(([k, v]) => {
        return <p
            key={v}
            className="bg-blue-300 px-4 tranform hover:scale-90 hover:bg-red-300"
            onClick={() => handleTagClick(v)}
        >{k}</p>
    })


    // Form will have add comment, on add button click the comment will be saved to state. 
    // On form submit comments will be sent to th   e DailyJournalViewset and the perform_create will
    // Loop over the comments, in each iteration saving the comment and adding it to the comments field of the daily Journal
    return <>
        <form className="flex flex-col items-center">
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
                    className="bg-green-300 px-4 h-8 transform hover:scale-110 disabled:scale-100 disabled:bg-gray-100"
                >Add</button>
            </div>

            {listSelectedTags &&
                <div className="flex items-center gap-4">
                    <p>Tags:</p>
                    {listSelectedTags}
                </div>
            }

            <div className="flex gap-8 my-12">
                {createChoiceSelect('patience', setPatience)}
                {createChoiceSelect('discipline', setDiscipline)}
                {createChoiceSelect('preparation', setPreparation)}
                {createChoiceSelect('risk management', setRiskManagement)}
                {createChoiceSelect('emotional management', setEmotionalManagement)}
            </div>

            <div className="flex flex-col items-center">

                <div className="flex items-center gap-2">
                    <input 
                        className="w-96 shadow bg-gray-100" 
                        onChange={(e) => { setCurrentComment(e.target.value) }}
                        value={currentComment}
                    ></input>

                    <button
                        disabled={currentComment===""}
                        className="bg-gray-200 transform hover:scale-105 px-4 hover:bg-gray-300 disabled:scale-100 disabled:bg-gray-100"
                        onClick={handleCommentCreate}
                    >Add Comment</button>
                </div>

                {comments != {} &&
                    <div>
                        <p>Comments:</p>
                        {Object.entries(comments).map(([k, v]) => {
                            return <div className="flex gap-4">
                                <div>{v}</div>
                                <button 
                                    onClick={e => handleCommentDelete(e, k)}
                                    className="disabled: "
                                >Delete</button>
                            </div>
                        })}
                    </div>
                }

            </div>
        </form>
    </>

}