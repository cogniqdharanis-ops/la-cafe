import { useState, useEffect } from 'react'

export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frameId = 0

    const updateScrollState = () => {
      frameId = 0
      const nextValue = window.scrollY > threshold

      setScrolled((current) => (current === nextValue ? current : nextValue))
    }

    const handleScroll = () => {
      if (frameId) return

      frameId = window.requestAnimationFrame(updateScrollState)
    }

    updateScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(frameId)
    }
  }, [threshold])

  return { scrolled }
}
