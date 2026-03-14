import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Home from './pages/Home'
import Careers from './pages/Careers'
import ServiceDetail from './components/ServiceDetail'
import ScrollToTop from './components/ScrollToTop'
import { TranslationProvider } from './contexts/TranslationContext'

function App() {
  const dotRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const trailCanvas = trailRef.current
    if (!dot || !trailCanvas) return

    let mouseX = 0
    let mouseY = 0
    let hasMoved = false
    let rafId = 0
    const TRAIL_LEN = 28
    const pts = Array.from({ length: TRAIL_LEN }, () => ({ x: 0, y: 0 }))
    let tipX = 0
    let tipY = 0

    // Size canvas to viewport
    const resize = () => {
      trailCanvas.width = window.innerWidth
      trailCanvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const ctx = trailCanvas.getContext('2d')
    if (!ctx) return

    // Move dot immediately with pointer — no lag
    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`

      // Show dot only after real mouse position is known
      if (!hasMoved) {
        hasMoved = true
        // Snap trail to current position so it doesn't drag from 0,0
        tipX = mouseX
        tipY = mouseY
        pts.forEach(p => { p.x = mouseX; p.y = mouseY })
        dot.style.opacity = '1'
      }
    }

    // Draw fading trail that lags behind the dot
    const drawTrail = () => {
      tipX += (mouseX - tipX) * 0.16
      tipY += (mouseY - tipY) * 0.16
      pts.push({ x: tipX, y: tipY })
      pts.shift()

      ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height)
      for (let i = 1; i < pts.length; i++) {
        const a = i / pts.length
        ctx.beginPath()
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y)
        ctx.lineTo(pts[i].x, pts[i].y)
        ctx.strokeStyle = `rgba(0,187,229,${a * 0.8})`
        ctx.lineWidth = 2.5 * a
        ctx.lineCap = 'round'
        ctx.stroke()
      }
      rafId = requestAnimationFrame(drawTrail)
    }

    // Hover effects — shrink dot over interactive elements
    const onEnter = () => dot.classList.add('hovering')
    const onLeave = () => dot.classList.remove('hovering')

    // Debounced hover attachment — avoids hammering during DOM mutations
    let hoverTimer = null
    const attachHover = () => {
      clearTimeout(hoverTimer)
      hoverTimer = setTimeout(() => {
        document.querySelectorAll(
          'a, button, [role="button"], input, textarea, select, label, .cursor-pointer'
        ).forEach(el => {
          el.removeEventListener('mouseenter', onEnter)
          el.removeEventListener('mouseleave', onLeave)
          el.addEventListener('mouseenter', onEnter)
          el.addEventListener('mouseleave', onLeave)
        })
      }, 200)
    }

    // Enable custom cursor — dot starts invisible until first mousemove
    document.body.classList.add('custom-cursor-enabled')
    dot.style.opacity = '0'

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })

    attachHover()

    // Watch for new interactive elements added to the DOM
    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })

    rafId = requestAnimationFrame(drawTrail)

    return () => {
      document.body.classList.remove('custom-cursor-enabled')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
      clearTimeout(hoverTimer)
      observer.disconnect()
    }
  }, [])

  return (
    <TranslationProvider>
      <div ref={dotRef} className="custom-cursor-dot" />
      <canvas ref={trailRef} className="custom-cursor-trail" />

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
