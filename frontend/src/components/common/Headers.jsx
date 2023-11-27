import { Link } from "react-router-dom"
import Logout from "../accounts/Logout"
import { useEffect } from "react"
import { loadUser } from "../../store/auth"
import { useDispatch, useSelector } from "react-redux"

// 
import FeaturesDropdown from "./FeaturesDropdown"
// 
export default function Headers() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const isMentor = useSelector(state => state.auth.mentor)

    useEffect(() => {
        if (!user) {
            dispatch(loadUser());
        }
    }, [])

    return (
        <header className="flex justify-between bg-cyan-900 text-2xl text-gray-400 h-[8vh] select-none w-full tracking-wider sticky top-0 z-50">

            <ul className="flex items-center">

                <li
                    className="h-full"
                ><Link
                    className="h-full text-center hover:text-cyan-300 list-none h-full flex items-center"
                    to="/"
                ><img src={require("../../assets/logo.png")} alt="" className="h-full cursor-pointer px-2" /></Link></li>

                <li
                    className="h-full"
                ><FeaturesDropdown /></li>
            </ul>

            <ul className="flex items-center">
                {/* this should also be protected inside the component */}
                {isMentor && <>
                    <li
                        className="h-full"
                    ><Link to="/mentor-panel" className="h-full text-center px-6 hover:text-cyan-300 list-none h-full flex items-center">Mentor Panel</Link></li>
                </>}

                <li
                    className="h-full"
                ><Link className="h-full text-center px-6 hover:text-cyan-300 list-none h-full flex items-center" to="/profile">Profile</Link></li>

                <Logout />

            </ul>
        </header>
    )
}