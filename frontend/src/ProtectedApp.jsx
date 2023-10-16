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

    return <Router>
        {
            isAuth
                ?
                <>
                    { isMentor === null && (()=>{
                        console.log('dawe')
                        dispatch(loadMentorStatus())
                    })() }
                    <Headers />
                    <div className="relative h-full flex">
                        <AppRoutes />
                    </div>
                </>
                :
                <Login />
        }
    </Router >
}