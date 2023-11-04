import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getDividendStats } from "../../../../store/backtests"
import { inputTicker } from "../../../../store/playbooks"

export default function PrefDataRow(props) {
    
    const [isActive, setIsActive] = useState(false)

    const dispatch = useDispatch();

    const data = props.data

    return (
        <>
            <tr 
                className={`hover:bg-gray-200 ${isActive && "bg-gray-200" } border-b cursor-pointer`}
                onClick={()=>setIsActive(prev => !prev)}
            >
                <td className="text-center">{data.ticker}</td>
                <td className="text-center">{parseFloat(data.avg_volume).toFixed(2)}</td>
                <td className="text-center">{parseFloat(data.amount).toFixed(2)}</td>
                <td className="text-center">{data.max_ex_date}</td>
                <td className="text-center">{parseFloat(data.atr).toFixed(2)}</td>
                <td className="text-center">{data.industry}</td>
            </tr>
            <div className={`${!isActive && "hidden" } flex items-center absolute items-center z-50 bg-gray-100 w-full py-2`}>
                <div className="mx-auto flex gap-2">
                    <Link 
                        className="bg-gray-200 hover:bg-green-300 hover:text-white px-2 rounded"
                        to='http://localhost:3000/backtests/dividends'
                        onClick={ () => {
                            dispatch(getDividendStats(data.ticker))
                        }}
                    >Dividends</Link>  
                    
                    <Link 
                        className="bg-gray-200 hover:bg-green-300 hover:text-white px-2 rounded"
                        to='#'
                        onClick={ () => {
                        }}
                    >Trade Idea</Link>  

                    <Link 
                        className="bg-gray-200 hover:bg-green-300 hover:text-white px-2 rounded"
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