import { useState } from 'react'
import { motion } from 'motion/react'
import { MapPin, Smile } from 'lucide-react'
import { PageTransition } from '../components/layout/PageTransition'
import { DraggableSticker } from '../components/shared/DraggableSticker'
import { Win95Popup } from '../components/shared/Win95Popup'

export default function Brutalist() {
  const [win95Open, setWin95Open] = useState(false)
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null)

  // Determine background color based on photo hover state
  const bgColor = hoveredPhoto ? 'var(--color-border)' : 'var(--color-bg)'

  const gallery = [
    { id: '01', src: '/graduation.webp', alt: 'Graduation' },
    { id: '02', src: '/nysc.webp', alt: 'NYSC' },
    { id: '03', src: '/swag.webp', alt: 'Swag' },
    { id: '04', src: '/fumble.webp', alt: 'Fumble' },
  ]

  const contacts = [
    { name: 'GitHub', url: 'https://github.com/iamxtraordinary', hoverColor: '#FF00FF' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/okaka-emmanuel', hoverColor: '#00FFFF' },
    { name: 'Email', url: 'mailto:emmaokaka123@gmail.com', hoverColor: '#FFFF00' },
    { name: 'WhatsApp', url: 'https://wa.me/2349014771232', hoverColor: '#FF3300' },
  ]

  return (
    <PageTransition>
      <div 
        className="min-h-screen transition-colors duration-500 font-mono text-[var(--color-text)] selection:bg-[var(--color-text)] selection:text-[var(--color-bg)] pb-32"
        style={{ backgroundColor: bgColor }}
      >
        {/* Subtle noise overlay acting as paper texture fallback */}
        <div 
          className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          aria-hidden="true"
        />

        {/* Marquee Banner */}
        <div className="fixed top-0 left-0 w-full bg-black border-b-4 border-black z-50 overflow-hidden py-1">
          <div className="flex w-[200%] animate-marquee">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="whitespace-nowrap font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-widest px-4 text-white">
                LET'S CONNECT ✦ EMMANUEL OKAKA ✦ SOFTWARE ENGINEER ✦ LAGOS, NIGERIA ✦
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Layer: Draggable Stickers */}
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          <div className="absolute inset-0 pointer-events-auto max-w-7xl mx-auto">
            <DraggableSticker color="#FF00FF" initialX="10%" initialY="25vh" initialRotation={-12} delay={0.5}>
              Lagos, NG 🇳🇬
            </DraggableSticker>
            <DraggableSticker color="#00FFFF" initialX="80%" initialY="15vh" initialRotation={8} delay={0.6}>
              Drag Me!
            </DraggableSticker>
            <DraggableSticker color="#FFFF00" initialX="70%" initialY="75vh" initialRotation={-5} delay={0.7}>
              BSc. CS
            </DraggableSticker>
          </div>
        </div>

        <div className="relative z-10 pt-24 px-6 md:px-12 max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-32">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              <div className="flex-1 relative">
                <h1 className="font-[family-name:var(--font-display)] text-7xl md:text-[12vw] font-black uppercase leading-[0.85] tracking-tighter mix-blend-difference">
                  ABOUT ME
                </h1>
                <motion.div 
                  className="absolute -bottom-8 -right-8 md:bottom-12 md:right-12 bg-[var(--color-accent)] border-4 border-[var(--color-text)] px-6 py-2 shadow-[8px_8px_0px_0px_var(--color-text)] z-20"
                  initial={{ rotate: -15, scale: 0 }}
                  animate={{ rotate: -5, scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <span className="font-bold text-black text-xl tracking-wider uppercase whitespace-nowrap">
                    Emmanuel Okaka
                  </span>
                </motion.div>
              </div>

              <div className="shrink-0 relative group mt-12 lg:mt-0">
                {/* Rotating badge */}
                <motion.div 
                  className="absolute -top-10 -right-10 w-24 h-24 bg-[#FFFF00] rounded-full border-4 border-black text-black font-bold flex items-center justify-center text-center text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  SHIPS CODE FAST
                </motion.div>
                
                {/* Portrait */}
                <div 
                  className="relative w-64 md:w-80 aspect-[3/4] border-4 border-[var(--color-text)] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 bg-[var(--color-text)]"
                  onMouseEnter={() => setHoveredPhoto('portrait')}
                  onMouseLeave={() => setHoveredPhoto(null)}
                >
                  <img 
                    src="/emmanuel.webp" 
                    alt="Emmanuel Okaka Portrait" 
                    className="w-full h-full object-cover grayscale contrast-150 group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Bio Section */}
          <section className="mb-32">
            <h2 className="font-[family-name:var(--font-display)] text-5xl font-black uppercase tracking-tight inline-block border-b-8 border-[var(--color-text)] pb-2 mb-12">
              Who I Am
            </h2>
            <div className="bg-[var(--color-bg)] border-4 border-[var(--color-text)] p-8 md:p-12 shadow-[12px_12px_0px_0px_var(--color-text)] max-w-4xl text-lg md:text-xl leading-relaxed">
              <p>
                I'm a junior software engineer who thrives at the intersection of <span className="inline-block bg-[#FF00FF] text-black px-2 transform -rotate-1 font-bold">mobile</span> and <span className="inline-block bg-[#00FFFF] text-black px-2 transform rotate-2 font-bold">backend</span> development.
              </p>
              <p className="mt-6">
                Whether it's building robust APIs, crafting seamless Flutter experiences, or architecting scalable Firebase backends, my goal is always the same: <span className="inline-block border-2 border-[var(--color-accent)] text-[var(--color-accent)] px-2 font-bold">ship high-quality, impactful software.</span>
              </p>
            </div>
          </section>

          {/* Photo Gallery */}
          <section className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-5xl font-black uppercase tracking-tight">
                Gallery
              </h2>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="text-4xl text-[#FFFF00]"
              >
                ✦
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {gallery.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  className="relative group cursor-crosshair"
                  initial={{ rotate: i % 2 === 0 ? -4 : 4 }}
                  whileHover={{ 
                    scale: 1.08, 
                    rotate: 0, 
                    zIndex: 20,
                  }}
                  onHoverStart={() => setHoveredPhoto(photo.id)}
                  onHoverEnd={() => setHoveredPhoto(null)}
                >
                  <div className="absolute -top-4 -left-4 bg-white text-black font-bold text-sm px-3 py-1 border-2 border-black z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {photo.id}
                  </div>
                  <div className="w-full aspect-square border-4 border-[var(--color-text)] bg-white p-3 shadow-[8px_8px_0px_0px_var(--color-text)] group-hover:shadow-[-10px_10px_0px_0px_var(--color-text)] transition-shadow duration-300">
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      className="w-full h-full object-cover grayscale contrast-150 group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education & Experience */}
          <section className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Education */}
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-4xl font-black uppercase tracking-tight mb-8">
                  Education
                </h2>
                <div className="bg-[var(--color-bg)] border-4 border-[var(--color-text)] p-6 shadow-[8px_8px_0px_0px_var(--color-text)]">
                  <div className="mb-4">
                    <span className="bg-[#FFFF00] text-black text-xs font-bold px-2 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block">
                      SECOND CLASS UPPER HONOURS
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-white">Computer Science — BSc.</h3>
                  <p className="text-[var(--color-muted)] mb-4">Covenant University, Ogun State, Nigeria</p>
                  <div className="border-t-2 border-dashed border-[var(--color-border)] pt-4 text-sm text-[var(--color-accent)] font-bold">
                    Nov 2021 — Jul 2025
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-4xl font-black uppercase tracking-tight mb-8">
                  Experience
                </h2>
                <div className="space-y-6 border-l-4 border-[var(--color-text)] pl-6 relative">
                  {/* Item 1 */}
                  <div className="relative">
                    <div className="absolute w-4 h-4 bg-[#00FFFF] border-2 border-black -left-[34px] top-1" />
                    <h3 className="font-bold text-lg text-white">Software Engineer (Contract)</h3>
                    <p className="text-[var(--color-muted)] text-sm my-1">Real-time dating app · Flutter</p>
                    <p className="text-xs text-[var(--color-accent)] font-bold">Apr 2025 — Aug 2025</p>
                  </div>
                  
                  {/* Item 2 */}
                  <div className="relative">
                    <div className="absolute w-4 h-4 bg-[#FF00FF] border-2 border-black -left-[34px] top-1" />
                    <h3 className="font-bold text-lg text-white">Mobile Developer Intern</h3>
                    <p className="text-[var(--color-muted)] text-sm my-1">Inmotion Software Hub</p>
                    <p className="text-xs text-[var(--color-accent)] font-bold">Mar 2024 — Sep 2024</p>
                  </div>

                  {/* Item 3 */}
                  <div className="relative">
                    <div className="absolute w-4 h-4 bg-[#FFFF00] border-2 border-black -left-[34px] top-1" />
                    <h3 className="font-bold text-lg text-white">Personal Project</h3>
                    <p className="text-[var(--color-muted)] text-sm my-1">Inventory Management System</p>
                    <p className="text-xs text-[var(--color-accent)] font-bold">Jun 2024 — Nov 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-20">
            <h2 className="font-[family-name:var(--font-display)] text-5xl font-black uppercase tracking-tight text-center mb-12">
              Reach Me
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
              {contacts.map((contact) => (
                <motion.a
                  key={contact.name}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white border-2 border-[var(--color-text)] px-6 py-3 font-bold uppercase tracking-wider text-sm md:text-base transition-colors duration-300 relative overflow-hidden group/btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{contact.name}</span>
                  <div 
                    className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" 
                    style={{ backgroundColor: contact.hoverColor }} 
                  />
                  {/* Hack for text color change on hover */}
                  <div className="absolute inset-0 flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-10 pointer-events-none text-black">
                    {contact.name}
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-[var(--color-muted)] text-sm">
              <MapPin size={16} className="text-[#FF3300]" />
              <span>Lagos, Nigeria · 6.5244° N</span>
            </div>
          </section>

          {/* Footer Easter Egg */}
          <footer className="flex justify-center mt-32 relative z-50">
            <motion.button
              onClick={() => setWin95Open(true)}
              className="p-4 rounded-full hover:bg-[var(--color-border)]/50 transition-colors"
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              aria-label="System details"
            >
              <Smile size={48} className="text-[#FFFF00]" strokeWidth={1.5} />
            </motion.button>
          </footer>
        </div>
      </div>

      <Win95Popup isOpen={win95Open} onClose={() => setWin95Open(false)} />
    </PageTransition>
  )
}
