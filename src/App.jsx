import './App.css'
import Header from './components/Header'
import TokenCard from './layout/TokenCard'
import WaitingList from './layout/WaitingList'


function App() {
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

export default App
