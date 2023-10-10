import { useEffect, useState } from "react"

export default function CreateTags() {

    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState('Create Tag');

    function handleShowFormClick() {
        setShowForm(prevShowForm => {
            const updatedShowForm = !prevShowForm;
            if (updatedShowForm) {
                setMessage('Close');
            } else {
                setMessage('Create Tag');
            }
            return updatedShowForm;
        });
    }

    function handleSubmitForm(e) {
        e.preventDefault()
    }

    return <div className="flex items-center mt-4 mx-auto gap-4">
        {
            showForm &&
            <form className="flex gap-12" onSubmit={handleSubmitForm}>
                <div className="flex gap-4">
                    <label htmlFor="tag">Tag Name:</label>
                    <input
                        id="tag"
                        className="shadow"
                    ></input>
                </div>

                <div className="flex gap-4">
                    <label htmlFor="description">Description:</label>
                    <input 
                        id="description"
                        className="shadow"
                    ></input>
                </div>

                <button 
                    type="submit"
                    className="bg-green-500 h-8 px-4 transform hover:scale-110"    
                >Create</button>
            </form>
        }
        <button
            onClick={handleShowFormClick}
            className={`${showForm ? 'bg-red-500' : 'bg-green-500'} px-4 h-8 transform hover:scale-110`}
        >{message}</button>
    </div>
}