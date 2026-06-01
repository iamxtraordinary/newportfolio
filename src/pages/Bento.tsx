import { motion } from 'motion/react'
import { PageTransition } from '../components/layout/PageTransition'
import { BentoTile } from '../components/shared/BentoTile'
import { projects } from '../data/projects'
import { skills } from '../data/skills'

export default function Bento() {
  return (
    <PageTransition>
      <div className="min-h-screen pb-32">
        {/* Ambient radial glow background matching Cinematic */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at 50% -20%, var(--color-accent-glow), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-serif italic text-4xl md:text-5xl text-[var(--color-muted)] mb-4">
                Projects & Skills
              </h1>
              <div className="inline-block micro-label px-3 py-1.5 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                [DB_ACCESS_GRANTED]
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="micro-label text-[var(--color-text)]">
                {projects.length} Projects Live
              </span>
            </motion.div>
          </header>

          {/* Projects Section */}
          <section className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold uppercase tracking-tight">
                What I've <span className="text-[var(--color-accent)]">Built</span>
              </h2>
              <p className="text-[var(--color-muted)] mt-2 font-serif italic text-lg">
                Real-world applications solving real problems...
              </p>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <BentoTile key={project.id} delay={0.3 + index * 0.1}>
                  <div className="h-full p-8 md:p-10 flex flex-col relative group/card">
                    {/* Massive Ghost Number */}
                    <div
                      className="absolute -top-10 -right-4 font-[family-name:var(--font-display)] font-bold text-[10rem] leading-none opacity-[0.03] group-hover/card:opacity-[0.05] transition-opacity duration-500 pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Top Row: Icon & Period */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--color-border)]/20 flex items-center justify-center text-xl shadow-inner border border-white/5">
                        {index === 0 ? '📦' : index === 1 ? '💖' : index === 2 ? '🚗' : '🏢'}
                      </div>
                      <span className="micro-label text-[var(--color-muted)]">
                        {project.period}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <div className="mb-10 flex-grow">
                      <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 group-hover/card:text-[var(--color-accent)] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-[var(--color-muted)] text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="micro-label px-3 py-1.5 rounded-full bg-[var(--color-accent)]/[0.06] border border-[var(--color-accent)]/[0.12] text-[var(--color-accent)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </BentoTile>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold uppercase tracking-tight">
                Technical <span className="text-[var(--color-accent)]">Stack</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {/* Core Stack Tile (Spans 2 cols) */}
              <BentoTile colSpan={2} delay={0.1}>
                <div className="h-full p-8 bg-gradient-to-br from-[var(--color-text)] to-[var(--color-muted)] text-[var(--color-bg)] flex flex-col justify-center relative overflow-hidden group/core">
                  <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 group-hover/core:scale-110 transition-transform duration-700">
                    <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase mb-4 relative z-10">
                    Core Arsenal
                  </h3>
                  <ul className="font-mono text-sm space-y-2 relative z-10 font-medium">
                    <li>Flutter · Dart</li>
                    <li>Firebase · REST</li>
                    <li>React · TypeScript</li>
                  </ul>
                </div>
              </BentoTile>

              {/* Individual Skill Tiles */}
              {skills.map((skill, i) => {
                const Icon = skill.icon
                return (
                  <BentoTile key={skill.name} delay={0.2 + i * 0.05}>
                    <div className="p-6 h-full flex flex-col items-center justify-center text-center group/skill">
                      <motion.div
                        className="mb-4 text-[var(--color-accent)]"
                        whileHover={{ scale: 1.1, rotate: [-5, 5, -5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon size={32} strokeWidth={1.5} />
                      </motion.div>
                      <h4 className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wide group-hover/skill:text-[var(--color-text)] text-[var(--color-muted)] transition-colors">
                        {skill.name}
                      </h4>
                      <span className="micro-label text-[var(--color-border)] mt-2">
                        {skill.level}
                      </span>
                    </div>
                  </BentoTile>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}
