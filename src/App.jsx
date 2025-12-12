import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ServiceDetail from './components/ServiceDetail'
import Careers from './pages/Careers'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </Router>
  )
}

export default App
