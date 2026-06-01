import { motion, AnimatePresence } from 'motion/react'

interface Win95PopupProps {
  isOpen: boolean
  onClose: () => void
}

export function Win95Popup({ isOpen, onClose }: Win95PopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />

          {/* Window */}
          <motion.div
            className="relative z-10 w-full max-w-sm bg-[#c0c0c0] font-sans"
            style={{
              borderTop: '2px solid #ffffff',
              borderLeft: '2px solid #ffffff',
              borderRight: '2px solid #000000',
              borderBottom: '2px solid #000000',
              boxShadow: 'inset 1px 1px #dfdfdf, inset -1px -1px #808080',
            }}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Title Bar */}
            <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between font-bold text-sm tracking-wide">
              <span>SYSTEM WARNING</span>
              <button
                onClick={onClose}
                className="w-4 h-4 bg-[#c0c0c0] flex items-center justify-center text-black text-xs hover:active:bg-[#808080]"
                style={{
                  borderTop: '1px solid #ffffff',
                  borderLeft: '1px solid #ffffff',
                  borderRight: '1px solid #000000',
                  borderBottom: '1px solid #000000',
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex gap-4 items-start">
              <motion.div
                className="text-4xl shrink-0"
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              >
                ⚠️
              </motion.div>
              <p className="text-black text-sm leading-relaxed font-medium">
                WARNING: Hiring me may result in shipping features too fast and excessive code quality.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 pb-6 pt-2">
              <a
                href="mailto:emmaokaka123@gmail.com"
                className="px-6 py-1 bg-[#c0c0c0] text-black font-bold text-sm hover:active:pt-[2px] hover:active:pl-[6px] hover:active:pr-[4px] hover:active:pb-[0px]"
                style={{
                  borderTop: '2px solid #ffffff',
                  borderLeft: '2px solid #ffffff',
                  borderRight: '2px solid #000000',
                  borderBottom: '2px solid #000000',
                  boxShadow: 'inset 1px 1px #dfdfdf, inset -1px -1px #808080',
                }}
              >
                PROCEED
              </a>
              <button
                onClick={onClose}
                className="px-6 py-1 bg-[#c0c0c0] text-black text-sm hover:active:pt-[2px] hover:active:pl-[6px] hover:active:pr-[4px] hover:active:pb-[0px]"
                style={{
                  borderTop: '2px solid #ffffff',
                  borderLeft: '2px solid #ffffff',
                  borderRight: '2px solid #000000',
                  borderBottom: '2px solid #000000',
                  boxShadow: 'inset 1px 1px #dfdfdf, inset -1px -1px #808080',
                }}
              >
                CANCEL
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
