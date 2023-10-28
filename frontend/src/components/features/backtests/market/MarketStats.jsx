import { useState } from "react";
import {AiOutlineCaretUp, AiOutlineCaretDown}from 'react-icons/ai';

export default function MarketStats(){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex flex-col items-center rounded">
            <button onClick={()=>setIsOpen(prev => !prev)} className="bg-blue-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-100 active:text-white">
                Features
                {!isOpen ?  (
                    <AiOutlineCaretUp className='h-8' />
                    ) : (
                    <AiOutlineCaretDown className='h-8' />
                )}
            </button>
            {isOpen && (
                <div className="bg-blue-400 absolute top-20 rounded px-4 flex flex-col gap-2 w-full items-center">
                    {['wtf','grr','brr','wtf','grr','brr','wtf','grr','brr'].map( (item) => {
                        return <div>
                            <h3>{item}</h3>
                        </div>
                    })}
                </div>
            )}
        </div>
    )
}