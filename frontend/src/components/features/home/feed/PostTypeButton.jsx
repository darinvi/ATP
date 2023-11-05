import { useState } from "react"

export default function PostTypeButton(props){

    const [isActive, setIsActive] = useState(true);

    return (
        <button 
            onClick={() => setIsActive(prev => !prev)}
            className={`bg-cyan-200 border border-gray-800 text-xs h-fit px-1 ml-2 rounded hover:text-gray-500 hover:px-2 transform active:scale-95 ${!isActive && 'line-through'}`}
        >{props.postType}</button>
    ) 
}