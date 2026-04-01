import { Sunrise, Leaf, Moon, Zap } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '../ui/AnimatedSection'

const features = [
  {
    icon: Sunrise,
    title: 'All-Day Breakfast',
    desc: 'From 8AM to close — eggs, waffles, chicken & waffles, burritos, bagels. Always on the menu, no cutoff.',
    iconColor: '#a7552f',
    iconBg: 'rgba(167,85,47,0.1)',
    border: 'rgba(167,85,47,0.18)',
  },
  {
    icon: Leaf,
    title: 'Vegan Friendly',
    desc: 'A dedicated plant-based menu with bold, satisfying options — clearly marked, never an afterthought.',
    iconColor: '#16a34a',
    iconBg: 'rgba(22,163,74,0.1)',
    border: 'rgba(22,163,74,0.18)',
  },
  {
    icon: Moon,
    title: 'Open Till 2 AM',
    desc: 'Full menu until 2AM Fri–Sat, midnight on weekdays. DTLA\'s go-to for late-night comfort food.',
    iconColor: '#525252',
    iconBg: 'rgba(82,82,82,0.1)',
    border: 'rgba(82,82,82,0.18)',
  },
  {
    icon: Zap,
    title: 'Made to Order',
    desc: 'Everything scratch-made when you order. Generous portions, real ingredients, no frozen shortcuts.',
    iconColor: '#000000',
    iconBg: 'rgba(0,0,0,0.08)',
    border: 'rgba(0,0,0,0.14)',
  },
]

export function FeaturesSection() {
  return (
    <section className="section-padding relative overflow-x-clip border-y border-black/8"
             style={{ background: 'rgba(255,255,255,0.3)' }}>
      <div className="container-max relative">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-brand-amber">
            Why Choose Us
          </p>
          <h2 className="font-display text-4xl font-black text-brand-cream sm:text-5xl">
            What Makes Us{' '}
            <span className="text-gradient italic">Different</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map(f => (
            <StaggerItem key={f.title}>
              <div
                className="panel-strong group h-full cursor-default rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: f.border }}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                  style={{ background: f.iconBg }}
                >
                  <f.icon size={22} style={{ color: f.iconColor }} />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-brand-cream transition-colors duration-300 group-hover:text-brand-amber">
                  {f.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-brand-cream/55">
                  {f.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
