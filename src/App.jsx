import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Careers from './pages/Careers'
import ServiceDetail from './components/ServiceDetail'
import ScrollToTop from './components/ScrollToTop'
import { TranslationProvider } from './contexts/TranslationContext'

function App() {
  return (
    <TranslationProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
      </Router>
    </TranslationProvider>
  )
}

export default App
