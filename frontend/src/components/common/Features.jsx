import { Link } from "react-router-dom"
import { useState } from "react"
import { AiOutlineCaretRight, AiOutlineCaretDown } from 'react-icons/ai';

export default function Features() {

    const [backtestsOpen, setBacktestsOpen] = useState(false)
    const [inquiriesOpen, setInquiriesOpen] = useState(false)

    const nestedLinksClassName = "text-sm hover:text-white w-full"
    const dropDownActive = "flex flex-col pl-6 pb-3 w-full text-gray-300"

    function backtestsSubNav() {
        return (
            <div className={`flex flex-col h-full ${backtestsOpen && "bg-cyan-700"}`}>
                <div
                    className="flex items-center px-4 cursor-pointer h-full py-2"
                    onClick={() => setBacktestsOpen(prev => !prev)}
                >
                    <p
                        className={`cursor-pointer w-full ${backtestsOpen && "text-cyan-300"}`}
                    >Backtests</p>
                    {!backtestsOpen ? (
                        <AiOutlineCaretRight className='h-4' />
                    ) : (
                        <AiOutlineCaretDown className='h-4' />
                    )}
                </div>
                {backtestsOpen && (
                    <div className={dropDownActive}>
                        <div className="w-full"><Link
                            to='/backtests/dividends'
                            className={nestedLinksClassName}
                        >Dividends</Link></div>
                        <div><Link
                            to='/backtests/market-profile'
                            className={nestedLinksClassName}
                        >Market Profile</Link></div>
                    </div>
                )}
            </div>
        )
    }

    function inquiriesSubNav() {
        return (
            <div className={`flex flex-col w-full h-full ${inquiriesOpen && "bg-cyan-700"}`}>
                <div
                    className="flex items-center px-4 w-full h-full cursor-pointer py-2"
                    onClick={() => setInquiriesOpen(prev => !prev)}
                >
                    <p
                        className="cursor-pointer w-full"
                    >Journals</p>
                    {!inquiriesOpen ? (
                        <AiOutlineCaretRight className='h-4' />
                    ) : (
                        <AiOutlineCaretDown className='h-4' />
                    )}
                </div>
                {inquiriesOpen && (
                    <div className={dropDownActive}>
                        <div><Link
                            to='/playbook'
                            className={nestedLinksClassName}
                        >PlayBooks</Link></div>
                        <div><Link
                            to='/journal'
                            className={nestedLinksClassName}
                        >Daily Journal</Link></div>
                    </div>
                )}
            </div>
        )
    }

    const className = "hover:text-cyan-300 w-full flex items-center"
    const linkClass = "w-full h-full px-4 py-2";

    return <ul className="border-x-2 border-b-2 border-cyan-700 bg-cyan-900">
        <li className={className}>{backtestsSubNav()}</li>
        <li className={className}>{inquiriesSubNav()}</li>
        <li className={className}><Link to="/filings" className={linkClass}>Filings</Link></li>
        <li className={className}><Link to="/tables" className={linkClass}>Tables</Link></li>
        <li className={className}><Link to="/reports" className={linkClass}>Reports</Link></li>
    </ul>
}