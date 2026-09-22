import './App.css'
import Header from './components/Header'
import TokenCard from './layout/TokenCard'
import WaitingList from './layout/WaitingList'
import AdminCounter from './layout/AdminCounter'
import { Navigate, Route, Routes } from 'react-router-dom'

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicQueue />} />
      <Route path="/admin-counter" element={<AdminCounter />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
