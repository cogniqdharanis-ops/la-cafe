import { Sunrise, Leaf, Moon, Zap } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '../ui/AnimatedSection'

const features = [
  {
    icon: Sunrise,
    title: 'All-Day Breakfast',
    desc: 'From 7AM to close. Eggs, waffles, and everything in between — always on the menu, no cutoff time.',
    color: 'text-brand-amber',
    bg: 'bg-brand-amber/10 border-brand-amber/20',
    iconBg: 'bg-brand-amber/10',
  },
  {
    icon: Leaf,
    title: 'Vegan Friendly',
    desc: "A dedicated plant-based menu with bold, satisfying options. Never an afterthought — always delicious.",
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    iconBg: 'bg-emerald-500/10',
  },
  {
    icon: Moon,
    title: 'Late Night Open',
    desc: "Kitchen runs till 1:30AM. Full menu until 2AM. Because cravings don't have a curfew.",
    color: 'text-brand-gold',
    bg: 'bg-brand-gold/10 border-brand-gold/20',
    iconBg: 'bg-brand-gold/10',
  },
  {
    icon: Zap,
    title: 'Made to Order',
    desc: 'Every plate crafted fresh when you order. No shortcuts, no heat lamps — just real quality food.',
    color: 'text-brand-red',
    bg: 'bg-brand-red/10 border-brand-red/20',
    iconBg: 'bg-brand-red/10',
  },
]

export function FeaturesSection() {
  return (
    <section className="section-padding relative overflow-x-clip border-y border-brand-gold/10 bg-brand-brown/18">
      <div className="pointer-events-none absolute left-[-8rem] top-12 h-64 w-64 rounded-full bg-brand-gold/8 blur-3xl" />
      <div className="container-max relative">
        <AnimatedSection className="mb-14 text-center">
          <p className="font-body text-brand-gold uppercase tracking-[0.25em] text-sm font-semibold mb-3">
            Why Choose Us
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-brand-cream">
            What Makes Us{' '}
            <span className="text-gradient italic">Different</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div
                className={`panel group h-full rounded-[28px] p-7 transition-all duration-500 hover:scale-[1.02] cursor-default ${feature.bg}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}
                >
                  <feature.icon size={22} className={feature.color} />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-cream mb-3 group-hover:text-brand-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-brand-cream/50 leading-relaxed">{feature.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
