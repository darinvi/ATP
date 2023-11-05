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
        <header className="flex justify-between bg-cyan-800 text-2xl h-[8vh] select-none w-full tracking-wider">

            <ul className="flex items-center">

                <li
                    className="h-full"
                ><Link
                    className="h-full text-center hover:bg-cyan-700 hover:text-white list-none h-full flex items-center"
                    to="/"
                ><img src={require("../../assets/logo.png")} alt="" className="h-full cursor-pointer hover:bg-cyan-700 px-2" /></Link></li>

                <li
                    className="h-full"
                ><FeaturesDropdown /></li>

            </ul>

            <ul className="flex items-center">
                {/* this should also be protected inside the component */}
                {isMentor && <>
                    <li
                        className="h-full"
                    ><Link to="/mentor-panel" className="h-full text-center px-6 hover:bg-cyan-700 hover:text-white list-none h-full flex items-center">Mentor Panel</Link></li>
                </>}

                <li
                    className="h-full"
                ><Link className="h-full text-center px-6 hover:bg-cyan-700 hover:text-white list-none h-full flex items-center" to="/profile">Profile</Link></li>

                <Logout />

            </ul>
        </header>
    )
}