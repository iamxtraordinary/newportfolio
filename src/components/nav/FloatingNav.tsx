import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Sparkles, Code, User } from 'lucide-react'
import { cn } from '../../lib/cn'

const NAV_ITEMS = [
  { path: '/', label: 'Intro', icon: Sparkles },
  { path: '/projects', label: 'Projects', icon: Code },
  { path: '/about', label: 'About', icon: User },
] as const

export function FloatingNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 z-[1000] flex items-center gap-1.5 p-1.5 rounded-full"
      style={{
        x: '-50%',
        background: 'rgba(8, 8, 10, 0.9)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow:
          '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)',
      }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 30,
        delay: 0.8,
      }}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path
        const Icon = item.icon

        return (
          <motion.button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors duration-200',
              'text-[11px] uppercase tracking-[0.15em] font-semibold',
              isActive ? 'text-[var(--color-text)]' : 'text-[var(--color-border)] hover:text-[var(--color-text)]'
            )}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.label}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-white/[0.08]"
                style={{
                  boxShadow: '0 0 20px var(--color-accent-glow)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 30,
                }}
              />
            )}
            <Icon size={16} className="relative z-10" />
            <span className="relative z-10 hidden md:inline">{item.label}</span>
          </motion.button>
        )
      })}
    </motion.nav>
  )
}
