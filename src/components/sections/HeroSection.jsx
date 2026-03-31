// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ArrowRight, Clock3, MapPin, Phone } from 'lucide-react'
import { WaitTimeBadge } from '../ui/WaitTimeBadge'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { smoothScrollTo } from '../../utils/helpers'
import { useCafeStatus } from '../../hooks/useCafeStatus'

const heroImages = [
  {
    src: '/images/live/double-burger.jpg',
    alt: 'L.A. Cafe burger',
    className: 'col-span-2 row-span-2 lg:col-span-1 lg:row-span-2',
  },
  {
    src: '/images/live/lobster-grill-cheese.jpg',
    alt: 'L.A. Cafe grilled sandwich',
  },
  {
    src: '/images/live/chx-pesto.jpg',
    alt: 'L.A. Cafe sandwich and chips',
  },
  {
    src: '/images/live/waffle.jpg',
    alt: 'L.A. Cafe waffle plate',
    className: 'col-span-2 lg:col-span-2',
  },
]

export function HeroSection() {
  const { service, wait } = useCafeStatus()

  return (
    <section id="home" className="relative overflow-x-clip border-b border-black/10 pt-[calc(var(--header-offset,112px)-8px)]">
      <div className="container-max px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start xl:gap-12">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-5 flex flex-wrap items-center gap-3"
            >
              <WaitTimeBadge showTimestamp />
              <span className="eyebrow-pill">{service.label}</span>
            </motion.div>

            <motion.img
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.55 }}
              src="/images/brand/la-cafe-logo.png"
              alt="The L.A. Cafe"
              width="332"
              height="183"
              loading="eager"
              decoding="async"
              className="logo-tilt mb-8 w-[220px] max-w-full sm:w-[260px]"
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.28em] text-brand-amber"
            >
              Downtown Los Angeles counter-service staple
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
              className="max-w-3xl font-display text-[clamp(40px,12vw,84px)] font-bold leading-[0.92] tracking-[-0.03em] text-brand-cream sm:text-[clamp(48px,8vw,84px)]"
            >
              All-day breakfast, burgers, and fast counter-service comfort.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55 }}
              className="mt-5 max-w-2xl font-body text-base leading-relaxed text-brand-cream/68 sm:text-lg"
            >
              Built for the pace of Downtown LA: walk-in friendly, vegan-aware, late-night ready, and easy to order when the room gets busy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.55 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              {[
                { icon: Clock3, label: 'Open till 2 AM' },
                { icon: MapPin, label: '639 S. Spring St.' },
                { icon: Phone, label: '(213) 612-3000' },
              ].map((item) => (
                <div key={item.label} className="eyebrow-pill">
                  <item.icon size={14} />
                  {item.label}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.55 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <button
                type="button"
                onClick={() => smoothScrollTo('#order')}
                className="btn-primary w-full sm:w-auto"
              >
                Online Ordering
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => smoothScrollTo('#menu')}
                className="btn-outline w-full sm:w-auto"
              >
                View Menus
              </button>
              <a href="tel:+12136123000" className="btn-outline w-full sm:w-auto">
                Call the Counter
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.55 }}
              className="mt-8 grid gap-3 border-t border-black/10 pt-6 md:grid-cols-3"
            >
              {[
                { label: 'Current wait', value: wait.time },
                { label: 'Pickup window', value: '12-18 min' },
                { label: 'Vegan friendly', value: 'Plant-based options' },
              ].map((item) => (
                <div key={item.label} className="panel p-4">
                  <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-cream/42">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold text-brand-cream">
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7, ease: 'easeOut' }}
            className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[210px] sm:gap-4 lg:auto-rows-[180px] xl:auto-rows-[220px]"
          >
            {heroImages.map((image, index) => (
              <div key={image.src} className={`brand-frame overflow-hidden ${image.className ?? ''}`}>
                <div className="h-full overflow-hidden border border-black/12">
                  <ResponsiveImage
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full"
                    imgClassName="transition-transform duration-700 ease-out hover:scale-[1.03]"
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
