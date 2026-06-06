import { motion } from 'motion/react'

/* ─── Available Badge ─── */
export function AvailableBadge() {
  return (
    <motion.div
      className="flex justify-center my-3 md:my-4 relative z-20"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 1.0,
      }}
    >
      <motion.div
        className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.05] border border-white/[0.12] backdrop-blur-md"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
          Available for Work
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ─── Hero Name Letter Animation ─── */
export function AnimatedName() {
  const firstName = 'Emmanuel'
  const lastName = 'Okaka'

  const renderLetters = (word: string, offset: number) =>
    word.split('').map((letter, i) => (
      <span key={`${word}-${i}`} className="inline-block overflow-hidden">
        <motion.span
          className="inline-block"
          initial={{ y: '110%', rotate: 12, opacity: 0 }}
          animate={{ y: '0%', rotate: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.1 + (offset + i) * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {letter}
        </motion.span>
      </span>
    ))

  return (
    <div>
      <AvailableBadge />
      <h1
        className="font-[family-name:var(--font-display)] font-bold uppercase leading-[0.82] tracking-[-0.04em] text-[20vw] text-[var(--color-text)]"
        aria-label="Emmanuel Okaka"
      >
        <span className="block">{renderLetters(firstName, 0)}</span>
        <span className="block text-center">{renderLetters(lastName, firstName.length)}</span>
      </h1>
    </div>
  )
}
