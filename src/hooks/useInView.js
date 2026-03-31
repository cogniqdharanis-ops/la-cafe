import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const { once = true, threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) {
            observer.disconnect()
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return { ref, inView }
}
