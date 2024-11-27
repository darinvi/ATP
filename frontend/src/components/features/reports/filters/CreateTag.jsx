import { useState } from "react"
import { useDispatch } from "react-redux";
import { createTradeTag, setActiveSelect } from "../../../../store/reports";
import { useSelector } from "react-redux";
import { getActiveSelect } from "../../../../store/reports";

export default function CreateTag() {

    const dispatch = useDispatch();
    const activeSelect = useSelector(getActiveSelect)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(false);

    const inputCLass = "bg-cyan-700 hover:bg-cyan-800 focus:bg-cyan-800 text-white px-3 rounded";
    const disabledClass = "disabled:opacity-20 disabled:scale-100 disabled:bg-gray-900 disabled:text-gray-300";
    const buttonClass = "rounded px-2 hover:text-black border border-cyan-700 transform active:scale-95";

    function inputsActive() {
        return (
            <div className="flex w-full gap-2">
                <div className="flex gap-6 w-full">
                    <div className="flex gap-2">
                        <label
                            htmlFor="create-trade-tag-name"
                            className="hover:text-white"
                        >Tag:</label>
                        <input
                            id="create-trade-tag-name"
                            type="text"
                            className='TEXT_INPUT'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <label
                            htmlFor="create-trade-tag-description"
                            className="hover:text-white"
                        >Description:</label>
                        <input
                            placeholder="(optional)"
                            id="create-trade-tag-description"
                            type="text"
                            className={'TEXT_INPUT w-full'}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        disabled={!name}
                        className={`${disabledClass} ${buttonClass} hover:bg-green-200 px-4`}
                        onClick={() => {
                            dispatch(createTradeTag({ tag: name, description }))
                        }}
                    >Save</button>
                    <button
                        className={`${buttonClass} hover:bg-red-200`}
                        onClick={() => {
                            setIsActive(false)
                            dispatch(setActiveSelect(""))
                        }}
                    >Cancel</button>
                </div>
            </div>
        )
    }

    function inputsInactive() {
        return (
            <div className="flex gap-4">
                <button
                    className={`${buttonClass} hover:bg-green-200 w-fit`}
                    onClick={() => {
                        setIsActive(true)
                        dispatch(setActiveSelect("create-tag"))
                    }}
                >
                    Create Tag
                </button>
                <button
                    className={`${buttonClass} hover:bg-green-200 w-fit`}
                    onClick={() => dispatch(setActiveSelect("strategy"))}
                >Strategy Builder</button>
            </div>
        )
    }

    return (
        <>
            {isActive ? inputsActive() : inputsInactive()}
        </>
    )
}