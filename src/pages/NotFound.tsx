import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { PageTransition } from '../components/layout/PageTransition'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="h-screen flex flex-col items-center justify-center px-8 text-center">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 50%, var(--color-accent-glow), transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Giant 404 */}
        <motion.h1
          className="font-[family-name:var(--font-display)] text-[30vw] md:text-[20vw] font-bold uppercase leading-none tracking-tighter text-[var(--color-border)]/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          className="relative -mt-16 md:-mt-24 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-4xl font-bold uppercase tracking-tight text-[var(--color-text)]">
            Page Not Found
          </h2>
          <p className="font-[family-name:var(--font-mono)] text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-muted)] max-w-md mx-auto">
            The route you're looking for doesn't exist or has been moved.
          </p>

          <motion.button
            onClick={() => navigate('/')}
            className="px-8 py-3 rounded-full border border-[var(--color-accent)] text-[var(--color-accent)] font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    </PageTransition>
  )
}
