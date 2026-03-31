import { useEffect, useRef, useState } from 'react'
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

  // ── Sync --header-offset with actual header height ─────
  useEffect(() => {
    const root   = document.documentElement
    const header = headerRef.current
    if (!header) return

    const updateOffset = () => {
      root.style.setProperty('--header-offset', `${header.offsetHeight + 8}px`)
    }
    updateOffset()

    const ro = new ResizeObserver(updateOffset)
    ro.observe(header)
    window.addEventListener('resize', updateOffset)
    return () => { ro.disconnect(); window.removeEventListener('resize', updateOffset) }
  }, [])

  // ── Lock body scroll on mobile menu open ───────────────
  useEffect(() => {
    if (mobileOpen) {
      const y = window.scrollY
      document.body.style.overflow   = 'hidden'
      document.body.style.position   = 'fixed'
      document.body.style.top        = `-${y}px`
      document.body.style.width      = '100%'
    } else {
      const top = Math.abs(parseInt(document.body.style.top || '0'))
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top      = ''
      document.body.style.width    = ''
      if (top) window.scrollTo(0, top)
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top      = ''
      document.body.style.width    = ''
    }
  }, [mobileOpen])

  // ── Close on desktop resize ────────────────────────────
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  // ── Active section tracking ────────────────────────────
  useEffect(() => {
    let observer
    let timeoutId

    const observe = () => {
      const sections = navLinks.map(l => document.querySelector(l.href)).filter(Boolean)
      if (!sections.length) { timeoutId = setTimeout(observe, 250); return }

      observer?.disconnect()
      observer = new IntersectionObserver(
        (entries) => {
          const hit = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
          if (hit?.target?.id) setActiveLink(`#${hit.target.id}`)
        },
        { rootMargin: '-42% 0px -42% 0px', threshold: [0.1, 0.25, 0.5] }
      )
      sections.forEach(s => observer.observe(s))
    }

    observe()
    return () => { observer?.disconnect(); clearTimeout(timeoutId) }
  }, [])

  // ── Escape key ─────────────────────────────────────────
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
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
        className={[
          'fixed left-0 right-0 top-0 z-50 border-b border-black/10 transition-all duration-300',
          // Safe-area top padding for notched iPhones
          'pt-[env(safe-area-inset-top)]',
          scrolled || mobileOpen
            ? 'bg-brand-dark/96 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md'
            : 'bg-brand-dark/92',
        ].join(' ')}
      >
        {/* Skip link */}
        <a
          href="#main-content"
          className="sr-only absolute left-4 top-4 z-10 bg-black px-4 py-2
                     font-body text-xs font-bold uppercase tracking-[0.16em] text-white
                     focus:not-sr-only"
        >
          Skip to content
        </a>

        {/* ── Desktop top info bar ─────────────────────────── */}
        <div className="hidden border-b border-black/8 lg:block">
          <div className="container-max flex items-center justify-between px-6 py-2
                          text-[11px] uppercase tracking-[0.18em] text-brand-cream/60">
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

        {/* ── Main header row ──────────────────────────────── */}
        <div className="container-max flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); smoothScrollTo('#home') }}
            className="shrink-0 focus-visible:outline-none"
            aria-label="The L.A. Cafe home"
          >
            <img
              src="/images/brand/la-cafe-logo.png"
              alt="The L.A. Cafe"
              width="332"
              height="183"
              loading="eager"
              decoding="async"
              className="logo-tilt w-[100px] xs:w-[116px] sm:w-[136px] lg:w-[156px]
                         transition-transform duration-200 hover:rotate-[-20deg]"
            />
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                aria-current={activeLink === link.href ? 'location' : undefined}
                className={[
                  'relative font-body text-[13px] font-bold uppercase tracking-[0.16em]',
                  'transition-colors duration-200 py-1',
                  'after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full',
                  'after:origin-left after:scale-x-0 after:bg-brand-amber',
                  'after:transition-transform after:duration-200',
                  'hover:after:scale-x-100',
                  activeLink === link.href
                    ? 'text-brand-cream after:scale-x-100'
                    : 'text-brand-cream/60 hover:text-brand-cream',
                ].join(' ')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <WaitTimeBadge compact className="border-black/12 bg-white/60" />
            <button
              type="button"
              onClick={() => handleNavClick('#order')}
              className="btn-primary relative sm:w-auto"
            >
              <ShoppingBag size={15} />
              Online Ordering
              {itemCount ? (
                <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center
                                 justify-center bg-brand-amber px-1.5 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              ) : null}
            </button>
          </div>

          {/* ── Mobile action row ─────────────────────────── */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Order button — always visible on mobile */}
            <button
              type="button"
              onClick={() => handleNavClick('#order')}
              className="btn-primary relative xs:w-auto px-3 py-2 text-[12px] sm:w-auto"
              style={{ minWidth: 90 }}
            >
              Order Now
              {itemCount ? (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center
                                 justify-center bg-brand-amber px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              ) : null}
            </button>

            {/* Hamburger — 44×44 touch target */}
            <button
              type="button"
              onClick={() => setMobileOpen(v => !v)}
              className="flex h-11 w-11 items-center justify-center
                         border border-black/14 bg-white/40 text-brand-cream
                         transition-colors hover:bg-white/60 active:bg-white/80"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.span key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}>
                      <X size={20} />
                    </motion.span>
                  : <motion.span key="m"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}>
                      <Menu size={20} />
                    </motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile slide-in panel ────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
              aria-label="Close menu"
            />

            {/* Panel — slides from right, clears header correctly */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-y-0 right-0 z-50 w-full max-w-[min(320px,100vw)]
                         overflow-y-auto border-l border-black/10 bg-brand-dark
                         px-5 pb-8
                         pt-[calc(var(--header-offset,80px)+12px)]
                         pb-[calc(2rem+env(safe-area-inset-bottom))]"
            >
              {/* Logo in drawer */}
              <img
                src="/images/brand/la-cafe-logo.png"
                alt="The L.A. Cafe"
                width="332"
                height="183"
                decoding="async"
                className="logo-tilt mb-6 w-[130px]"
              />

              {/* Nav links — large tap targets */}
              <nav className="flex flex-col" aria-label="Mobile navigation links">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className={[
                      'flex min-h-[52px] items-center border-b border-black/8',
                      'font-body text-[15px] font-bold uppercase tracking-[0.18em]',
                      'transition-colors duration-150',
                      activeLink === link.href
                        ? 'text-brand-cream'
                        : 'text-brand-cream/55 hover:text-brand-cream',
                    ].join(' ')}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Bottom info */}
              <div className="mt-6 space-y-4 border-t border-black/10 pt-5">
                <WaitTimeBadge
                  compact
                  className="w-full justify-center border-black/12 bg-white/60"
                />
                <a
                  href={addressHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 font-body text-sm
                             uppercase tracking-[0.14em] text-brand-cream/60
                             hover:text-brand-cream transition-colors"
                >
                  <MapPin size={14} className="mt-0.5 shrink-0 text-brand-amber" />
                  639 S. Spring St., Los Angeles CA 90014
                </a>
                <a
                  href="tel:+12136123000"
                  className="flex items-center gap-2 font-body text-sm
                             uppercase tracking-[0.14em] text-brand-cream/60
                             hover:text-brand-cream transition-colors"
                >
                  <Phone size={14} className="shrink-0 text-brand-amber" />
                  (213) 612-3000
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
