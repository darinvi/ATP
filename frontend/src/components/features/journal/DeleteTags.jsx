import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTag } from "../../../store/journal";

export default function DeleteTags() {

    const [showForm, setShowForm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const tags = useSelector(state => state.entities.journal.tags)
    const dispatch = useDispatch();


    function handleTagDelete() {
        dispatch(deleteTag(deleteId))
    }

    return <div>
        {

            showForm
                ?
                <div className="flex gap-4">
                    <select 
                        onChange={(e)=>setDeleteId(e.target.value)}
                        className="shadow bg-gray-100"
                    >
                        {
                            tags && tags.map(tag => {
                                return <option key={tag.id} value={tag.id}>{tag.name}</option>
                            })
                        }
                    </select>
                    
                    <button
                        disabled={!deleteId}
                        className="bg-red-500 px-4 h-8 transform hover:scale-110 rounded"
                        onClick={handleTagDelete}
                    >Delete</button>
                    
                    <button
                        onClick={()=>setShowForm(false)}
                        className="bg-red-500 px-4 h-8 transform hover:scale-110 rounded"
                    >Close</button>
                </div>
                :
                <button 
                    onClick={()=>setShowForm(true)}
                    className="bg-red-500 px-4 h-8 transform hover:scale-110 rounded"
                >Delete Tag</button>
        }

    </div>

}