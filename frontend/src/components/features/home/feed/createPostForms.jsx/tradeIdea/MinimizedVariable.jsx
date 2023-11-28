import { useState } from "react"

export default function MinimizedIdea({ setMaximized, name }) {

    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="flex justify-between items-center cursor-pointer pl-2 text-gray-400 hover:text-white hover:border-b border-cyan-900 hover:bg-cyan-800"
            onClick={() => setMaximized(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <p className="py-2">Variable: {name}</p>
            {hovered
                &&
                <div className="flex gap-2 items-center pr-6">
                    <svg className="h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <img className="h-5" src={require("../../../../../../assets/edit.png")} alt="" />
                </div>
            }
        </div>
    )
}

// require("../../assets/logo.png")