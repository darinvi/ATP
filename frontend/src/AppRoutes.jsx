import { Route, Routes } from 'react-router-dom'
import Login from './components/accounts/Login'
import Home from './components/Home'
import Profile from './components/accounts/Profile'

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    )
} 