import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Hero from './components/hero'
import AboutUs from './components/aboutus'
import Services from './components/services'
import Contact from './components/contact'
import Footer from './components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <Services />
      <Contact />
      <Footer />

    </>
  )
}

export default App
