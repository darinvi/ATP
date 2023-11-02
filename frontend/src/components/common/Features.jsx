import { Link } from "react-router-dom"
import { useState } from "react"
import {AiOutlineCaretRight, AiOutlineCaretDown}from 'react-icons/ai';

export default function Features() {

    const [backtestsOpen, setBacktestsOpen] = useState(false)
    const [inquiriesOpen, setInquiriesOpen] = useState(false)

    const className = "hover:bg-cyan-300 w-full px-4 py-2 hover:text-black"

    function backtestsSubNav() {
        return (
            <div className="flex flex-col">
                <div className="flex items-center" onClick={() => setBacktestsOpen(prev => !prev)}>
                    <p
                        className="cursor-pointer"  
                    >Backtests</p>
                    {!backtestsOpen ?  (
                        <AiOutlineCaretRight className='h-4' />
                        ) : (
                        <AiOutlineCaretDown className='h-4' />
                    )}
                </div>
                {backtestsOpen && (
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

    function inquiriesSubNav() {
        return (
            <div className="flex flex-col">
                <div className="flex items-center" onClick={() => setInquiriesOpen(prev => !prev)}>
                    <p
                        className="cursor-pointer"  
                    >Journals</p>
                    {!inquiriesOpen ?  (
                        <AiOutlineCaretRight className='h-4' />
                        ) : (
                        <AiOutlineCaretDown className='h-4' />
                    )}
                </div>
                {inquiriesOpen && (
                    <div className="flex flex-col pl-2 w-full">
                        <div><Link 
                            to='/playbook'
                            className="text-sm hover:text-gray-500"
                        >PlayBooks</Link></div>
                        <div><Link 
                            to='/journal'
                            className="text-sm hover:text-gray-500"
                            >Daily Journal</Link></div>
                        {/* <div><Link 
                            to='#'
                            className="text-sm hover:text-gray-500"
                        >Trade Idea</Link></div> */}
                    </div>
                )}
            </div>
        )
    }

    return <div>
        <div className={className}>{backtestsSubNav()}</div>
        <div className={className}>{inquiriesSubNav()}</div>
        <div className={className}><Link to="/filings">Filings</Link></div>
        <div className={className}><Link to="/tables">Tables</Link></div>
        <div className={className}><Link to="/reports">Reports</Link></div>
    </div>
}