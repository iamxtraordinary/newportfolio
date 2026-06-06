import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { FloatingNav } from './components/nav/FloatingNav'

const Cinematic = lazy(() => import('./pages/Cinematic'))
const Bento = lazy(() => import('./pages/Bento'))
const Brutalist = lazy(() => import('./pages/Brutalist'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <FloatingNav />
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <div className="h-screen w-full flex items-center justify-center">
              <div className="micro-label text-[var(--color-muted)] animate-pulse">
                Loading...
              </div>
            </div>
          }
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Cinematic />} />
            <Route path="/projects" element={<Bento />} />
            <Route path="/about" element={<Brutalist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  )
}
