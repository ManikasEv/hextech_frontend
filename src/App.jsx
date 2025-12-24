import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Careers from './pages/Careers'
import ServiceDetail from './components/ServiceDetail'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
    </Router>
  )
}

export default App
