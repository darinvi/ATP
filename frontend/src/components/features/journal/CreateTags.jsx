import { useState } from "react"
import { useDispatch } from "react-redux";
import { createTag } from "../../../store/journal";

export default function CreateTags() {

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();

    function handleSubmitForm(e) {
        e.preventDefault()
        setShowForm(false)
        dispatch(createTag(name, description));
        setName("");
        setDescription("");
    }

    return <div className="flex items-center gap-4">
        {
            showForm ?
            <>
                <form className="flex gap-12 items-center" onSubmit={handleSubmitForm}>
                    <div className="flex gap-4">
                        <label htmlFor="tag">Tag Name:</label>
                        <input
                            value={name}
                            id="tag"
                            className="shadow"
                            placeholder="Name for the tag"
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>

                    <div className="flex gap-4">
                        <label htmlFor="description">Description:</label>
                        <input
                            value={description}
                            id="description"
                            className="shadow"
                            placeholder="What the tag measures"
                            onChange={(e) => setDescription(e.target.value)}
                        ></input>
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 px-4 h-8 transform hover:scale-110 disabled:bg-gray-500 disabled:scale-90 rounded"
                        disabled={!(name && description)}
                    >Create</button>
                </form>
                <button 
                    className="bg-red-500 px-4 h-8 transform hover:scale-110 rounded"
                    onClick={()=>setShowForm(false)}
                >Close</button>
            </>
            :
        
            <button
                onClick={() => setShowForm(true)}
                className="bg-green-500 px-4 h-8 transform hover:scale-110 rounded"
            >Create Tag</button>
        }
    </div>
}