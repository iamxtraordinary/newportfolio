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
import { ScrollPerspectiveText } from '../components/ui/ScrollPerspectiveText'
import { PageTransition } from '../components/layout/PageTransition'
import { ShaderAnimation } from '../components/ui/shader-animation'
import { Silk } from '../components/ui/Silk'

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
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 15%', 'start -5%']
  })

  // Fade out the sticky header as soon as it reaches the top of the viewport
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={sectionRef} className="relative">
      {/* Global Sticky Header with high z-index to avoid being covered by scaling cards */}
      <motion.div 
        style={{ opacity: headerOpacity }}
        className="sticky top-8 md:top-12 z-[100] w-full flex flex-col items-center pointer-events-none"
      >
        <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
          <span className="font-[family-name:var(--font-display)] text-xs md:text-sm uppercase tracking-wider text-[var(--color-muted)]">
            Selected Work
          </span>
          <div className="h-px w-8 md:w-12 bg-[var(--color-border)]" aria-hidden="true" />
          <span className="font-[family-name:var(--font-mono)] text-[9px] md:text-[10px] px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] uppercase tracking-widest">
            {projects.length}
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[4rem] font-bold uppercase tracking-tight leading-none text-[var(--color-text)] drop-shadow-xl">
          Featured Projects
        </h2>
      </motion.div>

      {/* Projects Container - Pulling it up so it sits under the sticky header nicely */}
      <div className="relative -mt-[8rem] md:-mt-[10rem]">
        {projects.map((project, i) => (
          <ContainerScroll
            key={project.id}
            index={i + 1}
            titleComponent={null}
          
        >
          {/* ── Cinematic Poster Content ── */}
          <motion.div
            className="w-full h-full relative rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer bg-[#050505]"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => project.link ? window.open(project.link, '_blank') : navigate('/projects')}
          >
            {/* Background Image */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 grayscale-[20%]"
              loading="lazy"
            />
            
            {/* Vignette & Cinematic Overlays (Crushing Shadows) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70 pointer-events-none" />
            
            {/* Centered Typography */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 md:p-10 text-center">
              <motion.h3 
                className="font-[family-name:var(--font-display)] text-6xl md:text-[7.5rem] font-bold uppercase tracking-tighter leading-[0.85] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,1)] transition-transform duration-700 group-hover:scale-[1.02]"
              >
                {project.title}
              </motion.h3>
              <motion.p 
                className="font-[family-name:var(--font-display)] text-sm md:text-[1rem] font-medium uppercase tracking-[0.2em] text-white/80 mt-4 md:mt-6 max-w-3xl drop-shadow-xl"
              >
                {project.description}
              </motion.p>
            </div>
          </motion.div>
        </ContainerScroll>
      ))}
      </div>

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

  return (
    <section className="h-screen flex items-center justify-center relative z-10 overflow-hidden">
      {/* 1. Ambient glow behind CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,var(--color-accent-glow),transparent_70%)] pointer-events-none"
      />
      
      <motion.div 
        className="text-center px-4 max-w-4xl relative z-10"
      >
        {/* 2. Main Headline */}
        <h2
          className="text-6xl md:text-[8vw] font-bold leading-[0.9] tracking-tight uppercase font-[family-name:var(--font-display)]"
        >
          {/* 3. Staggered word pop-in/out */}
          {["Let's", "build", "something"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 60, scale: 0.7, rotate: -4, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
              viewport={{ margin: "-100px" }}
              transition={{
                delay: 0.15 * i, // Sequence stagger
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1], // Custom easing curve
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
          <br />
          {/* 4. "extraordinary." — dramatic accent pop in/out */}
          <motion.span
            initial={{ opacity: 0, y: 80, scale: 0.5, rotate: 6, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            viewport={{ margin: "-100px" }}
            transition={{
              delay: 0.55,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block text-[var(--color-accent)] mt-2 md:mt-0"
          >
            extraordinary.
          </motion.span>
        </h2>

        {/* 5. Accent underline sweep */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-[2px] bg-[var(--color-accent)] mx-auto mt-8 origin-left"
        />
        
        {/* 6. Magnetic Button Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex justify-center"
        >
          <MagneticButton onClick={() => navigate('/about')}>
            Get in touch
          </MagneticButton>
        </motion.div>
      </motion.div>
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
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <PageTransition>
      <ScrollCounter />

      {/* Global Silk Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Silk
          speed={5}
          scale={1.6}
          color="#0D1B2A"
          bgColor="#120F17"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* ─── Scene 1: Hero ─── */}
      <section ref={heroRef} className="relative h-[130vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Shader Background */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              opacity: spotlightOpacity,
            }}
            aria-hidden="true"
          >
            <ShaderAnimation />
          </motion.div>



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

      {/* ─── Scene 3.5: Philosophy Statement (3D Perspective Scroll) ─── */}
      <ScrollPerspectiveText />

      {/* ─── Scene 4: CTA ─── */}
      <CTASection />

      {/* Bottom spacer for nav pill */}
      <div className="h-24" aria-hidden="true" />
    </PageTransition>
  )
}
