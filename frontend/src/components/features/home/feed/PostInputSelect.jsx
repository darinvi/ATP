import { useState } from "react";


export default function PostInputSelect({close}) {

    const [postType, setPostType] = useState("Trade Idea");


    return (
        <div className="flex">
            <div className="mx-auto flex gap-8">
                <select
                    className="mx-auto text-sm bg-cyan-100 rounded-sm"
                    onChange={e => setPostType(e.target.value)}
                >
                    <option>Trade Idea</option>
                    <option>Generic Post</option>
                </select>
                {postType === 'Trade Idea' && (
                    <div className="flex gap-2">
                        <label>Ticker:</label>
                        <input className="w-16 rounded"></input>
                    </div>
                )}
            </div>
            <button 
                className="text-white mr-4 hover:text-red-300 transform hover:scale-105 active:scale-100"
                onClick={()=>close()}
            >X</button>
        </div>
    )
}