import { motion } from 'framer-motion'
import { ArrowRight, Clock3, MapPin, Phone, UtensilsCrossed } from 'lucide-react'
import { WaitTimeBadge } from '../ui/WaitTimeBadge'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { smoothScrollTo } from '../../utils/helpers'
import { useCafeStatus } from '../../hooks/useCafeStatus'

const heroImages = [
  {
    src: '/images/live/double-burger.jpg',
    alt: 'L.A. Cafe signature burger',
    className: 'col-span-2 row-span-2 sm:col-span-1 sm:row-span-2',
  },
  {
    src: '/images/live/lobster-grill-cheese.jpg',
    alt: 'L.A. Cafe grilled sandwich',
    className: '',
  },
  {
    src: '/images/live/chx-pesto.jpg',
    alt: 'L.A. Cafe pesto chicken',
    className: '',
  },
  {
    src: '/images/live/waffle.jpg',
    alt: 'L.A. Cafe waffle plate',
    className: 'col-span-2',
  },
]

export function HeroSection() {
  const { service, wait } = useCafeStatus()

  return (
    <section
      id="home"
      className="relative overflow-x-clip border-b border-black/10"
      style={{ paddingTop: 'calc(var(--header-offset, 80px) + 4px)' }}
    >
      <div className="container-max px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start xl:gap-14">

          {/* ── Left ── */}
          <div className="min-w-0">

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex flex-wrap items-center gap-2"
            >
              <WaitTimeBadge showTimestamp />
              <span className="eyebrow-pill">{service.label}</span>
            </motion.div>

            {/* Logo */}
            <motion.img
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.55 }}
              src="/images/brand/la-cafe-logo.png"
              alt="The L.A. Cafe"
              width="332" height="183"
              loading="eager" decoding="async"
              className="logo-tilt mb-6 max-w-[55vw] w-[180px] xs:w-[200px] sm:w-[240px] lg:w-[260px]"
            />

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.28em] text-brand-amber"
            >
              Downtown Los Angeles counter-service staple
            </motion.p>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7, ease: [0.25,0.4,0.25,1] }}
              className="max-w-[18ch] font-display font-bold leading-[0.93] tracking-[-0.025em] text-brand-cream"
              style={{ fontSize: 'clamp(28px,8.5vw,84px)' }}
            >
              All-day breakfast, burgers &amp; fast counter-service comfort.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55 }}
              className="mt-4 max-w-xl font-body text-[15px] leading-relaxed text-brand-cream/60 sm:text-base lg:text-lg"
            >
              Scratch-made American comfort food in DTLA. Walk-in friendly,
              vegan-aware, late-night ready. Sidewalk seating available.
            </motion.p>

            {/* Info pills */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.55 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {[
                { icon: Clock3, label: 'Open till 2 AM' },
                { icon: MapPin, label: '639 S. Spring St.' },
                { icon: Phone, label: '(213) 612-3000', href: 'tel:+12136123000' },
                { icon: UtensilsCrossed, label: 'Sidewalk seating' },
              ].map(item =>
                item.href ? (
                  <a key={item.label} href={item.href}
                     className="eyebrow-pill transition-colors hover:bg-white/70">
                    <item.icon size={13} />{item.label}
                  </a>
                ) : (
                  <div key={item.label} className="eyebrow-pill">
                    <item.icon size={13} />{item.label}
                  </div>
                )
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.55 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <button type="button" onClick={() => smoothScrollTo('#order')}
                      className="btn-primary sm:w-auto">
                Online Ordering <ArrowRight size={16} />
              </button>
              <button type="button" onClick={() => smoothScrollTo('#menu')}
                      className="btn-outline sm:w-auto">
                View Menus
              </button>
              <a href="tel:+12136123000" className="btn-outline sm:w-auto">
                Call the Counter
              </a>
            </motion.div>

            {/* Stats — correct figures */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.55 }}
              className="mt-8 grid grid-cols-2 gap-3 border-t border-black/10 pt-6 xs:grid-cols-4"
            >
              {[
                { label: 'Google Rating', value: '4.3★' },
                { label: 'Reviews',       value: '2,281+' },
                { label: 'Current wait',  value: wait.time },
                { label: 'Pickup ready',  value: '12–18 min' },
              ].map(item => (
                <div key={item.label} className="panel p-4">
                  <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-cream/38">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold text-brand-cream sm:text-2xl">
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right image grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
            className="grid grid-cols-2 gap-2.5 auto-rows-[min(40vw,180px)] sm:gap-3 sm:auto-rows-[190px] lg:auto-rows-[165px] xl:auto-rows-[205px]"
          >
            {heroImages.map((image, i) => (
              <div key={image.src}
                   className={`brand-frame overflow-hidden ${image.className ?? ''}`}>
                <div className="h-full overflow-hidden border border-black/10">
                  <ResponsiveImage
                    src={image.src} alt={image.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    sizes="(min-width:1280px) 26vw,(min-width:1024px) 36vw,(min-width:640px) 48vw,50vw"
                    className="h-full w-full"
                    imgClassName="transition-transform duration-700 ease-out hover:scale-[1.04]"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
