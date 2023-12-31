import { useState } from "react";
import {AiOutlineCaretRight, AiOutlineCaretDown}from 'react-icons/ai';
import Features from "./Features";

export default function FeaturesDropdown(){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex flex-col items-center rounded h-full">
            
            <button 
                onClick={()=>setIsOpen(prev => !prev)} 
                className={`w-full flex items-center justify-between rounded h-full hover:text-cyan-300 list-none px-6 ${isOpen && 'text-cyan-300'}`}
            >
                Features
                {!isOpen ?  (
                    <AiOutlineCaretRight className='h-4' />
                    ) : (
                    <AiOutlineCaretDown className='h-4' />
                )}
            </button>
            {/* <img src={require("../../assets/features.png")} alt="" className="h-full cursor-pointer hover:bg-cyan-700 px-2" /> */}



            {isOpen && (
                <div 
                    className="bg-cyan-800 absolute top-14 rounded-b flex flex-col gap-2 items-center z-50"
                    onMouseLeave={()=>setIsOpen(false)}
                >
                    <Features />
                </div>
            )}
        </div>
    )
}