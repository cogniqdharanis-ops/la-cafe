// eslint-disable-next-line no-unused-vars
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
  const veganItems = menuItems.filter((i) => i.category === 'Vegan').slice(0, 3)

  const scrollToMenu = () => {
    smoothScrollTo('#menu')
  }

  return (
    <section
      id="vegan"
      className="section-padding relative overflow-hidden border-y border-emerald-900/20 bg-gradient-to-br from-emerald-950/42 via-brand-dark to-brand-dark"
    >
      <div className="pointer-events-none absolute left-[-8rem] top-16 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-brand-gold/8 blur-3xl" />

      <div className="container-max relative">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_1.05fr] xl:gap-16">
          <AnimatedSection direction="right">
            <div className="panel-strong rounded-[34px] p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/12 border border-emerald-500/25 text-emerald-400 text-xs font-body font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-6">
                <Leaf size={13} /> 100% Plant-Based
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-brand-cream mb-5 leading-tight">
                Vegan Never
                <br />
                Tasted This{' '}
                <span className="text-emerald-400 italic">Good.</span>
              </h2>
              <p className="font-body text-brand-cream/58 text-lg leading-relaxed mb-8 max-w-2xl">
                We build plant-based plates with the same downtown swagger as the
                rest of the menu: layered flavor, generous portions, and no
                compromise on comfort.
              </p>

              <div className="mb-10 grid gap-3 sm:grid-cols-2">
                {veganPerks.map((perk) => (
                  <div
                    key={perk}
                    className="panel flex items-center gap-3 rounded-2xl px-4 py-4 font-body text-brand-cream/74"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500/35 bg-emerald-500/15 shrink-0">
                      <Check size={12} className="text-emerald-400" />
                    </span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToMenu}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 font-body font-bold text-white transition-all duration-300 shadow-lg hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-500/30 sm:w-auto"
                >
                  <Leaf size={16} /> Explore Vegan Menu <ArrowRight size={16} />
                </motion.button>

                <div className="panel rounded-2xl px-5 py-4">
                  <div className="font-accent text-3xl text-emerald-300 leading-none">3</div>
                  <div className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-cream/45 mt-2">
                    Signature Vegan Plates
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <StaggerContainer className="flex flex-col gap-4">
            <div className="panel rounded-[28px] p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-emerald-300/70 font-bold mb-2">
                    Curated Spotlight
                  </p>
                  <h3 className="font-display text-3xl font-bold text-brand-cream">
                    Top plant-based picks
                  </h3>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-[10px] font-body uppercase tracking-[0.18em] text-emerald-300">
                  Rotates with the season
                </div>
              </div>
            </div>

            {veganItems.map((item) => (
              <StaggerItem key={item.id}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                  className="panel flex items-center gap-5 rounded-[28px] p-4 transition-all duration-300 group cursor-default hover:border-emerald-500/26"
                >
                  <PremiumImage
                    src={item.image}
                    alt={item.name}
                    theme="vegan"
                    className="h-24 w-24 shrink-0 rounded-[22px]"
                    imgClassName="transition-transform duration-300 group-hover:scale-105"
                    fallbackLabel="Plant Based"
                    fallbackTitle={item.name}
                    sizes="96px"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-body text-[10px] text-emerald-400 font-bold uppercase tracking-[0.2em] mb-1">
                      Plant-Based
                    </div>
                    <h3 className="font-display font-semibold text-brand-cream group-hover:text-emerald-300 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="font-body text-xs text-brand-cream/45 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="font-display text-xl font-bold text-brand-gold shrink-0 ml-auto rounded-full border border-brand-gold/14 bg-black/20 px-3 py-2">
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
