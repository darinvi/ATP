import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadTags } from "../../../store/journal"
import CreateTags from "./CreateTags";

export default function JournalForm() {

    const [selectedTags, setSelectedTags] = useState({});
    const [currentTag, setCurrentTag] = useState();
    const [patience, setPatience] = useState();
    const [discipline, setDiscipline] = useState();
    const [preparation, setPreparation] = useState();
    const [riskManagement, setRiskManagement] = useState();
    const [emotionalManagement, setEmotionalManagement] = useState();

    const tags = useSelector(state => state.entities.journal.tags);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTags());
    }, [])

    const renderTags = tags && tags.map(tag => {
        // if tag.id
        return <option value={[tag.name, tag.id]}>{tag.name}</option>
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

    function createChoiceSelect(labelName, setVal) {
        return <div>
            <label htmlFor={`${labelName}`}>{labelName}</label>
            <select
                id={`${labelName}`} 
                onChange={(e)=>setVal(e.target.value)}>{[1,2,3,4,5].map((num)=>{
                   return <option key={num} value={num}>{num}</option> 
            })}</select>
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
    return <div className="mx-auto">
        <form>
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

            <div className="flex flex-col gap-4">
                {createChoiceSelect('patience', setPatience)}
                {createChoiceSelect('discipline', setDiscipline)}
                {createChoiceSelect('preparation', setPreparation)}
                {createChoiceSelect('risk management', setRiskManagement)}
                {createChoiceSelect('emotional management', setEmotionalManagement)}
            </div>
        </form>
    </div>

}