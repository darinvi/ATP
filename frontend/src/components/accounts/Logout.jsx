import { useDispatch } from "react-redux"
import { logout } from "../../store/auth";

export default function Logout() {
    const dispatch = useDispatch(); 

    function handleLogout(){
        dispatch(logout())
    }
    return <li  className="hover:text-cyan-300 px-4 list-none h-full cursor-pointer" onClick={handleLogout}>Logout</li>
}