import { startTransition, useDeferredValue, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { menuCategories, menuItems } from '../../data/menuData'
import { useOrderPlan } from '../../context/OrderPlanContext'
import { smoothScrollTo } from '../../utils/helpers'
import { AnimatedSection } from '../ui/AnimatedSection'
import { MenuCard } from '../ui/MenuCard'

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const deferredSearch = useDeferredValue(searchTerm)
  const { plannedItems, itemCount, subtotal, clearPlan } = useOrderPlan()

  const normalizedSearch = deferredSearch.trim().toLowerCase()
  const filtered = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory
    const matchesSearch =
      !normalizedSearch ||
      `${item.name} ${item.description} ${item.category}`
        .toLowerCase()
        .includes(normalizedSearch)

    return matchesCategory && matchesSearch
  })

  return (
    <section id="menu" className="section-padding border-t border-black/10" aria-labelledby="menu-heading">
      <div className="container-max">
        <AnimatedSection className="mb-10 max-w-3xl">
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.26em] text-brand-amber">
            Menus
          </p>
          <h2 id="menu-heading" className="mt-3 font-display text-4xl font-bold text-brand-cream sm:text-5xl">
            Easy to browse, fast to plan, built for real traffic.
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-brand-cream/64 sm:text-lg">
            Filter by category, search by craving, and build an order plan before you choose pickup, delivery, or a quick walk-in.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.05} className="mb-8 grid gap-4 md:grid-cols-3">
          {[
            {
              label: 'Breakfast',
              text: 'All-day waffles, plates, burritos, toast, and classic diner comfort.',
            },
            {
              label: 'Vegan',
              text: 'Plant-based options are easy to spot and ready for busy weekday ordering.',
            },
            {
              label: 'Ordering',
              text: 'Use the plan on the right to keep pickup and delivery decisions quick.',
            },
          ].map((item) => (
            <div key={item.label} className="panel p-5">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-brand-amber">
                {item.label}
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-brand-cream/64">
                {item.text}
              </p>
            </div>
          ))}
        </AnimatedSection>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,320px)]">
          <AnimatedSection delay={0.08}>
            <div className="panel-strong p-4 sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div
                  className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]"
                  aria-label="Menu categories"
                >
                  {menuCategories.map((category) => (
                    <motion.button
                      key={category}
                      type="button"
                      onClick={() =>
                        startTransition(() => {
                          setActiveCategory(category)
                        })
                      }
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      aria-pressed={activeCategory === category}
                      className={`shrink-0 border px-4 py-2 font-body text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-200 min-h-11 ${
                        activeCategory === category
                          ? 'border-black bg-black text-white'
                          : 'border-black/12 bg-white/55 text-brand-cream/68 hover:text-brand-cream'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>

                <div className="relative w-full lg:max-w-sm">
                  <label htmlFor="menu-search" className="sr-only">
                    Search the menu
                  </label>
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-cream/48"
                  />
                  <input
                    id="menu-search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search menus"
                    className="h-12 w-full border border-black/12 bg-white/60 pl-11 pr-11 font-body text-sm text-brand-cream placeholder:text-brand-cream/32"
                  />
                  {searchTerm ? (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-brand-cream/54 transition-colors hover:text-brand-cream"
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-black/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-body text-sm uppercase tracking-[0.12em] text-brand-cream/54">
                  {filtered.length} items shown
                  {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
                </p>
                <div className="flex flex-wrap gap-2">
                  {normalizedSearch ? (
                    <span className="border border-black/12 bg-white/60 px-3 py-1 font-body text-[10px] uppercase tracking-[0.16em] text-brand-cream/58">
                      Search: {deferredSearch}
                    </span>
                  ) : null}
                  <span className="border border-black/12 bg-white/60 px-3 py-1 font-body text-[10px] uppercase tracking-[0.16em] text-brand-cream/58">
                    Quick add saves to order plan
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12} className="xl:sticky xl:top-[calc(var(--header-offset,112px)+1.5rem)]">
            <div className="brand-frame h-full">
              <div className="border border-black/12 bg-white/70 p-5">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-brand-amber">
                  Order Plan
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-brand-cream">
                  {itemCount ? `${itemCount} items ready` : 'Start your order'}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-brand-cream/60">
                  Save menu picks here first, then head to ordering with a clear pickup or delivery game plan.
                </p>

                {plannedItems.length ? (
                  <>
                    <div className="mt-4 space-y-2">
                      {plannedItems.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col gap-3 border border-black/10 bg-white/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-body text-sm font-bold uppercase tracking-[0.04em] text-brand-cream">
                              {item.name}
                            </p>
                            <p className="font-body text-[10px] uppercase tracking-[0.14em] text-brand-cream/42">
                              Qty {item.quantity}
                            </p>
                          </div>
                          <span className="font-display text-2xl text-brand-cream">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                      <span className="font-body text-[10px] uppercase tracking-[0.16em] text-brand-cream/42">
                        Estimated subtotal
                      </span>
                      <span className="font-display text-3xl text-brand-cream">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={() => smoothScrollTo('#order')}
                        className="btn-primary w-full"
                      >
                        Continue to Ordering
                      </button>
                      <button
                        type="button"
                        onClick={clearPlan}
                        className="btn-outline w-full"
                      >
                        Clear Plan
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-5 border border-dashed border-black/16 bg-white/60 p-5">
                    <p className="font-body text-sm leading-relaxed text-brand-cream/56">
                      Use <span className="font-bold text-brand-cream">Add to Plan</span> on any card to keep pickup and delivery decisions fast.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${normalizedSearch}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
            className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {!filtered.length ? (
          <AnimatedSection className="mt-8">
            <div className="panel p-8 text-center">
              <h3 className="font-display text-3xl font-semibold text-brand-cream">
                No menu items matched that search
              </h3>
              <p className="mx-auto mt-3 max-w-lg font-body text-brand-cream/58">
                Try a broader keyword like breakfast, burger, waffle, vegan, or coffee, or reset the menu view.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('')
                  setActiveCategory('All')
                }}
                className="btn-primary mt-6"
              >
                Reset Menu View
              </button>
            </div>
          </AnimatedSection>
        ) : null}
      </div>
    </section>
  )
}
