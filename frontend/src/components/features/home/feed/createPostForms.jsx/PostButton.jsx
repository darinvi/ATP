import { useState } from "react"
import PostInput from "./PostInput"

export default function PostButton() {

    const [isActive, setIsActive] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsActive(prev => !prev)}
                className={`border border-cyan-900 hover:bg-green-300 hover:text-black rounded px-2 transform active:scale-95  text-white text-xs mr-2`}
            >
                Post
            </button>
            {isActive && <PostInput setIsActive={setIsActive} />}
        </>
    )
}