import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

import { ScrambleText } from '../components/shared/ScrambleText'
import { ScrollCounter } from '../components/shared/ScrollCounter'
import { ScrollPerspectiveText } from '../components/ui/ScrollPerspectiveText'
import { PageTransition } from '../components/layout/PageTransition'

import { AnimatedName } from '../components/cinematic/AnimatedName'
import { StatusBar } from '../components/cinematic/StatusBar'
import { AboutTeaser } from '../components/cinematic/AboutTeaser'
import { SelectedWork } from '../components/cinematic/SelectedWork'
import { CTASection } from '../components/cinematic/CTASection'

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

      {/* ─── Scene 3.5: Philosophy Statement (3D Perspective Scroll) ─── */}
      <ScrollPerspectiveText />

      {/* ─── Scene 4: CTA ─── */}
      <CTASection />

      {/* Bottom spacer for nav pill */}
      <div className="h-24" aria-hidden="true" />
    </PageTransition>
  )
}
