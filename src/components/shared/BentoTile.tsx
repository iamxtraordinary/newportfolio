import { motion, useMotionTemplate } from 'motion/react'
import { useTilt } from '../../hooks/useTilt'
import { cn } from '../../lib/cn'

interface BentoTileProps {
  children: React.ReactNode
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
  className?: string
  delay?: number
}

export function BentoTile({
  children,
  colSpan = 1,
  rowSpan = 1,
  className,
  delay = 0,
}: BentoTileProps) {
  const {
    ref,
    rotateX,
    rotateY,
    mouseX,
    mouseY,
    isHovered,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
  } = useTilt(4, 200, 20)

  // Radial glare effect
  const glareBackground = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, var(--color-accent-glow), transparent 50%)`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        zIndex: isHovered ? 10 : 1,
      }}
      className={cn(
        'relative group overflow-hidden rounded-[2.5rem]',
        'bg-white/[0.03] hover:bg-white/[0.05] transition-colors duration-500',
        'border border-[var(--color-border)] hover:border-[var(--color-accent)]',
        colSpan === 2 && 'md:col-span-2',
        colSpan === 3 && 'md:col-span-3',
        rowSpan === 2 && 'md:row-span-2',
        className
      )}
    >
      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{ background: glareBackground }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  )
}
