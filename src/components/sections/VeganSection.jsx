import { motion } from 'framer-motion'
import { Leaf, Check, ArrowRight } from 'lucide-react'
import { menuItems } from '../../data/menuData'
import { AnimatedSection, StaggerContainer, StaggerItem } from '../ui/AnimatedSection'
import { PremiumImage } from '../ui/PremiumImage'
import { formatPrice, smoothScrollTo } from '../../utils/helpers'

const veganPerks = [
  '100% Plant-Based Ingredients',
  'No Cross-Contamination',
  'Clearly Labeled Menu Items',
  'Dairy & Egg-Free Options Available',
]

export function VeganSection() {
  const veganItems = menuItems.filter(i => i.category === 'Vegan').slice(0, 3)

  return (
    <section
      id="vegan"
      className="section-padding border-y border-black/8"
      style={{ background: 'rgba(240,247,242,0.6)' }}
    >
      {/* Subtle green tint glow — light version */}
      <div className="pointer-events-none absolute left-[-6rem] top-8 h-64 w-64 rounded-full blur-3xl"
           style={{ background: 'rgba(52,211,153,0.07)', position: 'absolute' }} />

      <div className="container-max relative">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_1.05fr] xl:gap-16">

          {/* ── Left panel ── */}
          <AnimatedSection direction="right">
            <div className="panel-strong rounded-[34px] p-6 sm:p-8 lg:p-10">

              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-body font-bold uppercase tracking-[0.18em]"
                   style={{
                     background: 'rgba(22,163,74,0.08)',
                     borderColor: 'rgba(22,163,74,0.2)',
                     color: '#15803d',
                   }}>
                <Leaf size={13} />
                100% Plant-Based
              </div>

              <h2 className="mb-5 font-display text-4xl font-black leading-tight text-brand-cream sm:text-5xl">
                Vegan Never<br />
                Tasted This{' '}
                <span style={{ color: '#16a34a', fontStyle: 'italic' }}>Good.</span>
              </h2>

              <p className="mb-8 max-w-2xl font-body text-lg leading-relaxed text-brand-cream/65">
                We build plant-based plates with the same downtown swagger as the rest
                of the menu — layered flavor, generous portions, no compromise on comfort.
              </p>

              {/* Perks grid */}
              <div className="mb-8 grid gap-3 sm:grid-cols-2">
                {veganPerks.map(perk => (
                  <div key={perk}
                       className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white/60 px-4 py-3 font-body text-sm text-brand-cream">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                          style={{ background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)' }}>
                      <Check size={12} style={{ color: '#16a34a' }} />
                    </span>
                    {perk}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => smoothScrollTo('#menu')}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full px-8 py-3 font-body font-bold text-white transition-all duration-300 sm:w-auto"
                  style={{ background: '#16a34a', boxShadow: '0 8px 24px rgba(22,163,74,0.22)' }}
                >
                  <Leaf size={16} /> Explore Vegan Menu <ArrowRight size={16} />
                </motion.button>

                <div className="panel rounded-2xl px-5 py-3">
                  <div className="font-accent text-3xl leading-none" style={{ color: '#16a34a' }}>3</div>
                  <div className="mt-1.5 font-body text-[10px] uppercase tracking-[0.18em] text-brand-cream/45">
                    Signature Vegan Plates
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Right — item cards ── */}
          <StaggerContainer className="flex flex-col gap-4">
            <div className="panel rounded-[28px] p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.2em]"
                     style={{ color: 'rgba(22,163,74,0.7)' }}>
                    Curated Spotlight
                  </p>
                  <h3 className="font-display text-3xl font-bold text-brand-cream">
                    Top plant-based picks
                  </h3>
                </div>
                <div className="rounded-full px-4 py-2 font-body text-[10px] uppercase tracking-[0.18em]"
                     style={{
                       background: 'rgba(22,163,74,0.08)',
                       border: '1px solid rgba(22,163,74,0.18)',
                       color: '#15803d',
                     }}>
                  Rotates with the season
                </div>
              </div>
            </div>

            {veganItems.map(item => (
              <StaggerItem key={item.id}>
                <motion.div
                  whileHover={{ x: 4 }} transition={{ duration: 0.25 }}
                  className="panel flex items-center gap-5 rounded-[28px] p-4 transition-all duration-300 group cursor-default"
                  style={{ '--hover-border': 'rgba(22,163,74,0.2)' }}
                >
                  <PremiumImage
                    src={item.image} alt={item.name} theme="vegan"
                    className="h-24 w-24 shrink-0 rounded-[20px]"
                    imgClassName="transition-transform duration-300 group-hover:scale-105"
                    fallbackLabel="Plant Based" fallbackTitle={item.name}
                    sizes="96px"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 font-body text-[10px] font-bold uppercase tracking-[0.2em]"
                         style={{ color: '#16a34a' }}>
                      Plant-Based
                    </div>
                    <h3 className="font-display font-semibold text-brand-cream transition-colors duration-300 group-hover:text-brand-amber">
                      {item.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 font-body text-xs leading-relaxed text-brand-cream/50">
                      {item.description}
                    </p>
                  </div>
                  <div className="ml-auto shrink-0 rounded-full border border-black/10 bg-white/60 px-3 py-2 font-display text-xl font-bold text-brand-cream">
                    {formatPrice(item.price)}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
