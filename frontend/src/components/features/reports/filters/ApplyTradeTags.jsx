import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getTradeTags } from "../../../../store/reports";
import TagsStrategyChoose from "./TagsStrategyChoose";
import CreateTag from "./CreateTag";
import { getActiveSelect } from "../../../../store/reports";
import { useSelector } from "react-redux";

export default function ApplyTradeTags({ disabledClass, setShowTags }) {

    const dispatch = useDispatch();

    const activeSelect = useSelector(getActiveSelect)

    const [showBuilders, setShowBuilders] = useState(false);

    useEffect(() => {
        dispatch(getTradeTags())
        // return cleanup
    }, [])

    const buttonClass = "px-2 rounded border border-cyan-700 hover:text-black transform active:scale-95"

    function getButtons() {
        return (
            <div className="flex gap-2 h-full overflow-x-auto items-center">
                <button
                    disabled={true}
                    className={`${buttonClass} ${disabledClass}`}
                >Save</button>
                <button
                    className={`${buttonClass} hover:bg-red-200`}
                    onClick={() => setShowTags(false)}
                >Hide</button>
            </div>
        )
    }

    function listTags() {
        return (
            <p>Tags:</p>
        )
    }

    function getCreateTag() {
        return <div className="flex gap-4">
            <TagsStrategyChoose />
            {(showBuilders && activeSelect === '') && <CreateTag />}
            {activeSelect != 'tags' && <button
                className={`flex gap-2 items-center hover:scale-110 ${showBuilders ? 'hover:text-red-200' : 'hover:text-green-200'}`}
                onClick={() => setShowBuilders(!showBuilders)}
            >
                {`${showBuilders ? '' : 'Create'}`}
                <svg
                    className={`transform transition-transform duration-150 ${showBuilders ? 'rotate-180' : ''}`}
                    width={showBuilders ? "24" : "12"}
                    height={showBuilders ? "24" : "12"}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M22 12L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>}
        </div>
    }

    return (
        <div
            className="absolute top-0 left-0 min-w-full max-w-fit h-fit p-4 bg-cyan-900 rounded-b-lg border-b-2 border-x-2 border-cyan-700 flex flex-col gap-6"
        >
            {getCreateTag()}
            {listTags()}
            {getButtons()}
        </div >
    )
}