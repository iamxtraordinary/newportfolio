import React, { useRef, useEffect, useState } from 'react'
import {
  useScroll,
  useTransform,
  motion,
  type MotionValue,
} from 'motion/react'

/* ─── Main Container ─── */
export function ContainerScroll({
  titleComponent,
  children,
  index = 0,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
  index?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track this element as its top edge moves from the bottom of the viewport to the top of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  })
  
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // If it's the first container (index === 1), use the original scale and translate values
  const scaleDimensions = isMobile 
    ? (index === 1 ? [0.7, 0.9] : [0.7, 0.95]) 
    : [1.8, 1.2]

  const rotate = useTransform(scrollYProgress, [0, 1], [150, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions)
  const translate = useTransform(scrollYProgress, [0, 1], [0, index === 1 ? -100 : -60])

  return (
    <div
      className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-12 overflow-hidden"
      ref={containerRef}
      style={{ zIndex: index }}
    >
      <div
        className="w-full max-w-6xl relative"
        style={{ perspective: '1200px' }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

/* ─── Header (title floats up on scroll) ─── */
function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: React.ReactNode
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

/* ─── 3-D Rotating Card ─── */
function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border border-[var(--color-border)] p-2 md:p-6 bg-[var(--color-bg)] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[var(--color-bg)] md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  )
}
