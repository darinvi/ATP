import { useState } from "react"

export default function MinimizedIdea({ setMaximized, name, description }) {

    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="flex cursor-pointer justify-between pl-2 py-2 text-gray-400 hover:text-white border-b border-cyan-900 hover:bg-cyan-800"
            onClick={() => setMaximized(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="w-[80%] flex gap-3">
                <div className="flex gap-1 w-1/2 items-center">
                    <p className="text-sm">Variable:</p>
                    <p className="text-ellipsis  overflow-hidden text-gray-300">{name}</p>
                </div>

                <div className="flex gap-1 w-1/2 items-center">
                    <p className="text-sm">Description: </p>
                    <p className="text-ellipsis overflow-hidden text-gray-300">{description}</p>
                </div>
            </div>
            {hovered
                &&
                <>
                    <div className="flex gap-2 items-center w-fit pr-4">
                        <svg className="h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <img className="h-5" src={require("../../../../../../assets/edit.png")} alt="" />
                    </div>
                </>
            }
        </div>
    )
}
