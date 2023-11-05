import { useState } from "react"
import PostInput from "./PostInput"

export default function PostButton() {

    const [isActive, setIsActive] = useState(false)

    return (
        <div>
            <button
                onClick={()=>setIsActive(prev => !prev)} 
                className={`border-2 ${ isActive ? "bg-red-300 hover:bg-red-400 border-red-900" : "bg-green-300 hover:bg-green-400 border-green-900"} rounded-md px-4 transform active:scale-95`}
            >{isActive ? "Close" : "Post"}</button>
            { isActive && <PostInput setIsActive={setIsActive} />}
        </div>
    )
}