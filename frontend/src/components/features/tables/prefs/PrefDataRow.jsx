import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getDividendStats } from "../../../../store/backtests"
import { inputTicker } from "../../../../store/playbooks"

export default function PrefDataRow(props) {
    
    const [isActive, setIsActive] = useState(false)

    const dispatch = useDispatch();

    const data = props.data

    const linkClass = "hover:bg-green-200 hover:text-black px-2 rounded border-2 border-cyan-900"

    return (
        <>
            <tr 
                className={`hover:bg-cyan-700 hover:text-white ${isActive && "bg-cyan-700" } border-b-2 border-cyan-900 cursor-pointer flex`}
                onClick={()=>setIsActive(prev => !prev)}
            >
                <td className="text-center flex-1">{data.ticker}</td>
                <td className="text-center flex-1">{parseFloat(data.avg_volume).toFixed(2)}</td>
                <td className="text-center flex-1">{parseFloat(data.amount).toFixed(2)}</td>
                <td className="text-center flex-1">{data.max_ex_date}</td>
                <td className="text-center flex-1">{parseFloat(data.atr).toFixed(2)}</td>
                <td className="text-center flex-1">{data.industry}</td>
            </tr>
            <div className={`${!isActive && "hidden" } flex items-center items-center z-50 bg-cyan-700 w-full py-2`}>
                <div className="mx-auto flex gap-2">
                    <Link 
                        className={linkClass}
                        to='http://localhost:3000/backtests/dividends'
                        onClick={ () => {
                            dispatch(getDividendStats(data.ticker))
                        }}
                    >Dividends</Link>  
                    
                    <Link 
                        className={linkClass}
                        to='#'
                        onClick={ () => {
                        }}
                    >Trade Idea</Link>  

                    <Link 
                        className={linkClass}
                        to='/playbook'
                        onClick={ () => {
                            dispatch(inputTicker(data.ticker));
                        }}
                    >PlayBook</Link>  
                </div>
            </div>
        </>
    )
}