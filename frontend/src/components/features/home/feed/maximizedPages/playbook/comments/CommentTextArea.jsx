import { useState } from "react"
import { useDispatch } from "react-redux";

export default function CommentTextArea() {

    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    return (
        <div
            className="flex w-full px-4 gap-2 pt-2 border-t-2"
        >
            <div className="w-full">
                <textarea
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                    className="border-2 w-full h-full rounded hover:bg-gray-100 focus:bg-gray-100 resize-none"
                ></textarea>
            </div>
            <div className="flex flex-col w-fit gap-1">
                <button
                    disabled={!comment}
                    className="px-2 bg-green-200 hover:bg-green-300 rounded border border-green-900 disabled:bg-gray-200 transform active:scale-95 disabled:scale-100"
                    onClick={()=>{
                        // dispatch();
                    }}
                >Comment</button>
                <button
                    disabled={!comment}
                    className="w-full bg-gray-300 bg-red-200 hover:bg-red-300 rounded border border-red-900 disabled:bg-gray-200 transform active:scale-95 disabled:scale-100"
                    onClick={()=>setComment("")}
                >Delete</button>
            </div>
        </div>
    )
}