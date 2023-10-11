import { Link } from "react-router-dom"
import Logout from "../accounts/Logout"
import { useEffect } from "react"
import { loadUser } from "../../store/auth"
import { useDispatch, useSelector } from "react-redux"

export default function Headers() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)

    useEffect(()=>{
        if (!user) {
            dispatch(loadUser());
        }
    },[])

    return (
        <header className="fixed flex justify-between bg-cyan-800 text-2xl h-14 select-none w-full z-50 bg-opacity-95">
            
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
                ><Link to="/journal">Journal</Link></li>
                
                <li 
                    className="hover:bg-cyan-700 hover:text-white px-4 list-none h-full flex items-center"
                ><Link to="/profile">Profile</Link></li>
                
                <Logout />
            
            </ul>
        </header>
    )
}