import { useEffect, useState, useCallback } from 'react'

interface ScrambleTextProps {
  text: string
  delay?: number
  className?: string
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

export function ScrambleText({ text, delay = 0, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState('')
  const [started, setStarted] = useState(false)

  const scramble = useCallback(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration / 3) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      iteration++
      if (iteration > text.length * 3) {
        clearInterval(interval)
        setDisplay(text)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [text])

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (started) {
      const cleanup = scramble()
      return cleanup
    }
  }, [started, scramble])

  return (
    <span className={className} aria-label={text}>
      {started ? display : '\u00A0'}
    </span>
  )
}
