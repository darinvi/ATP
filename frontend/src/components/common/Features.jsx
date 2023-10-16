import { Link } from "react-router-dom"

export default function Features(){
    return <ul className="flex flex-col gap-4 select-none">
        <li><Link to="/filings">Filings</Link></li>
        <li><Link>Tables</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li>Backtests</li>
    </ul>
}