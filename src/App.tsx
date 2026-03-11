import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import FundDetail from './pages/FundDetail/FundDetail'
import styles from './App.module.less'

function App() {
  return (
    <Router>
      <div className={styles['app-container']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fund/:code" element={<FundDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
