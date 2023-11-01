import { useDispatch } from "react-redux"
import { logout } from "../../store/auth";

export default function Logout() {
    const dispatch = useDispatch(); 

    function handleLogout(){
        dispatch(logout())
    }
    return <li  className="hover:bg-cyan-700 hover:text-white px-4 list-none h-full flex items-center cursor-pointer" onClick={handleLogout}>Logout</li>
}