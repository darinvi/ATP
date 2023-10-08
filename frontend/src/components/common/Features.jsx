import { Link } from "react-router-dom"

export default function Features(){
    return <ul className="flex flex-col gap-4">
        <li><Link to="/filings">Filings</Link></li>
        <li><Link>wtf</Link></li>
        <li><Link>wtf</Link></li>
    </ul>
}