import CommentTextArea from "./CommentTextArea"
import { useSelector, useDispatch } from "react-redux"
import { clearComments } from "../../../../../../../store/home";
import { useEffect } from "react";

export default function DisplayComments() {

    const dispatch = useDispatch();
    const commentType = useSelector(state => state.entities.home.playbooks.commentType);
    
    useEffect(()=>{
        return () => dispatch(clearComments());
    },[])

    return (
        <div className="flex flex-col flex-1 items-center justify-between w-full py-2">
            <div
                className="border-b w-full text-center flex flex-col"
            >
                <p className="w-fit border-b mx-auto">Comments</p>
                <p 
                    className={`w-fit border-b mx-auto ${commentType !== 'General' && "hover:text-red-500"}`}
                    onClick={()=>{
                        if (commentType !== 'General') {
                            dispatch(clearComments())
                        }
                    }}
                >{commentType}</p>
            </div>
            <CommentTextArea />
        </div>
    )
}