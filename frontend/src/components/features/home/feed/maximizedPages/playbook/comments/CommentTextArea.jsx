import { useState } from "react"
import { useDispatch } from "react-redux";
import { leavePlaybookComment } from "../../../../../../../store/home";

export default function CommentTextArea() {

    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    const disabledClass = "disabled:opacity-20 disabled:border-2 disabled:border-gray-900 disabled:scale-100 disabled:bg-gray-900 disabled:text-gray-300"

    return (
        <div
            className="flex w-full px-4 gap-2 pt-2 border-t-2 border-cyan-800 flex-1 h-fit"
        >
            <div className="w-full">
                <textarea
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                    className="border-2 border-black bg-gray-700 text-white w-full h-full rounded hover:bg-gray-800 focus:bg-gray-800 resize-none px-2"
                ></textarea>
            </div>
            <div className="flex flex-col w-fit gap-1">
                <button
                    disabled={!comment}
                    className={`px-2 hover:bg-green-300 hover:text-black rounded border border-cyan-700 transform active:scale-95 ${disabledClass}`}
                    onClick={()=>{
                        // validate that the comment is not spaces only here
                        dispatch(leavePlaybookComment(comment));
                        setComment("");
                    }}
                >Comment</button>
                <button
                    disabled={!comment}
                    className={`w-full hover:bg-red-300 hover:text-black rounded border border-cyan-700 transform active:scale-95 ${disabledClass}`}
                    onClick={()=>setComment("")}
                >Delete</button>
            </div>
        </div>
    )
}