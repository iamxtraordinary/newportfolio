import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { X, ExternalLink } from 'lucide-react'
import type { Project } from '../../data/projects'

interface PeelCardProps {
  project: Project
  index: number
  total: number
}

export function PeelCard({ project, index, total }: PeelCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -5])
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.3])

  const padIndex = String(index + 1).padStart(2, '0')
  const padTotal = String(total).padStart(2, '0')

  return (
    <>
      <div ref={ref} className="h-[150vh] w-full relative">
        <motion.div
          className="sticky top-0 h-screen w-full flex items-center justify-center px-4 md:px-8"
        style={{
          scale,
          rotateX,
          opacity,
          transformPerspective: 1200,
          zIndex: total - index,
        }}
      >
        <div
          className="relative w-full max-w-6xl h-[80vh] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer group"
          onClick={() => setModalOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="button"
          tabIndex={0}
          aria-label={`View project: ${project.title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setModalOpen(true)
          }}
        >
          {/* Background image */}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Ghost number */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ opacity: isHovered ? 0 : 0.15 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="font-[family-name:var(--font-display)] font-bold text-[10rem] md:text-[18rem] leading-none uppercase"
              style={{
                WebkitTextStroke: '2px var(--color-border)',
                WebkitTextFillColor: 'var(--color-bg)',
              }}
              aria-hidden="true"
            >
              {padIndex}
            </span>
          </motion.div>

          {/* Top-right index */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8">
            <span className="micro-label text-[var(--color-muted)]">
              {padIndex} / {padTotal}
            </span>
          </div>

          {/* Bottom info bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between"
            initial={false}
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <span className="micro-label text-[var(--color-accent)] block mb-2">
                {project.category}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-4xl font-bold uppercase tracking-tight text-white">
                {project.title}
              </h3>
            </div>
            <motion.div
              className="flex items-center gap-2 micro-label text-[var(--color-text)]"
              animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <span>View Project</span>
              <ExternalLink size={12} />
            </motion.div>
          </motion.div>
        </div>
        </motion.div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-4xl bg-[var(--color-bg)] rounded-2xl overflow-hidden border border-[var(--color-border)]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <div>
                <span className="micro-label text-[var(--color-accent)] block mb-1">
                  {project.category}
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold uppercase tracking-tight">
                  {project.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="micro-label text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1.5"
                  >
                    Visit Site <ExternalLink size={12} />
                  </a>
                )}
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-6">
              {project.video ? (
                <video
                  src={project.video}
                  controls
                  autoPlay
                  muted
                  className="w-full rounded-xl"
                  aria-label={`${project.title} demo video`}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full rounded-xl"
                />
              )}
              <p className="mt-4 text-[var(--color-muted)] text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="micro-label px-3 py-1 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 text-[var(--color-accent)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
