import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { projects } from '../data/projects'
import { ScrambleText } from '../components/shared/ScrambleText'
import { MagneticButton } from '../components/shared/MagneticButton'
import { ContainerScroll } from '../components/ui/ContainerScroll'
import { PageTransition } from '../components/layout/PageTransition'

/* ─── Hero Name Letter Animation ─── */
function AnimatedName() {
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

/* ─── Top Status Bar ─── */
function StatusBar() {
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
/* ─── Available Badge ─── */
function AvailableBadge() {
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

/* ─── Scroll Progress Counter ─── */
function ScrollCounter() {
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

/* ─── Scene 2: About Teaser ─── */
function AboutTeaser() {
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

/* ─── Scene 3: Selected Work (3-D Scroll) ─── */
function SelectedWork() {
  const navigate = useNavigate()

  return (
    <section className="relative">
      <ContainerScroll
        titleComponent={
          <>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="font-[family-name:var(--font-display)] text-sm uppercase tracking-wider text-[var(--color-muted)]">
                Selected Work
              </span>
              <div className="h-px w-12 bg-[var(--color-border)]" aria-hidden="true" />
              <span className="font-[family-name:var(--font-mono)] text-[10px] px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] uppercase tracking-widest">
                {projects.length}
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-[4rem] font-bold uppercase tracking-tight leading-none text-[var(--color-text)]">
              Projects
            </h2>
          </>
        }
      >
        {/* ── Dashboard Window Chrome ── */}
        <div className="h-full flex flex-col">
          {/* Window title bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]/30">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
              projects_explorer.exe
            </span>
            <div className="w-16" /> {/* spacer for symmetry */}
          </div>

          {/* 2×2 Project Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 overflow-y-auto">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="group relative rounded-xl overflow-hidden border border-[var(--color-border)]/20 bg-[var(--color-bg)] cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => project.link ? window.open(project.link, '_blank') : navigate('/projects')}
              >
                {/* Project Image */}
                <div className="relative h-28 md:h-40 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-60" />
                  {/* Period badge */}
                  <span className="absolute top-2 right-2 font-[family-name:var(--font-mono)] text-[9px] md:text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-black/50 text-[var(--color-muted)] backdrop-blur-sm">
                    {project.period}
                  </span>
                </div>

                {/* Project Info */}
                <div className="p-3 md:p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-[family-name:var(--font-display)] text-sm md:text-base font-bold uppercase tracking-wider text-[var(--color-text)]">
                      {project.title}
                    </h3>
                    <ArrowRight
                      size={14}
                      className="text-[var(--color-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
                    />
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-[11px] md:text-xs text-[var(--color-text)]/50 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-[family-name:var(--font-mono)] text-[8px] md:text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-[var(--color-accent)]/20 text-[var(--color-accent)]/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ContainerScroll>

      {/* View All Projects button */}
      <div className="relative z-50 flex justify-center -mt-40 pb-24">
        <motion.button
          onClick={() => navigate('/projects')}
          className="group flex items-center gap-3 px-10 py-4 rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-[family-name:var(--font-display)] text-sm uppercase tracking-wider">
            View All Projects
          </span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.button>
      </div>
    </section>
  )
}

/* ─── Scene 4: CTA ─── */
function CTASection() {
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

/* ─── Main Cinematic Page ─── */
export default function Cinematic() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const taglineY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const spotlightScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5])
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <PageTransition>
      <ScrollCounter />

      {/* ─── Scene 1: Hero ─── */}
      <section ref={heroRef} className="relative h-[130vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Radial spotlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 45%, var(--color-accent-glow), transparent 70%)',
              scale: spotlightScale,
              opacity: spotlightOpacity,
            }}
            aria-hidden="true"
          />

          {/* Status bar */}
          <StatusBar />

          {/* Hero content */}
          <div className="relative z-10 text-center w-full px-4 md:px-8">
            <motion.div
              style={{
                y: heroY,
                scale: heroScale,
                opacity: heroOpacity,
              }}
            >
              {/* First name */}
              <AnimatedName />
            </motion.div>

            {/* Tagline */}
            <motion.div
              className="mt-10"
              style={{ y: taglineY }}
            >
              <ScrambleText
                text="Mobile & Backend Engineer"
                delay={1200}
                className="font-[family-name:var(--font-mono)] text-[10px] md:text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]"
              />
              <motion.div
                className="h-[1px] w-8 bg-[var(--color-accent)] mx-auto mt-5"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0.5 }}
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Scene 2: About Teaser ─── */}
      <AboutTeaser />

      {/* ─── Scene 3: Selected Work (3-D Scroll) ─── */}
      <SelectedWork />

      {/* ─── Scene 4: CTA ─── */}
      <CTASection />

      {/* Bottom spacer for nav pill */}
      <div className="h-24" aria-hidden="true" />
    </PageTransition>
  )
}
