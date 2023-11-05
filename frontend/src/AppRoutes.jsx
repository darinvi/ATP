import { Route, Routes } from 'react-router-dom'
import Login from './components/accounts/Login'
import Home from './components/features/home/Home'
import Profile from './components/features/profile/Profile'
import Features from './components/common/Features'
import Filing from './components/features/filings/Filing'
import Reports from './components/features/reports/Reports'
import Journal from './components/features/journal/Journal'
import Tables from './components/features/tables/Tables'
import MentorPanel from './components/features/mentor/MentorPanel'
import DividendStats from './components/features/backtests/dividends/DividendStats'
import PlaybookForm from './components/features/playbooks/PlaybookForm'
import MarketProfile from './components/features/backtests/market/MarketProfile'

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
                <Route path="/backtests/dividends" element={<DividendStats />} />
                <Route path="/backtests/market-profile" element={<MarketProfile />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/mentor-panel" element={<MentorPanel />} />
                <Route path="/playbook" element={<PlaybookForm />} />
            </Routes>
        </>
    )
} 