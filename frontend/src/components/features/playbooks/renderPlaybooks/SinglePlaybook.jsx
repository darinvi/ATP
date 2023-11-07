import { Link } from "react-router-dom"
import { useState } from "react";
import PlaybookActive from "./PlaybookActive";
import {AiOutlineCaretRight, AiOutlineCaretDown}from 'react-icons/ai';

export default function SinglePlaybook(props) {
    const play = props.play;
    
    const [isActive, setIsActive] = useState(false);
    const [element, setElement] = useState("");
    const [elementClicked, setElementClicked] = useState(false);

    function handleMouseEnter(e){
        setElement(e.target.innerText);
    }

    function notActive() {
        return (
            <div className="flex items-center gap-4 w-full pr-4 cursor-pointer" onClick={()=>setIsActive(prev => !prev)}>
                <div className="flex flex-col w-full h-full py-3 items-center">
                    <Link to={'/playbook'} className="font-medium hover:text-cyan-700 pb-1 w-fit border-b-2 border-gray-300">PlayBook</Link>
                    <div className="flex gap-2 pb-4 pt-2">
                        <p
                            className="border-r border-gray-800 pr-2"
                        >
                            <span 
                                className="font-medium text-sm mr-1"
                            >By:</span> 
                            <span 
                                className="underline"
                                onMouseEnter={handleMouseEnter}
                            >{play.user.username}</span></p>
                        
                        <p
                            className="border-r border-gray-800 pr-2"
                        >
                            <span 
                                className="font-medium text-sm mr-1"
                            >Ticker:</span> 
                            <span 
                                className="underline"
                                onMouseEnter={handleMouseEnter}
                            >{play.ticker}</span></p>
                        
                        <p
                            className="border-r border-gray-800 pr-2"
                        >
                            <span 
                                className="font-medium text-sm mr-1"
                            >Play:</span> 
                            <span 
                                className="underline"
                                onMouseEnter={handleMouseEnter}
                            >{play.play}</span></p>
                        
                        <p
                            className="border-r border-gray-800 pr-2"
                        >
                            <span 
                                className="font-medium text-sm mr-1"
                            >Created:</span>
                            <span 
                                className="underline"
                                onMouseEnter={handleMouseEnter}
                            >{play.date.split("T")[0]}</span></p>
                    </div>
                </div>
                    {!isActive ?  (
                        <AiOutlineCaretRight className='h-4' />
                        ) : (
                        <AiOutlineCaretDown className='h-4' />
                    )}
            </div>
        )
    }


    return (
        <div
            className={`border border-gray-300 flex flex-col my-4 gap-1 items-center hover:bg-gray-200 ${isActive && "border-2 border-gray-900 bg-gray-200 my-8 pb-4"} w-full`}
        >
            {notActive()}
            {isActive && <PlaybookActive play={play} />}
        </div>
    )
}