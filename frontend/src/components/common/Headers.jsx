import { Link } from "react-router-dom"
import Logout from "../accounts/Logout"
import { useEffect } from "react"
import { loadUser } from "../../store/auth"
import { useDispatch, useSelector } from "react-redux"

// 
import MarketStats from "./FeaturesDropdown"
// 
export default function Headers() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const isMentor = useSelector(state => state.auth.mentor)

    useEffect(()=>{
        if (!user) {
            dispatch(loadUser());
        }
    },[])

    return (
        <header className="flex justify-between bg-cyan-800 text-2xl h-14 select-none w-full tracking-wider">
            
            <ul className="flex items-center">
                
                <li
                    className="hover:bg-cyan-700 hover:text-white px-6 list-none h-full flex items-center"
                ><Link to="/">Home</Link></li>
                
                <li
                    className="hover:bg-cyan-700 hover:text-white px-6 list-none h-full flex items-center"
                ><MarketStats /></li>

            </ul>

            <ul className="flex items-center">
                {/* this should also be protected inside the component */}
                { isMentor && <>
                    <li
                        className="hover:bg-cyan-700 hover:text-white px-6 list-none h-full flex items-center"
                    ><Link to="/mentor-panel">Mentor Panel</Link></li>
                </> }
                
                <li 
                    className="hover:bg-cyan-700 hover:text-white px-6 list-none h-full flex items-center"
                ><Link to="/profile">Profile</Link></li>
                
                <Logout />
            
            </ul>
        </header>
    )
}