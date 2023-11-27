import { useState } from "react"

export default function MinimizedIdea({setMaximized, name}) {

    const [focused, setFocused] = useState(false);

    return (
        <div 
            className="flex gap-2 items-center cursor-pointer pl-2 text-gray-400 hover:text-gray-200"
            onClick={() => setMaximized(true)}
            onMouseEnter={()=> setFocused(true)}
            onMouseLeave={()=> setFocused(false)}
        >
            <p>Variable: {name}</p>
            { focused && <img className="h-3" src={require("../../../../../../assets/edit.png")} alt="" />}
        </div>
    )
}

// require("../../assets/logo.png")