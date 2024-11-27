import { useState } from "react"
import { useDispatch } from "react-redux";
import { createTradeTag, setActiveSelect } from "../../../../store/reports";
import { useSelector } from "react-redux";
import { getActiveSelect } from "../../../../store/reports";
import ClosingSVG from "../../../utils/ClosingSVG";
import Modal from "../../../utils/Modal";

export default function CreateTag({ setShowBuilders }) {

    const dispatch = useDispatch();
    const activeSelect = useSelector(getActiveSelect)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(false);

    const inputCLass = "bg-cyan-700 hover:bg-cyan-800 focus:bg-cyan-800 text-white px-3 rounded";
    const disabledClass = "disabled:opacity-20 disabled:scale-100 disabled:bg-gray-900 disabled:text-gray-300";
    const buttonClass = "rounded px-2 hover:text-black border border-cyan-700 transform active:scale-95";

    // function inputsActive() {
    //     return (
    //         <div className="flex w-full gap-2">
    //             <div className="flex gap-6 w-full">
    //                 <div className="flex gap-2">
    //                     <label
    //                         htmlFor="create-trade-tag-name"
    //                         className="hover:text-white"
    //                     >Tag:</label>
    //                     <input
    //                         id="create-trade-tag-name"
    //                         type="text"
    //                         className='TEXT_INPUT'
    //                         value={name}
    //                         onChange={e => setName(e.target.value)}
    //                     />
    //                 </div>
    //                 <div className="flex gap-2">
    //                     <label
    //                         htmlFor="create-trade-tag-description"
    //                         className="hover:text-white"
    //                     >Description:</label>
    //                     <input
    //                         placeholder="(optional)"
    //                         id="create-trade-tag-description"
    //                         type="text"
    //                         className={'TEXT_INPUT w-full'}
    //                         value={description}
    //                         onChange={e => setDescription(e.target.value)}
    //                     />
    //                 </div>
    //             </div>
    //             {/* <p>TODO: ADD TO STRATEGY</p> */}
    //             <div className="flex gap-2">
    //                 <button
    //                     disabled={!name}
    //                     className={`${disabledClass} ${buttonClass} hover:bg-green-200 px-4`}
    //                     onClick={() => {
    //                         dispatch(createTradeTag({ tag: name, description }))
    //                     }}
    //                 >Save</button>
    //                 <ClosingSVG
    //                     onClick={() => {
    //                         setIsActive(false)
    //                         dispatch(setActiveSelect(""))
    //                     }}
    //                 />
    //             </div>
    //         </div>
    //     )
    // }

    function modalChildren() {
        return (
            <div
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex flex-col gap-4">
                    <div className="flex gap-6 w-full">
                        <div className="flex gap-2">
                            <label
                                htmlFor="create-trade-tag-name"
                                className="hover:text-black"
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
                                className="hover:text-black"
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
                    <div className="flex gap-2 justify-end">
                        <button
                            disabled={!name}
                            className={`${disabledClass} ${buttonClass} hover:bg-green-200 px-4`}
                            onClick={() => {
                                dispatch(createTradeTag({ tag: name, description }))
                            }}
                        >Save</button>
                        <ClosingSVG
                            onClick={() => {
                                setIsActive(false)
                                dispatch(setActiveSelect(""))
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }

    function inputsActive() {
        return (
            <Modal
                onClickOutside={() => {
                    dispatch(setActiveSelect(""))
                    setShowBuilders()
                }}
                children={modalChildren()}
            ></Modal>
        )
    }

    function inputsInactive() {
        return (
            <div className="flex gap-4">
                <button
                    className={`${buttonClass} hover:bg-green-200 w-fit`}
                    onClick={() => {
                        dispatch(setActiveSelect("reports-create-tag"))
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
            {activeSelect === "reports-create-tag" && inputsActive()}
            {inputsInactive()}
        </>
    )
}