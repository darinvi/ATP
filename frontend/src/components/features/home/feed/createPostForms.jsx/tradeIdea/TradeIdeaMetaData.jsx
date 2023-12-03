import { useState } from "react"
import { setMetaData } from "../../../../../../store/posts";
import { useDispatch, useSelector } from "react-redux";

export default function TradeIdeaMetaData() {

    const [activeInput, setActiveInput] = useState("");
    const [inputData, setInputData] = useState("");

    const dispatch = useDispatch();
    const name = useSelector(state => state.entities.posts.tradeIdeas.name);
    const ticker = useSelector(state => state.entities.posts.tradeIdeas.ticker);

    function handleInputClosed(){
        setActiveInput("");
        setInputData("");
    }

    function activeInputComponent() {

        return (
            <div className="w-full flex items-center pl-2">
                <input
                    placeholder={activeInput === 'Name' ? "Insert Trade Name (e.g. dividend play)" : "Insert Ticker Name"}
                    value={activeInput === 'Name' ? name : ticker}
                    onChange={ e => {
                        if (activeInput === 'Name') dispatch(setMetaData({'name': e.target.value}));
                        else if (activeInput === 'Ticker') dispatch(setMetaData({'ticker': e.target.value}));
                    }}
                    className="rounded bg-cyan-800 focus:bg-cyan-900 hover:bg-cyan-900 w-full pl-2"
                    type="text"
                    onKeyDown={e => {
                        if (e.code === 'Enter') handleInputClosed();
                    }}
                ></input>
            </div>
        )
    }

    function noActiveInput() {
        return (
            <>
                <p
                    className="border-r pr-4 hover:text-white cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap w-1/2 pl-2"
                    onClick={e => setActiveInput("Name")}
                >
                    {name ? name : 'Name'}
                </p>

                <p
                    className="hover:text-white cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap w-1/2 pl-2"
                    onClick={e => setActiveInput("Ticker")}
                >
                    { ticker ? ticker :'Ticker'}
                </p>
            </>
        )
    }

    return (
        <div
            className="flex w-full items-center text-gray-300 text-sm"
        >
            {
                activeInput === ""
                    ?
                    noActiveInput()
                    :
                    activeInputComponent()
            }
        </div>
    )
}