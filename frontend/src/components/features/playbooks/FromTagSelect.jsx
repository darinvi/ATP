import { useDispatch, useSelector } from "react-redux"
import { loadTags } from "../../../store/journal";
import { selectTag } from "../../../store/playbooks";
import { useEffect, useState } from "react";

export default function FormTagSelect() {

    const dispatch = useDispatch();
    const tags = useSelector(state => state.entities.journal.tags)

    const [tagChosen, setTagChosen] = useState("");

    useEffect(() => {
        if (!tags) {
            dispatch(loadTags())
        }
    }, [])

    return (
        <div className="flex gap-2">
            <select
                onChange={e => setTagChosen(e.target.value)}
                className="bg-gray-200 border rounded hover:bg-gray-300 border border-gray-600"
            >
                <option disabled={tagChosen}>---choose tag---</option>
                {tags && tags.map(tag => {
                    return <option>{tag.name}</option>
                })}
            </select>
            <button
                disabled={!tagChosen}
                className="bg-green-200 hover:bg-green-300 transform hover:scale-105 active:scale-100 rounded px-2 border border-green-500 disabled:bg-gray-100 disabled:scale-100 disabled:border-gray-300"
                onClick={()=>{
                    dispatch(selectTag())
                }}
            >Add Tag</button>
        </div>
    )
}