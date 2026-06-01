import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { useMotionValue, useSpring, useTransform, MotionValue } from 'motion/react'

interface TiltValues {
  ref: React.RefObject<HTMLDivElement | null>
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  isHovered: boolean
  handleMouseMove: (e: MouseEvent<HTMLDivElement>) => void
  handleMouseLeave: () => void
  handleMouseEnter: () => void
}

export function useTilt(
  tiltAmount = 4,
  stiffness = 200,
  damping = 20
): TiltValues {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(x, { stiffness, damping })
  const springY = useSpring(y, { stiffness, damping })

  const rotateX = useTransform(springY, [0, 1], [tiltAmount, -tiltAmount])
  const rotateY = useTransform(springX, [0, 1], [-tiltAmount, tiltAmount])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    
    // Normalize coordinates (0 to 1) for tilt
    const width = rect.width
    const height = rect.height
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top
    
    x.set(mouseXPos / width)
    y.set(mouseYPos / height)

    // Raw coordinates for glare effect
    mouseX.set(mouseXPos)
    mouseY.set(mouseYPos)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0.5)
    y.set(0.5)
  }

  return {
    ref,
    rotateX,
    rotateY,
    mouseX,
    mouseY,
    isHovered,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
  }
}
