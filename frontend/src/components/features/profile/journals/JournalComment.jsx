import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function JournalComment(props){

    const currentUser = useSelector(state => state.auth.user.id)
    const commentUser = props.comment.user

    return <p className={commentUser === currentUser ? "text-green-600 text-lg" : "text-black"}>{props.comment.comment}</p>
}