import { useSelector, useDispatch } from "react-redux"
import { deletePBComment } from "../../../../../../../store/home";
import { useState } from "react";

export default function SinglePlaybookComment({comment}){

    const user = useSelector(state => state.auth.user.username);
    const deleteId = useSelector(state => state.entities.home.playbooks.deletingId);
    const dispatch = useDispatch();

    function getTime() {
        const date = new Date(comment.time*1000)
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes}`;
    }

    return (
        <div className={`border-y flex flex-col gap-1 pb-1 ${deleteId === comment._id && "bg-red-100"}`}>
            <div className="text-xs flex gap-2 bg-gray-200 w-fit px-2 rounded-br">
                <p>{comment.username}</p>
                <p>{comment.time && getTime()}</p>
            </div>
            <p
                className="select-text pl-2"
            >{deleteId === comment._id ? <p className="animate-pulse text-center">Deleting...</p> : comment.comment}</p>
            <div className="flex gap-2 text-gray-400 pl-2">
                <button
                    className="text-xs"
                >like</button>

                <button
                    className="text-xs"
                >comment</button>

                {comment.username == user && <button
                    className="text-xs"
                >edit</button>}

                {comment.username == user && <button
                    className="text-xs"
                    onClick={()=>dispatch(deletePBComment(comment._id))}
                >delete</button>}
            </div>
        </div>
    )
}