import { useDispatch, useSelector } from "react-redux"
import { loadTags } from "../../../store/journal";
import { selectTag, removeTag } from "../../../store/playbooks";
import { useEffect, useState } from "react";
import DisplayTags from "./DisplayTags";

export default function FormTagSelect() {

    const dispatch = useDispatch();
    const tags = useSelector(state => state.entities.journal.tags);
    const selectedTags = useSelector(state => state.entities.playbooks.selectedTags);

    const [tagChosen, setTagChosen] = useState("");

    useEffect(() => {
        if (!tags) {
            dispatch(loadTags())
        }
    }, [])

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
                <select
                    onChange={e => setTagChosen(tags.find(t => t.id == e.target.value))}
                    className="bg-gray-200 border rounded hover:bg-gray-300 border border-gray-600"
                >
                    <option disabled={tagChosen}>---choose tag---</option>
                    {tags && tags.map(tag => {
                        return (
                            <option 
                                disabled={Object.values(selectedTags).includes(tag.name)}
                                value={tag.id}
                                className="disabled:hidden"
                            >{tag.name}</option>

                        )
                    })}
                </select>
                <button
                    disabled={!tagChosen}
                    className="bg-green-200 hover:bg-green-300 transform hover:scale-105 active:scale-100 rounded px-2 border border-green-500 disabled:bg-gray-100 disabled:scale-100 disabled:border-gray-300"
                    onClick={(e)=>{
                        e.preventDefault();
                        dispatch(selectTag(tagChosen));
                    }}
                >Add Tag</button>
            </div>
            <DisplayTags />
            <p>IF ALL VARS ARE EMPTY, SUBMIT IS STILL ACTIVE</p>
            <p>NOT RESETING FORM</p>
        </div>
    )
}