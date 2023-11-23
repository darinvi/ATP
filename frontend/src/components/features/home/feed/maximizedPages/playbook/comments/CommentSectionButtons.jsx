import {AiOutlineCaretRight, AiOutlineCaretDown}from 'react-icons/ai';
import { useState } from 'react';

export default function CommentSectionButtons() {
    const [isActive, setIsActive] = useState(false);
    return (
            <button
                className="bg-red-200 hover:bg-red-300 border border-orange-900 px-3 rounded transform hover:scale-105 active:scale-100 flex items-center h-fit"
                onDoubleClick={e => e.stopPropagation()}
                onClick={()=>setIsActive(prev => !prev)}
            >Backtests {!isActive ?  (
                <AiOutlineCaretRight className='h-4' />
                ) : (
                <AiOutlineCaretDown className='h-4' />
            )}</button>
    )
}


