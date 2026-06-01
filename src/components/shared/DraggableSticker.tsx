import { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '../../lib/cn'

interface DraggableStickerProps {
  children: React.ReactNode
  initialRotation?: number
  initialX?: number | string
  initialY?: number | string
  color: string
  className?: string
  delay?: number
}

export function DraggableSticker({
  children,
  initialRotation = -10,
  initialX = 0,
  initialY = 0,
  color,
  className,
  delay = 0,
}: DraggableStickerProps) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      className={cn('absolute z-40', className)}
      initial={{ 
        scale: 0, 
        rotate: initialRotation - 30, 
        x: initialX, 
        y: initialY 
      }}
      animate={{ 
        scale: 1, 
        rotate: initialRotation, 
        x: initialX, 
        y: initialY 
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay 
      }}
    >
      <motion.div
        drag
        dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
        dragElastic={0.2}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        whileHover={{ scale: 1.15, rotate: initialRotation + (Math.random() > 0.5 ? 5 : -5) }}
        whileDrag={{ scale: 1.2, cursor: 'grabbing', zIndex: 50 }}
        className={cn(
          'cursor-grab px-4 py-2 font-mono font-bold text-black select-none',
          'border-4 border-black transition-shadow',
          isDragging ? 'shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
        )}
        style={{ backgroundColor: color }}
        aria-hidden="true" // Decorative
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
