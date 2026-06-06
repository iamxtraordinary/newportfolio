import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { projects } from '../../data/projects'
import { ContainerScroll } from '../ui/ContainerScroll'

/* ─── Scene 3: Selected Work (3-D Scroll) ─── */
export function SelectedWork() {
  const navigate = useNavigate()

  return (
    <section className="relative">
      {/* Global Sticky Header with high z-index to avoid being covered by scaling cards */}
      <div className="sticky top-8 md:top-12 z-[100] w-full flex flex-col items-center pointer-events-none">
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
      </div>

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
