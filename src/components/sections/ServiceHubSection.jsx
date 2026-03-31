import { ArrowRight, Bike, Car, Leaf, Phone } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '../ui/AnimatedSection'
import { WaitTimeBadge } from '../ui/WaitTimeBadge'
import { quickActions, visitEssentials } from '../../data/siteData'
import { useCafeStatus } from '../../hooks/useCafeStatus'
import { smoothScrollTo } from '../../utils/helpers'

const serviceCards = [
  {
    icon: Car,
    title: 'Curbside pickup',
    eyebrow: 'Fastest option',
    description:
      'Perfect for the lunch rush, late-night pickup, or anyone who wants breakfast without the dine-in line.',
  },
  {
    icon: Bike,
    title: 'Delivery across DTLA',
    eyebrow: 'Built for convenience',
    description:
      'DoorDash, Uber Eats, and Grubhub keep the menu moving when you cannot make it to the counter.',
  },
  {
    icon: Leaf,
    title: 'Plant-based answers up front',
    eyebrow: 'Zero guesswork',
    description:
      'Vegan items are clearly marked, easy to find, and called out across the ordering journey.',
  },
]

export function ServiceHubSection() {
  const { cafeTime, service, wait } = useCafeStatus()

  return (
    <section id="wait-times" className="section-padding relative overflow-x-clip" aria-labelledby="wait-times-heading">
      <div className="pointer-events-none absolute inset-x-0 top-12 h-64 bg-gradient-to-r from-brand-red/12 via-brand-gold/10 to-transparent blur-3xl" />
      <div className="container-max relative">
        <AnimatedSection className="mb-12 max-w-3xl">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Smart Visit Planner
          </p>
          <h2 id="wait-times-heading" className="font-display text-4xl font-black text-brand-cream sm:text-5xl">
            Know the line, <span className="text-gradient italic">choose the fastest path</span>, and get on with your day.
          </h2>
          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-brand-cream/58 sm:text-lg">
            The site now puts the operational details first: live wait signal, late-night hours, walk-in policy, parking help, and the fastest ordering route for busy DTLA traffic.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_420px]">
          <AnimatedSection>
            <div className="panel-strong rounded-[34px] p-5 sm:p-6 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
                <div>
                  <p className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold/80">
                    Live Wait Snapshot
                  </p>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <WaitTimeBadge showTimestamp />
                    <span className="rounded-full border border-brand-cream/10 bg-white/5 px-3 py-1 text-[11px] font-body uppercase tracking-[0.18em] text-brand-cream/58">
                      {cafeTime}
                    </span>
                  </div>
                  <h3 className="font-display text-4xl font-black text-brand-cream sm:text-5xl">
                    {wait.time}
                  </h3>
                  <p className="mt-3 max-w-xl font-body text-brand-cream/62 leading-relaxed">
                    {wait.description} {service.open ? service.detail : service.nextWindow}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1">
                  {[
                    {
                      label: 'Current status',
                      value: wait.label,
                    },
                    {
                      label: 'Store status',
                      value: service.label,
                    },
                    {
                      label: 'Best move',
                      value: wait.recommendation,
                    },
                  ].map((item) => (
                    <div key={item.label} className="panel rounded-[24px] p-4">
                      <p className="font-body text-[10px] uppercase tracking-[0.2em] text-brand-gold/70">
                        {item.label}
                      </p>
                      <p className="mt-2 font-display text-2xl font-semibold leading-tight text-brand-cream">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {quickActions.map((action) => {
                  const isAnchor = action.href.startsWith('#')

                  if (isAnchor) {
                    return (
                      <button
                        key={action.label}
                        type="button"
                        onClick={() => smoothScrollTo(action.href)}
                        className="panel group h-full rounded-[24px] p-4 text-left transition-all duration-300 hover:border-brand-gold/24 hover:-translate-y-0.5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-display text-xl font-semibold text-brand-cream">
                              {action.label}
                            </div>
                            <p className="mt-2 font-body text-sm leading-relaxed text-brand-cream/52">
                              {action.description}
                            </p>
                          </div>
                          <ArrowRight size={18} className="mt-1 shrink-0 text-brand-gold transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </button>
                    )
                  }

                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      target={action.external ? '_blank' : undefined}
                      rel={action.external ? 'noreferrer' : undefined}
                      className="panel group h-full rounded-[24px] p-4 text-left transition-all duration-300 hover:border-brand-gold/24 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-display text-xl font-semibold text-brand-cream">
                            {action.label}
                          </div>
                          <p className="mt-2 font-body text-sm leading-relaxed text-brand-cream/52">
                            {action.description}
                          </p>
                        </div>
                        <ArrowRight size={18} className="mt-1 shrink-0 text-brand-gold transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="space-y-4">
              {visitEssentials.map((item) => (
                <div key={item.title} className="panel rounded-[28px] p-5">
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-brand-gold/70">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-brand-cream">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-brand-cream/56">
                    {item.description}
                  </p>
                </div>
              ))}

              <div className="panel-strong rounded-[28px] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-brand-gold/70">
                      Need the counter?
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-brand-cream">
                      Call before you roll in
                    </h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-brand-cream/56">
                      Perfect for large pickup orders, dietary questions, curbside updates, and late-night check-ins.
                    </p>
                  </div>
                  <Phone size={20} className="mt-1 shrink-0 text-brand-red" />
                </div>
                <a
                  href="tel:+12136123000"
                  className="btn-primary mt-5 inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  Call 213-612-3000
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <StaggerContainer className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceCards.map((card) => (
            <StaggerItem key={card.title}>
              <div className="panel h-full rounded-[28px] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-gold/16 bg-brand-gold/10 text-brand-gold">
                    <card.icon size={22} />
                  </div>
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-brand-gold/72">
                      {card.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-brand-cream">
                      {card.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-brand-cream/56">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
