'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

const WORDS = ['I TURN', 'IDEAS','INTO', 'REALITY', ]

/* ─── Cylinder Geometry ─── */
const GAP = 50             // degrees between each word on the cylinder
const RADIUS = 250          // px — cylinder radius (distance from center axis)
const START_ROTATION = -80  // words start below the horizon
const END_ROTATION = 260   // words exit well past the top

/**
 * ScrollPerspectiveText — Workvite-style 3D Cylinder Reveal
 *
 * Words are arranged on the surface of a virtual 3D cylinder.
 * Each word sits at `rotateX(i * -GAP) translateZ(RADIUS)`.
 * Scrolling rotates the entire cylinder around the X-axis,
 * bringing each word to front-center sequentially — like a slot machine reel.
 *
 * The section pins via CSS sticky while the scroll drives the rotation
 * from START_ROTATION (below horizon) through to END_ROTATION (past horizon).
 */
export function ScrollPerspectiveText() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /* Smooth the scroll-driven rotation with a spring for a 
     subtle momentum feel (similar to GSAP scrub: 1) */
  const rawRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [START_ROTATION, END_ROTATION]
  )
  const rotationX = useSpring(rawRotation, { stiffness: 80, damping: 30 })

  return (
    <section
      ref={sectionRef}
      className="relative h-[250vh]"
    >
      {/* Pinned viewport — stays fixed while user scrolls through the 250vh */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Solid background */}
        <div className="absolute inset-0 bg-black" />

        {/* 3D Viewport — establishes the camera perspective */}
        <div
          className="absolute inset-0"
          style={{ perspective: '1000px' }}
        >
          {/* Rotating Cylinder Stage
              — This is the "drum" that spins. All words are children
                positioned on its surface via rotateX + translateZ. */}
          <motion.div
            className="absolute inset-0"
            style={{
              display: 'grid',
              placeItems: 'center',
              rotateX: rotationX,
              transformStyle: 'preserve-3d',
            }}
          >
            {WORDS.map((word, i) => {
              const wordRotation = i * GAP
              return (
                <h2
                  key={word}
                  className="
                    text-white uppercase font-black select-none pointer-events-none
                    text-center whitespace-nowrap
                    leading-[0.85] tracking-[-0.06em]
                    text-[18vw] md:text-[15vw] lg:text-[13vw]
                  "
                  style={{
                    gridArea: '1 / 1',
                    transform: `rotateX(${-wordRotation}deg) translateZ(${RADIUS}px)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {word}
                </h2>
              )
            })}
          </motion.div>
        </div>

        {/* Noise Overlay */}
        <div
          className="
            absolute inset-0
            opacity-[0.03] mix-blend-screen pointer-events-none
          "
          style={{
            backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
            backgroundSize: '8px 8px',
          }}
        />
      </div>
    </section>
  )
}