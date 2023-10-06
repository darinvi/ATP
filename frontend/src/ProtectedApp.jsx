import { useSelector } from "react-redux/es/hooks/useSelector"
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from "./AppRoutes";
import Headers from "./components/Headers.jsx";
import Login from "./components/accounts/Login";


export default function ProtectedApp() {
    const isAuth = useSelector(state => state.auth.authenticated)

    return <Router>
        {
            isAuth
                ?
                <>
                    <Headers />
                    <div className="relative h-full flex">
                        <h1 className="h-[100vh] bg-cyan-800 w-2"></h1>
                        <AppRoutes />
                    </div>
                </>
                :
                <Login />
        }
    </Router >
}