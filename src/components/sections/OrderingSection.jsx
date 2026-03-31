// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ArrowRight, Bike, Car, Clock, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useOrderPlan } from '../../context/OrderPlanContext'
import { formatPrice, smoothScrollTo } from '../../utils/helpers'
import { AnimatedSection } from '../ui/AnimatedSection'
import { WaitTimeBadge } from '../ui/WaitTimeBadge'

const orderModes = [
  {
    icon: Car,
    title: 'Pickup + curbside',
    desc: 'Best for busy lunch runs, late-night cravings, and anyone who wants to skip the in-store line.',
    time: '12-18 min',
    cta: 'Call for pickup',
    href: 'tel:+12136123000',
  },
  {
    icon: Bike,
    title: 'Delivery partners',
    desc: 'DoorDash, Uber Eats, and Grubhub keep the menu moving across DTLA when leaving your desk is not happening.',
    time: '25-40 min',
    cta: 'See delivery info',
    href: '#contact',
  },
]

export function OrderingSection() {
  const {
    plannedItems,
    itemCount,
    subtotal,
    incrementItem,
    decrementItem,
    clearPlan,
  } = useOrderPlan()

  return (
    <section id="order" className="section-padding border-t border-black/10" aria-labelledby="order-heading">
      <div className="container-max">
        <AnimatedSection>
          <div className="brand-frame">
            <div className="border border-black/12 bg-white/72 p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-center">
                <div>
                  <p className="font-body text-[11px] font-bold uppercase tracking-[0.24em] text-brand-amber">
                    Ordering
                  </p>
                  <h2 id="order-heading" className="mt-3 font-display text-4xl font-bold leading-tight text-brand-cream sm:text-5xl">
                    Pick the fastest path and keep the line from slowing you down.
                  </h2>
                  <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-brand-cream/64 sm:text-lg">
                    Walk in when the room is calm, use pickup when the rush is building, and lean on delivery when you need the menu to come to you.
                  </p>
                </div>

                <div className="panel border-black/12 p-5">
                  <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-amber">
                    Live prep snapshot
                  </p>
                  <p className="mt-2 font-display text-3xl text-brand-cream">
                    {itemCount ? `${itemCount} items planned` : 'Ready when you are'}
                  </p>
                  <p className="mt-3 font-body text-sm leading-relaxed text-brand-cream/60">
                    Your order plan stays local while you browse, so you can build first and choose the right service mode second.
                  </p>
                  <div className="mt-4">
                    <WaitTimeBadge compact className="border-black/12 bg-white/72" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <AnimatedSection direction="right">
            <div className="panel-strong h-full p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-amber">
                    Order plan
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-brand-cream">
                    {itemCount ? 'Review your selections' : 'Start with the menu'}
                  </h3>
                </div>
                <ShoppingBag size={22} className="text-brand-cream" />
              </div>

              {plannedItems.length ? (
                <>
                  <div className="mt-5 space-y-3">
                    {plannedItems.map((item) => (
                      <div
                        key={item.id}
                        className="border border-black/10 bg-white/60 p-4"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h4 className="font-body text-lg font-bold uppercase tracking-[0.04em] text-brand-cream">
                              {item.name}
                            </h4>
                            <p className="mt-1 font-body text-[10px] uppercase tracking-[0.16em] text-brand-cream/42">
                              {item.category}
                            </p>
                          </div>
                          <span className="font-display text-2xl text-brand-cream">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => decrementItem(item.id)}
                              className="flex h-11 w-11 items-center justify-center border border-black/12 bg-white/70 text-brand-cream transition-colors hover:bg-black hover:text-white"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-8 text-center font-body text-sm font-semibold text-brand-cream">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => incrementItem(item.id)}
                              className="flex h-11 w-11 items-center justify-center border border-black/12 bg-white/70 text-brand-cream transition-colors hover:bg-black hover:text-white"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-body text-[10px] uppercase tracking-[0.16em] text-brand-cream/42">
                            Each {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-4 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-cream/42">
                        Estimated subtotal
                      </p>
                      <p className="mt-2 font-display text-4xl text-brand-cream">
                        {formatPrice(subtotal)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={clearPlan}
                      className="btn-outline w-full sm:w-auto"
                    >
                      Clear Plan
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-5 border border-dashed border-black/16 bg-white/55 p-5">
                  <p className="font-body text-sm leading-relaxed text-brand-cream/56">
                    Add favorites from the menu first. This area then becomes your pickup and delivery launch point.
                  </p>
                </div>
              )}
            </div>
          </AnimatedSection>

          <div className="grid gap-6">
            {orderModes.map((mode) => (
              <AnimatedSection key={mode.title} direction="left">
                <div className="panel h-full p-6">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-black/12 bg-white/70 text-brand-cream">
                      <mode.icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-brand-cream">
                        {mode.title}
                      </h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-brand-cream/58">
                        {mode.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 font-body text-sm text-brand-cream/48">
                      <Clock size={14} /> Ready in about {mode.time}
                    </div>
                    {mode.href.startsWith('#') ? (
                      <motion.button
                        type="button"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => smoothScrollTo(mode.href)}
                        className="btn-primary w-full sm:w-auto"
                      >
                        {mode.cta}
                        <ArrowRight size={14} />
                      </motion.button>
                    ) : (
                      <motion.a
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        href={mode.href}
                        className="btn-primary w-full sm:w-auto"
                      >
                        {mode.cta}
                        <ArrowRight size={14} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
