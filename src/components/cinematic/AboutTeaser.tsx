import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'

/* ─── Scene 2: About Teaser ─── */
export function AboutTeaser() {
  const navigate = useNavigate()
  const [photosExpanded, setPhotosExpanded] = useState(false)

  const stats = [
    { value: '2+', label: 'Years of Experience' },
    { value: '4', label: 'Completed Projects' },
    { value: '5+', label: 'Clients Worldwide' },
  ]

  return (
    <section className="relative mt-16 md:mt-22 py-24 md:py-32 px-8 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-center justify-between">
        {/* Left: Text */}
        <motion.div
          className="w-full md:w-[45%] space-y-8"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold uppercase tracking-tight text-[var(--color-text)]">
            Hello there
            <motion.span
              className="inline-block w-3 h-3 bg-[var(--color-accent)] rounded-full ml-3 align-middle"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              aria-hidden="true"
            />
          </h2>
          <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-[var(--color-text)]/70 leading-relaxed max-w-lg">
            I'm Emmanuel, a software developer passionate about crafting
            meaningful and impactful services. Let's work together.
          </p>

          {/* Stats */}
          <div className="flex gap-10 md:gap-14">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--color-accent)]">
                  {stat.value}
                </span>
                <span className="block font-[family-name:var(--font-mono)] text-[10px] md:text-xs uppercase tracking-widest text-[var(--color-text)]/50 mt-2 max-w-[120px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <motion.button
            onClick={() => navigate('/about')}
            className="px-8 py-3 rounded-full border border-[var(--color-accent)] text-[var(--color-accent)] font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            About Me
          </motion.button>
        </motion.div>

        {/* Right: Portrait Card & Photo Stack */}
        <motion.div
          className="relative flex justify-end items-center min-h-[400px] md:min-h-[520px] w-full md:w-[50%]"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Extra Photo 1 — Dangote (fanning out to the left from behind) */}
          <AnimatePresence>
            {photosExpanded && (
              <motion.div
                className="absolute z-[5] rounded-[1.5rem] overflow-hidden w-44 md:w-56 aspect-[3/4] shadow-2xl cursor-grab active:cursor-grabbing"
                initial={{ x: 0, y: 0, rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{ x: -390, y: -40, rotate: -12, scale: 1.1, opacity: 1 }}
                exit={{ x: 0, y: 0, rotate: 0, scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.05 }}
                drag
                dragMomentum={true}
                dragElastic={0.6}
                whileHover={{ scale: 1.2 }}
                whileDrag={{ scale: 1.5, rotate: 0, zIndex: 100 }}
              >
                <img
                  src="/dangote.webp"
                  alt="Photo of Emmanuel"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Extra Photo 2 — Car (fanning out to the right from behind) */}
          <AnimatePresence>
            {photosExpanded && (
              <motion.div
                className="absolute z-[5] rounded-[1.5rem] overflow-hidden w-44 md:w-56 aspect-[3/4] shadow-2xl cursor-grab active:cursor-grabbing"
                initial={{ x: 0, y: 0, rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{ x: 190, y: 80, rotate: 10, scale: 1.1, opacity: 1 }}
                exit={{ x: 0, y: 0, rotate: 0, scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.1 }}
                drag
                dragMomentum={true}
                dragElastic={0.6}
                whileHover={{ scale: 1.2 }}
                whileDrag={{ scale: 1.5, rotate: 0, zIndex: 100 }}
              >
                <img
                  src="/car.webp"
                  alt="Photo of Emmanuel"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Portrait Card — slanted, elevated slightly when expanded */}
          <motion.div
            className="relative z-10 cursor-pointer group"
            onClick={() => setPhotosExpanded(!photosExpanded)}
            animate={photosExpanded
              ? { scale: 1.03, rotate: 0 }
              : { scale: 1, rotate: -3 }
            }
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Accent Ring */}
            <div
              className="absolute -inset-3 rounded-[2.5rem] border border-[var(--color-accent)]/20 pointer-events-none"
              aria-hidden="true"
            />
            {/* Frame */}
            <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-[3/4] w-72 md:w-[420px] shadow-2xl bg-[var(--color-bg)]">
              <img
                src="/Me.webp"
                alt="Emmanuel Okaka"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                width={420}
                height={560}
              />
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Tap hint capsule */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="micro-label text-white bg-black/60 px-5 py-2 rounded-full backdrop-blur-sm">
                {photosExpanded ? 'Tap to close' : 'Tap me'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
