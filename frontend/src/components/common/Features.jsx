import { Link } from "react-router-dom"
import { useState } from "react"
import {AiOutlineCaretRight, AiOutlineCaretDown}from 'react-icons/ai';

export default function Features() {

    const [backtestsOpen, setBacktestsOpen] = useState(false)
    const [inquiriesOpen, setInquiriesOpen] = useState(false)

    const className = "hover:bg-cyan-300 w-full hover:text-black flex items-center py-2"
    const nestedLinksClassName = "text-sm hover:text-gray-500 w-full"

    function backtestsSubNav() {
        return (
            <div className="flex flex-col">
                <div 
                    className="flex items-center px-4 cursor-pointer" 
                    onClick={() => setBacktestsOpen(prev => !prev)}
                >
                    <p
                        className="cursor-pointer w-full"  
                    >Backtests</p>
                    {!backtestsOpen ?  (
                        <AiOutlineCaretRight className='h-4' />
                        ) : (
                        <AiOutlineCaretDown className='h-4' />
                    )}
                </div>
                {backtestsOpen && (
                    <div className="flex flex-col pl-6 w-full">
                        <div className="w-full"><Link 
                            to='/backtests/dividends'
                            className={nestedLinksClassName}
                        >Dividends</Link></div>
                        <div><Link 
                            to='/backtests/market-profile'
                            className={nestedLinksClassName}
                            >Market Profile</Link></div>
                        <div><Link 
                            to='#'
                            className={nestedLinksClassName}
                        >Backtest2</Link></div>
                    </div>
                )}
            </div>
        )
    }

    function inquiriesSubNav() {
        return (
            <div className="flex flex-col w-full">
                <div 
                    className="flex items-center px-4 w-full cursor-pointer"
                    onClick={() => setInquiriesOpen(prev => !prev)}
                >
                    <p
                        className="cursor-pointer w-full"  
                    >Journals</p>
                    {!inquiriesOpen ?  (
                        <AiOutlineCaretRight className='h-4' />
                        ) : (
                        <AiOutlineCaretDown className='h-4' />
                    )}
                </div>
                {inquiriesOpen && (
                    <div className="flex flex-col pl-6 w-full">
                        <div><Link 
                            to='/playbook'
                            className={nestedLinksClassName}
                        >PlayBooks</Link></div>
                        <div><Link 
                            to='/journal'
                            className={nestedLinksClassName}
                            >Daily Journal</Link></div>
                        {/* <div><Link 
                            to='#'
                            className={nestedLinksClassName}
                        >Trade Idea</Link></div> */}
                    </div>
                )}
            </div>
        )
    }

    return <ul className="border border-cyan-900">
        <li className={className}>{backtestsSubNav()}</li>
        <li className={className}>{inquiriesSubNav()}</li>
        <li className={className}><Link to="/filings" className="w-full px-4 py-1">Filings</Link></li>
        <li className={className}><Link to="/tables" className="w-full px-4 py-1">Tables</Link></li>
        <li className={className}><Link to="/reports" className="w-full px-4 py-1">Reports</Link></li>
    </ul> 
}