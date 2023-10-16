import { Route, Routes } from 'react-router-dom'
import Login from './components/accounts/Login'
import Home from './components/common/Home'
import Profile from './components/features/profile/Profile'
import Features from './components/common/Features'
import Filing from './components/features/filings/Filing'
import Reports from './components/features/reports/Reports'
import Journal from './components/features/journal/Journal'

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/filings" element={<Filing />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/journal" element={<Journal />} />
            </Routes>
        </>
    )
} 