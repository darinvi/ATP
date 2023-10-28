import { Link } from "react-router-dom"

export default function Features() {

    const links = [
        <Link to="/filings">Filings</Link>,
        <Link to="/tables">Tables</Link>,
        <Link to="/reports">Reports</Link>,
        <Link to="/backtests">Backtests</Link>,
        <Link to="">PlayBooks</Link>,
        <Link to="/journal">Journal</Link>
    ]

    const renderLinks = links.map( l => {
        return <div className="hover:bg-cyan-300 w-full px-4 py-2 hover:text-black">{l}</div>
    })

    return renderLinks
}