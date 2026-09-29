import './App.css'
import Header from './components/Header'
import TokenCard from './layout/TokenCard'
import WaitingList from './layout/WaitingList'
import AdminCounter from './components/AdminCounter'
import AuthPage from './auth/AuthPage'
import { getAccessToken, isAdmin } from './auth/session'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

function PublicQueue() {
  return (
    <div className="App">
      <Header />
      <main className="queue-content">
        <TokenCard />
        <WaitingList />
      </main>
    </div>
  )
}

function UserRoute({ children }) {
  const location = useLocation()

  if (!getAccessToken()) {
    return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />
  }

  return children
}

function AdminRoute({ children }) {
  const location = useLocation()

  if (!getAccessToken()) {
    return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />
  }

  return isAdmin() ? children : <Navigate to="/" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserRoute><PublicQueue /></UserRoute>} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/admin/login" element={<AuthPage adminLogin />} />
      <Route path="/admin/signup" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin-counter" element={<AdminRoute><AdminCounter /></AdminRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
