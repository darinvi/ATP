import { Link } from "react-router-dom"
import { useState } from "react"
import {AiOutlineCaretRight, AiOutlineCaretDown}from 'react-icons/ai';

export default function Features() {

    const [isOpen, setIsOpen] = useState(false)

    const className = "hover:bg-cyan-300 w-full px-4 py-2 hover:text-black"

    function backtestsSubNav() {
        return (
            <div className="flex flex-col">
                <div className="flex items-center" onClick={() => setIsOpen(prev => !prev)}>
                    <p
                        className="cursor-pointer"  
                    >Backtests</p>
                    {!isOpen ?  (
                        <AiOutlineCaretRight className='h-4' />
                        ) : (
                        <AiOutlineCaretDown className='h-4' />
                    )}
                </div>
                {isOpen && (
                    <div className="flex flex-col pl-2 w-full">
                        <div><Link 
                            to='/backtests/dividends'
                            className="text-sm hover:text-gray-500"
                        >Dividends</Link></div>
                        <div><Link 
                            to='#'
                            className="text-sm hover:text-gray-500"
                            >Market Profile</Link></div>
                        <div><Link 
                            to='#'
                            className="text-sm hover:text-gray-500"
                        >Backtest2</Link></div>
                    </div>
                )}
            </div>
        )
    }

    return <div>
        <div className={className}><Link to="/filings">Filings</Link></div>
        <div className={className}>{backtestsSubNav()}</div>
        <div className={className}><Link to="/tables">Tables</Link></div>
        <div className={className}><Link to="/reports">Reports</Link></div>
        <div className={className}><Link to="">PlayBooks</Link></div>
        <div className={className}><Link to="/journal">Journal</Link></div>
    </div>
}