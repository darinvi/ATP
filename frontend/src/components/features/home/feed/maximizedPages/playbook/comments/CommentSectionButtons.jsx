import {AiOutlineCaretRight, AiOutlineCaretDown}from 'react-icons/ai';
import { useState } from 'react';

export default function CommentSectionButtons() {
    const [isActive, setIsActive] = useState(false);
    return (
            <button
                className="hover:bg-cyan-800 hover:text-white select-none opacity-40 hover:opacity-100 border border-cyan-800 hover:border-cyan-700 text-gray-300 px-3 rounded transform hover:scale-105 active:scale-100 flex items-center h-fit"
                onDoubleClick={e => e.stopPropagation()}
                onClick={()=>setIsActive(prev => !prev)}
            >Backtests {!isActive ?  (
                <AiOutlineCaretRight className='h-4' />
                ) : (
                <AiOutlineCaretDown className='h-4' />
            )}</button>
    )
}


