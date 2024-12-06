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
    const [chooseStrategyActive, setChooseStrategyActive] = useState(false);

    const inputCLass = "bg-cyan-700 hover:bg-cyan-800 focus:bg-cyan-800 text-white px-3 rounded";
    const disabledClass = "disabled:opacity-20 disabled:scale-100 disabled:bg-gray-900 disabled:text-gray-300";
    const buttonClass = "rounded px-2 hover:text-black border border-cyan-700 transform active:scale-95";

    function modalCreateTag() {
        return (
            <div
                className={`bg-cyan-900 shadow-lg p-6 w-full max-w-md ${chooseStrategyActive ? 'rounded-l-lg' : 'rounded-lg'}`}
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-6 w-full">
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="create-trade-tag-name"
                                    className="hover:text-cyan-100"
                                >Tag:</label>
                                <input
                                    id="create-trade-tag-name"
                                    type="text"
                                    className='TEXT_INPUT w-1/2'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            {!chooseStrategyActive &&
                                <button
                                    className="flex gap-2 items-center hover:text-green-200 active:scale-95"
                                    onClick={() => setChooseStrategyActive(true)}
                                >
                                    <span>Add to Strategy</span>
                                    <svg
                                        className={`transform transition-transform duration-150`}
                                        width={12}
                                        height={12}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M22 12L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="create-trade-tag-description"
                            className="hover:text-cyan-100"
                        >Description:</label>
                        <textarea
                            placeholder="(optional)"
                            id="create-trade-tag-description"
                            className={'TEXT_INPUT w-full h-20'}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end pt-4">
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
        )
    }

    function modalChooseStrategy() {
        return (
            <div className="bg-cyan-900 flex flex-col gap-4 rounded-r-lg p-6 justify-between">
                <p>whaaaaaaaaaaaat</p>
                {/* TODO: <p>each strategy to be an element that sends a request for adding a tag, 
                    until a response have loading animation, when succesfull have the tick</p> */}
                <div className="flex justify-end">
                    <svg
                        className={`transform transition-transform duration-150 hover:text-red-200 hover:scale-125`}
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        onClick={() => setChooseStrategyActive(false)}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M22 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M2 12L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
            </div>
        )
    }

    function modalChildren() {
        return (
            <div
                className="flex"
                onClick={e => e.stopPropagation()}
            >
                {modalCreateTag()}
                {chooseStrategyActive && modalChooseStrategy()}
            </div >
        )
    }

    function inputsActive() {
        return (
            <Modal
                onClickOutside={() => {
                    dispatch(setActiveSelect(""))
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
                        setShowBuilders()

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
            {activeSelect === "reports-create-tag" ? inputsActive() : inputsInactive()}
        </>
    )
}