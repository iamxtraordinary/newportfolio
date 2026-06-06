import { motion } from 'motion/react'

/* ─── Top Status Bar ─── */
export function StatusBar() {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-[family-name:var(--font-mono)] text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
        System Online // v4.2
      </span>
      <div className="flex flex-col items-end gap-0.5">
        <span className="font-[family-name:var(--font-mono)] text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
          [01] Cinematic
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--color-border)]">
          [02] Intro
        </span>
      </div>
    </motion.div>
  )
}
