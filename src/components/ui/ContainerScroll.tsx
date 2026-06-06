import React, {
  useRef,
  useLayoutEffect,
  useState,
} from 'react'

import {
  useScroll,
  useTransform,
  motion,
  type MotionValue,
} from 'motion/react'

import { useMediaQuery } from '../../hooks/useMediaQuery'

/* ------------------------------------------------ */
/* Main Container */
/* ------------------------------------------------ */

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

  const isMobile = useMediaQuery('(max-width: 768px)')

  const { scrollYProgress: entranceProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  })

  const { scrollY } = useScroll()

  const [metrics, setMetrics] = useState({
    docTop: 0,
    vh: 0,
  })

  useLayoutEffect(() => {
    const updateMetrics = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()

      setMetrics({
        docTop: rect.top + window.scrollY,
        vh: window.innerHeight,
      })
    }

    updateMetrics()

    window.addEventListener('resize', updateMetrics)

    return () => {
      window.removeEventListener('resize', updateMetrics)
    }
  }, [])

  /* ---------------- Entrance ---------------- */

  const entranceScaleRange = isMobile
    ? index === 1
      ? [0.7, 0.9]
      : [0.7, 0.95]
    : [1.8, 1.2]

  const rotate = useTransform(
    entranceProgress,
    [0, 1],
    [120, 0]
  )

  const entranceScale = useTransform(
    entranceProgress,
    [0, 1],
    entranceScaleRange
  )

  const translate = useTransform(
    entranceProgress,
    [0, 1],
    [0, index === 1 ? -100 : -60]
  )

  /* ---------------- Exit ---------------- */

  const exitScale = useTransform(scrollY, latest => {
    const { docTop, vh } = metrics

    if (!vh) return 1

    if (latest <= docTop) {
      return 1
    }

    const progress = Math.min(
      (latest - docTop) / vh,
      1
    )

    // 1 -> 0.5
    return 1 - progress * 0.5
  })

  /* ---------------- Combined Scale ---------------- */

  const scale = useTransform(
    [entranceScale, exitScale],
    ([entrance, exit]: number[]) => entrance * exit
  )

  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-12 overflow-hidden"
      style={{
        zIndex: index,
      }}
    >
      <div
        className="w-full max-w-6xl relative"
        style={{
          perspective: '1200px',
        }}
      >
        <Header
          translate={translate}
          titleComponent={titleComponent}
        />

        <Card
          rotate={rotate}
          scale={scale}
        >
          {children}
        </Card>
      </div>
    </div>
  )
}

/* ------------------------------------------------ */
/* Header */
/* ------------------------------------------------ */

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: React.ReactNode
}) {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

/* ------------------------------------------------ */
/* Card */
/* ------------------------------------------------ */

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  children: React.ReactNode
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,

        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',

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