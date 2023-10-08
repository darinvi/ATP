import { Link } from "react-router-dom"
import Logout from "../accounts/Logout"

export default function Headers() {
    return (
        <header className="flex justify-between bg-cyan-800 text-2xl h-14 select-none">
            
            <ul className="flex items-center">
                
                <li
                    className="hover:bg-cyan-700 hover:text-white px-4 list-none h-full flex items-center"
                ><Link to="/">Home</Link></li>
                
                <li
                    className="hover:bg-cyan-700 hover:text-white px-4 list-none h-full flex items-center"
                ><Link to="/features">Features</Link></li>

            </ul>

            <ul className="flex items-center">
                <li
                    className="hover:bg-cyan-700 hover:text-white px-4 list-none h-full flex items-center"
                >Journal</li>
                
                <li 
                    className="hover:bg-cyan-700 hover:text-white px-4 list-none h-full flex items-center"
                ><Link to="/profile">Profile</Link></li>
                
                <Logout />
            
            </ul>
        </header>
    )
}