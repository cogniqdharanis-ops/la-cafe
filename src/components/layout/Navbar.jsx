import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Menu, Phone, ShoppingBag, X } from 'lucide-react'
import { navLinks } from '../../data/siteData'
import { useOrderPlan } from '../../context/OrderPlanContext'
import { useScrolled } from '../../hooks/useScrolled'
import { smoothScrollTo } from '../../utils/helpers'
import { WaitTimeBadge } from '../ui/WaitTimeBadge'

const addressHref =
  'https://maps.google.com/?q=639+S+Spring+St+Los+Angeles+CA+90014'

export function Navbar() {
  const { scrolled } = useScrolled(40)
  const { itemCount } = useOrderPlan()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#menu')
  const headerRef = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    const header = headerRef.current

    if (!header) return undefined

    const updateOffset = () => {
      root.style.setProperty('--header-offset', `${header.offsetHeight + 12}px`)
    }

    updateOffset()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateOffset)

      return () => {
        window.removeEventListener('resize', updateOffset)
      }
    }

    const observer = new ResizeObserver(updateOffset)
    observer.observe(header)
    window.addEventListener('resize', updateOffset)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateOffset)
    }
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let observer
    let timeoutId

    const observeSections = () => {
      const sections = navLinks
        .map((link) => document.querySelector(link.href))
        .filter(Boolean)

      if (!sections.length) {
        timeoutId = window.setTimeout(observeSections, 250)
        return
      }

      observer?.disconnect()
      observer = new IntersectionObserver(
        (entries) => {
          const visibleEntry = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

          if (visibleEntry?.target?.id) {
            setActiveLink(`#${visibleEntry.target.id}`)
          }
        },
        {
          rootMargin: '-42% 0px -42% 0px',
          threshold: [0.1, 0.25, 0.5, 0.75],
        }
      )

      sections.forEach((section) => observer.observe(section))

      if (sections.length < navLinks.length) {
        timeoutId = window.setTimeout(observeSections, 400)
      }
    }

    observeSections()

    return () => {
      observer?.disconnect()
      window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavClick = (href) => {
    setActiveLink(href)
    setMobileOpen(false)
    smoothScrollTo(href)
  }

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={`fixed left-0 right-0 top-0 z-50 border-b border-black/10 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-brand-dark/96 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md'
            : 'bg-brand-dark/92'
        }`}
      >
        <a
          href="#main-content"
          className="sr-only absolute left-4 top-4 z-10 bg-black px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.16em] text-white focus:not-sr-only"
        >
          Skip to content
        </a>

        <div className="hidden border-b border-black/10 lg:block">
          <div className="container-max flex items-center justify-between px-6 py-2 text-[11px] uppercase tracking-[0.18em] text-brand-cream/68">
            <a
              href={addressHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-brand-cream"
            >
              <MapPin size={12} />
              639 S. Spring St., Los Angeles, CA 90014
            </a>
            <div className="flex items-center gap-5">
              <a
                href="tel:+12136123000"
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-cream"
              >
                <Phone size={12} />
                (213) 612-3000
              </a>
              <span>Walk-in only</span>
            </div>
          </div>
        </div>

        <div className="container-max flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault()
              smoothScrollTo('#home')
            }}
            className="shrink-0"
            aria-label="The L.A. Cafe home"
          >
            <img
              src="/images/brand/la-cafe-logo.png"
              alt="The L.A. Cafe"
              width="332"
              height="183"
              loading="eager"
              decoding="async"
              className="logo-tilt w-[124px] sm:w-[146px] lg:w-[166px]"
            />
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  handleNavClick(link.href)
                }}
                aria-current={activeLink === link.href ? 'location' : undefined}
                className={`font-body text-[13px] font-bold uppercase tracking-[0.16em] transition-colors duration-200 ${
                  activeLink === link.href
                    ? 'text-brand-cream'
                    : 'text-brand-cream/64 hover:text-brand-cream'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <WaitTimeBadge compact className="border-black/12 bg-white/60" />
            <button
              type="button"
              onClick={() => handleNavClick('#order')}
              className="btn-primary relative"
            >
              <ShoppingBag size={15} />
              Online Ordering
              {itemCount ? (
                <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center bg-brand-amber px-1.5 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              ) : null}
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => handleNavClick('#order')}
              className="btn-primary relative px-4 py-2"
            >
              Order Now
              {itemCount ? (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center bg-brand-amber px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              className="flex h-11 w-11 items-center justify-center border border-black/14 bg-white/40 text-brand-cream"
              aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/18 backdrop-blur-[2px]"
              aria-label="Close mobile menu backdrop"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto border-l border-black/10 bg-brand-dark px-6 pb-8 pt-24"
              aria-label="Mobile navigation"
              role="dialog"
              aria-modal="true"
            >
              <img
                src="/images/brand/la-cafe-logo.png"
                alt="The L.A. Cafe"
                width="332"
                height="183"
                decoding="async"
                className="logo-tilt mb-8 w-[154px]"
              />

              <nav id="mobile-navigation" className="flex flex-col gap-3" aria-label="Mobile navigation links">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className={`border-b border-black/10 py-3 font-body text-base font-bold uppercase tracking-[0.18em] ${
                      activeLink === link.href ? 'text-brand-cream' : 'text-brand-cream/62'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 space-y-4 border-t border-black/10 pt-6">
                <WaitTimeBadge compact className="w-full justify-center border-black/12 bg-white/60 sm:justify-start" />
                <a
                  href={addressHref}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-body text-sm uppercase tracking-[0.14em] text-brand-cream/68"
                >
                  639 S. Spring St.
                  <br />
                  Los Angeles, CA 90014
                </a>
                <a
                  href="tel:+12136123000"
                  className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.14em] text-brand-cream/68"
                >
                  <Phone size={14} />
                  (213) 612-3000
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
