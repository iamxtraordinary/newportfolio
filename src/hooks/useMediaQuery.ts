import { useEffect, useState } from 'react'

/**
 * React hook that tracks whether a CSS media query matches.
 * Re-evaluates on window resize / media change events.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    const update = () => setMatches(media.matches)

    update()

    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}
