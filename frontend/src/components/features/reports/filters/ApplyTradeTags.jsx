import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getTradeTags } from "../../../../store/reports";
import TagsStrategyChoose from "./TagsStrategyChoose";
import CreateTag from "./CreateTag";

export default function ApplyTradeTags({ disabledClass, setShowTags }) {

    const dispatch = useDispatch();

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
            <p>Tags: dae</p>
        )
    }

    return (
        <div
            className="absolute top-0 left-0 min-w-full max-w-fit h-fit p-4 bg-cyan-900 rounded-b-lg border-b-2 border-x-2 border-cyan-700 flex flex-col gap-6"
        >
            <CreateTag />
            <TagsStrategyChoose />
            {listTags()}
            {getButtons()}
        </div>
    )
}