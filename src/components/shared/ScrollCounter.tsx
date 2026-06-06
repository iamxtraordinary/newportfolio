import {
  motion,
  useSpring,
  useMotionValueEvent,
} from 'motion/react'
import { useState } from 'react'
import { useScroll } from 'motion/react'

/* ─── Scroll Progress Counter ─── */
export function ScrollCounter() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })
  const [percent, setPercent] = useState(0)

  useMotionValueEvent(smoothProgress, 'change', (v) => {
    setPercent(Math.round(v * 100))
  })

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 micro-label text-[var(--color-accent)] tracking-[0.3em]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      [ {String(percent).padStart(2, '0')}% ]
    </motion.div>
  )
}
