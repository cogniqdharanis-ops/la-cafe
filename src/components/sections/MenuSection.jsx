import { startTransition, useDeferredValue, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { menuCategories, menuItems } from '../../data/menuData'
import { useOrderPlan } from '../../context/OrderPlanContext'
import { smoothScrollTo } from '../../utils/helpers'
import { AnimatedSection } from '../ui/AnimatedSection'
import { MenuCard } from '../ui/MenuCard'

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm]         = useState('')
  const deferredSearch = useDeferredValue(searchTerm)
  const { plannedItems, itemCount, subtotal, clearPlan } = useOrderPlan()

  const normalizedSearch = deferredSearch.trim().toLowerCase()
  const filtered = menuItems.filter((item) => {
    const matchCat    = activeCategory === 'All' || item.category === activeCategory
    const matchSearch = !normalizedSearch ||
      `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(normalizedSearch)
    return matchCat && matchSearch
  })

  return (
    <section
      id="menu"
      className="section-padding border-t border-black/10"
      aria-labelledby="menu-heading"
    >
      <div className="container-max">

        {/* ── Section header ──────────────────────────── */}
        <AnimatedSection className="mb-8 max-w-3xl sm:mb-10">
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.26em] text-brand-amber">
            Menus
          </p>
          <h2
            id="menu-heading"
            className="mt-3 font-display font-bold text-brand-cream
                       text-[clamp(26px,6vw,48px)] leading-tight"
          >
            Easy to browse, fast to plan, built for real traffic.
          </h2>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-brand-cream/62 sm:text-base lg:text-lg">
            Filter by category, search by craving, and build an order plan before
            you choose pickup, delivery, or a quick walk-in.
          </p>
        </AnimatedSection>

        {/* ── Summary cards ───────────────────────────── */}
        <AnimatedSection delay={0.05} className="mb-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {[
            { label: 'Breakfast', text: 'All-day waffles, plates, burritos, toast, and classic diner comfort.' },
            { label: 'Vegan',     text: 'Plant-based options are easy to spot and ready for busy weekday ordering.' },
            { label: 'Ordering',  text: 'Use the plan below to keep pickup and delivery decisions quick.' },
          ].map((item) => (
            <div key={item.label} className="panel p-4 sm:p-5">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-brand-amber">
                {item.label}
              </p>
              <p className="mt-2.5 font-body text-sm leading-relaxed text-brand-cream/62">
                {item.text}
              </p>
            </div>
          ))}
        </AnimatedSection>

        {/* ── Filter + Search bar ─────────────────────── */}
        <AnimatedSection delay={0.08}>
          <div className="panel-strong p-3 sm:p-5">

            {/* Category tabs — horizontal scroll on mobile */}
            <div
              className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
              role="tablist"
              aria-label="Menu categories"
            >
              {menuCategories.map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => startTransition(() => setActiveCategory(cat))}
                  whileTap={{ scale: 0.97 }}
                  className={[
                    // min 44px tap target height
                    'shrink-0 min-h-[44px] px-4 py-2.5',
                    'font-body text-[11px] font-bold uppercase tracking-[0.14em]',
                    'border transition-all duration-200',
                    activeCategory === cat
                      ? 'border-black bg-black text-white'
                      : 'border-black/12 bg-white/55 text-brand-cream/65 hover:text-brand-cream hover:border-black/25',
                  ].join(' ')}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Search — full width, 44px height */}
            <div className="relative mt-3">
              <label htmlFor="menu-search" className="sr-only">
                Search the menu
              </label>
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2
                           text-brand-cream/45"
              />
              <input
                id="menu-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search menus…"
                className="h-11 w-full border border-black/12 bg-white/60
                           pl-11 pr-10 font-body text-sm text-brand-cream
                           placeholder:text-brand-cream/30 focus:outline-none
                           focus:border-black/30 transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2
                             items-center justify-center text-brand-cream/50
                             hover:text-brand-cream transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Result count */}
            <p className="mt-3 font-body text-xs uppercase tracking-[0.12em] text-brand-cream/45">
              {filtered.length} item{filtered.length !== 1 ? 's' : ''} shown
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </p>
          </div>
        </AnimatedSection>

        {/* ── Main grid: cards + sticky sidebar ───────── */}
        {/*
          Mobile:  cards full-width, sidebar stacks BELOW
          xl+:     sidebar sticky on the right
        */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,300px)]">

          {/* ── Menu cards ──── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${normalizedSearch}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filtered.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty state */}
            {!filtered.length && (
              <AnimatedSection>
                <div className="panel mt-4 p-8 text-center">
                  <h3 className="font-display text-2xl font-semibold text-brand-cream sm:text-3xl">
                    No items matched
                  </h3>
                  <p className="mx-auto mt-3 max-w-md font-body text-sm text-brand-cream/55">
                    Try: breakfast, burger, waffle, vegan, or coffee — or reset the filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSearchTerm(''); setActiveCategory('All') }}
                    className="btn-primary mt-6 sm:w-auto"
                  >
                    Reset Filters
                  </button>
                </div>
              </AnimatedSection>
            )}
          </div>

          {/* ── Order plan sidebar ────
              xl: sticky right column
              <xl: full-width block below cards
          ── */}
          <AnimatedSection
            delay={0.12}
            className="xl:sticky xl:top-[calc(var(--header-offset,80px)+1.5rem)] xl:self-start"
          >
            <div className="brand-frame">
              <div className="border border-black/10 bg-white/70 p-5">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-brand-amber">
                  Order Plan
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-brand-cream sm:text-3xl">
                  {itemCount ? `${itemCount} item${itemCount !== 1 ? 's' : ''} ready` : 'Start your order'}
                </h3>
                <p className="mt-2.5 font-body text-sm leading-relaxed text-brand-cream/58">
                  Save picks here first, then head to ordering with a clear pickup
                  or delivery game plan.
                </p>

                {plannedItems.length ? (
                  <>
                    {/* Planned items list */}
                    <div className="mt-4 space-y-2">
                      {plannedItems.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-3
                                     border border-black/8 bg-white/65 px-4 py-3"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-body text-sm font-bold
                                         uppercase tracking-[0.04em] text-brand-cream">
                              {item.name}
                            </p>
                            <p className="font-body text-[10px] uppercase
                                         tracking-[0.14em] text-brand-cream/40">
                              Qty {item.quantity}
                            </p>
                          </div>
                          <span className="font-display text-xl text-brand-cream shrink-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Subtotal */}
                    <div className="mt-5 flex items-center justify-between
                                    border-t border-black/10 pt-4">
                      <span className="font-body text-[10px] uppercase
                                       tracking-[0.16em] text-brand-cream/40">
                        Est. subtotal
                      </span>
                      <span className="font-display text-2xl text-brand-cream sm:text-3xl">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={() => smoothScrollTo('#order')}
                        className="btn-primary sm:w-auto"
                      >
                        Continue to Ordering
                      </button>
                      <button
                        type="button"
                        onClick={clearPlan}
                        className="btn-outline sm:w-auto"
                      >
                        Clear Plan
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-5 border border-dashed border-black/14
                                  bg-white/55 p-5">
                    <p className="font-body text-sm leading-relaxed text-brand-cream/52">
                      Use{' '}
                      <span className="font-bold text-brand-cream">Add to Plan</span>{' '}
                      on any card to keep pickup and delivery decisions fast.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
