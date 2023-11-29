import { useState } from "react"

export default function TradeIdeaMetaData() {

    const [activeInput, setActiveInput] = useState("");

    const mapInputs = {

    }

    function nameInputActive() {
        return (
            <p
                className="border-r pr-4  hover:text-white cursor-pointer"
                onClick={() => {
                    if (activeInput === 'Name') setActiveInput("");
                    else setActiveInput();
                }}
            >
                {`Name`}
            </p>
        )
    }


    return (
        <div
            className="flex w-full gap-4 items-center text-gray-300 text-sm"
        >
            {nameInputActive()}
            <p className=" hover:text-white cursor-pointer">Ticker</p>
        </div>
    )
}