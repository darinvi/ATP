import { useState } from "react";


export default function PostInputSelect() {

    const [postType, setPostType] = useState("Trade Idea");


    return (
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
    )
}