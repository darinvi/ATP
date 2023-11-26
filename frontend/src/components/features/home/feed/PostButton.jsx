import { useState } from "react"
import PostInput from "./PostInput"

export default function PostButton() {

    const [isActive, setIsActive] = useState(false)

    return (
        <>
            <button
                onClick={()=>setIsActive(prev => !prev)} 
                className={`border border-green-900 bg-green-300 hover:bg-green-400 rounded px-2 transform active:scale-95 h-fit text-xs mr-2`}
            >Post</button>
            { isActive && <PostInput setIsActive={setIsActive} />}
        </>
    )
}