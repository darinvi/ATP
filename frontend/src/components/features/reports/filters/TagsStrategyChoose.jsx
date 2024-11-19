import { activeSelect, tradeTags } from "../../../../store/reports"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import StrategyBuilder from "./strategyBuilder/StrategyBuilder";
import { getActiveSelect, setActiveSelect } from "../../../../store/reports";

export default function TagsStrategyChoose() {

    const tags = useSelector(tradeTags)
    const activeSelect = useSelector(getActiveSelect)
    const dispatch = useDispatch();

    const [currentTag, setCurrentTag] = useState("");


    const buttonClass = "px-2 rounded border border-cyan-700 hover:text-black transform active:scale-95"

    function getTagSelect() {
        return (
            <div className="flex gap-4">
                <select
                    className="w-fit bg-cyan-700 focus:bg-cyan-800 hover:bg-cyan-800 rounded hover:text-white w-1/4"
                    onChange={e => setCurrentTag(e.target.value._id)}
                >
                    {tags && tags.map(t => {
                        return <option key={t._id}>{t.tag}</option>
                    })}
                </select>
                <button
                    className={`${buttonClass} px-4 hover:bg-green-200`}
                >
                    Add
                </button>
                <button
                    className={`${buttonClass} hover:bg-red-200`}
                >
                    Delete
                </button>
                <button
                    className={`${buttonClass} hover:bg-red-200`}
                    onClick={() => dispatch(setActiveSelect(""))}
                >
                    Hide
                </button>
            </div>
        )
    }

    return (
        <>
            {!activeSelect && (
                <div className="flex gap-4">
                    <button
                        className={`${buttonClass} hover:bg-green-200`}
                        onClick={() => dispatch(setActiveSelect("tags"))}
                    >Manage Tags</button>
                    <button
                        className={`${buttonClass} hover:bg-green-200`}
                    >Apply Strategy</button>
                </div>
            )}

            {activeSelect === 'tags' && (
                getTagSelect()
            )}

            {activeSelect === 'strategy' && (
                <StrategyBuilder />
            )}
        </>
    )
}