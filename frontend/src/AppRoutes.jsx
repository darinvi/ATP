import { Route, Routes } from 'react-router-dom'
import Login from './components/accounts/Login'
import Home from './components/common/Home'
import Profile from './components/accounts/Profile'
import Features from './components/common/Features'
import Filing from './components/features/filings/Filing'

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/filings" element={<Filing />} />
            </Routes>
        </>
    )
} 