import { Link } from "react-router-dom"

export default function Features(){
    return <ul className="flex flex-col gap-4 select-none">
        <li><Link to="/filings">Filings</Link></li>
        <li><Link to="/tables">Tables</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/backtests">Backtests</Link></li>
    </ul>
}