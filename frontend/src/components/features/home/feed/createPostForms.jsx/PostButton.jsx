import { useState } from "react"
import PostInput from "./PostInput"

export default function PostButton() {

    const [isActive, setIsActive] = useState(false)
    const [hovered, setHovered] = useState(false)

    const disabledClass = "opacity-30 bg-gray-900 text-gray-400 h-full px-4"
    const activeClass = "h-full px-4 cursor-pointer text-white bg-cyan-600"

    return (
        <div>
            <div
                // className={`bg-red-400 h-full px-4 cursor-pointer`}
                className={hovered ? activeClass : disabledClass}
                onClick={() => {
                    if (!isActive) setIsActive(true)
                }}
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            >
                <p>
                    Post
                </p>
            </div>
            {isActive && <PostInput setIsActive={setIsActive} />}
        </div>
    )
}