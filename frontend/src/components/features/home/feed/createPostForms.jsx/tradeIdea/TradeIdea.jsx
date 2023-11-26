import PostValidButton from "../PostValidButton";
import TradeIdeaVariable from "./TradeIdeaVariable";
import { useState } from "react";

export default function TradeIdea() {

    const [counter, setCounter] = useState(0);
    const [vars, setVars] = useState({}); 

    const renderInputs = Object.keys(vars).map( k => {
        return (
            <TradeIdeaVariable 
                counter={k} 
                vars={vars} 
                setVars={setVars}
            />
        ) 
    })

    return (
        <>
            <button
                className="bg-orange-200 hover:bg-orange-300 transform hover:scale-[102%] active:scale-100 rounded px-2 w-fit"
                onClick={()=>{
                    console.log(vars)
                    setVars({...vars, [counter]: {name: "", description: ""}})
                    setCounter(prev => prev + 1);
                }}
            >Add variable</button>
            <div className="flex flex-col w-full overflow-y-auto">
                <div className="flex flex-col gap-2">
                    {renderInputs}
                </div>
            </div>
            <PostValidButton valid={true} onSubmit={()=>{}} />
        </>
    )
}
