import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { MagneticButton } from '../shared/MagneticButton'

/* ─── Scene 4: CTA ─── */
export function CTASection() {
  const navigate = useNavigate()
  const words = ['Let\'s', 'build', 'something']

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-8">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, var(--color-accent-glow), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative text-center">
        <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9]">
          {words.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            className="inline-block text-[var(--color-accent)]"
            initial={{ opacity: 0, y: 40, filter: 'blur(16px)', scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            extraordinary.
          </motion.span>
        </h2>

        {/* Accent underline */}
        <motion.div
          className="h-[2px] bg-[var(--color-accent)] mx-auto mt-6"
          initial={{ scaleX: 0, width: 80 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          aria-hidden="true"
        />

        <div className="mt-12">
          <MagneticButton onClick={() => navigate('/about')}>
            Get in touch
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
