import { useSelector, useDispatch } from "react-redux"
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from "./AppRoutes";
import Headers from "./components/common/Headers.jsx";
import Login from "./components/accounts/Login";
import { loadMentorStatus } from "./store/auth";

export default function ProtectedApp() {
    const isAuth = useSelector(state => state.auth.authenticated)
    const isMentor = useSelector(state => state.auth.mentor)
    const dispatch = useDispatch();

    // LogOut Doesn't Work If Token Inspired
    return <Router>
        {
            isAuth
                ?
                <>
                    { isMentor === null && (()=>{
                        dispatch(loadMentorStatus())
                    })()}
                    <Headers />
                    <div className="relative h-full w-full flex select-none min-h-[92vh] bg-cyan-800">
                        <AppRoutes />
                    </div>
                </>
                :
                <Login />
        }
    </Router >
}