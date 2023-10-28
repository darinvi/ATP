import { useState } from "react";
import {AiOutlineCaretRight, AiOutlineCaretDown}from 'react-icons/ai';
import Features from "./Features";

export default function FeaturesDropdown(){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex flex-col items-center rounded">
            <button onClick={()=>setIsOpen(prev => !prev)} className="w-full flex items-center justify-between rounded">
                Features
                {!isOpen ?  (
                    <AiOutlineCaretRight className='h-4' />
                    ) : (
                    <AiOutlineCaretDown className='h-4' />
                )}
            </button>
            {isOpen && (
                <div 
                    className="bg-cyan-800 absolute top-12 rounded flex flex-col gap-2 items-center z-50"
                    onMouseLeave={()=>setIsOpen(false)}
                    // onClick={()=>setIsOpen(false)}
                >
                    <Features />
                </div>
            )}
        </div>
    )
}