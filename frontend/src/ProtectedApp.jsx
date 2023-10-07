import { useSelector } from "react-redux/es/hooks/useSelector"
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from "./AppRoutes";
import Headers from "./components/common/Headers.jsx";
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
                        <AppRoutes />
                    </div>
                </>
                :
                <Login />
        }
    </Router >
}