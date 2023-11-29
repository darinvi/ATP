import { useSelector, useDispatch } from "react-redux"
import { deletePBComment } from "../../../../../../../store/home";
import EditableComment from "./EditableComment";
import { useState } from "react";

export default function SinglePlaybookComment({ comment }) {

    const user = useSelector(state => state.auth.user.username);
    const deleteId = useSelector(state => state.entities.home.playbooks.deletingId);
    const editId = useSelector(state => state.entities.home.playbooks.editingId);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [delActive, setDelActive] = useState(false);

    function getTime() {
        const date = new Date(comment.time * 1000)
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    return (
        <div className={`border-y border-cyan-700 flex flex-col gap-1 pb-1 ${[deleteId, editId].includes(comment._id) && "bg-cyan-700"} text-white`}>
            <div className="text-xs flex gap-2 w-fit px-2 rounded-br text-gray-300 bg-cyan-700">
                <p>{comment.username}</p>
                <p>{comment.time && getTime()}</p>
            </div>
            <p //<---
                className="select-text pl-2"
            >
                {deleteId === comment._id
                    ?
                    <p className="animate-pulse text-red-500">Deleting...</p>
                    :
                    <EditableComment
                        comment={comment.comment}
                        edit={edit}
                        setEdit={setEdit}
                        id={comment._id}
                    />}
            </p>

            <div className={`flex gap-2 text-gray-400 pl-2 ${[deleteId, editId].includes(comment._id) && "hidden"}`}>
                <button
                    className="text-xs hover:text-white"
                >like</button>

                <button
                    className="text-xs hover:text-white"
                >reply</button>

                {comment.username == user && <button
                    className="text-xs hover:text-white"
                    onClick={() => setEdit(prev => !prev)}
                >{edit ? 'save' : 'edit'}</button>}

                {comment.username === user &&
                    (
                        delActive
                        ?
                        <>
                            <p className="text-xs">proceed?</p>
                            <button
                                className="text-xs hover:text-white"
                                onClick={() => dispatch(deletePBComment(comment._id))}
                            >yes</button>
                            <button
                                className="text-xs hover:text-white"
                                onClick={() => setDelActive(prev => !prev)}
                            >no</button>
                        </>
                        :
                        <button
                            className="text-xs hover:text-white"
                            onClick={() => setDelActive(prev => !prev)}
                        >delete</button>
                    )
                }
            </div>
        </div>
    )
}