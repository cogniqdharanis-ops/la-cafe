import { Heart, Users, Award } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { PremiumImage } from '../ui/PremiumImage'

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_minmax(0,0.98fr)] xl:gap-16">
          <AnimatedSection direction="right">
            <div className="panel-strong rounded-[34px] p-3">
              <div className="relative overflow-hidden rounded-[28px]">
                <PremiumImage
                  src="/images/site/restaurant-interior.jpg"
                  alt="The L.A. Cafe interior"
                  theme="interior"
                  className="h-[360px] w-full sm:h-[440px] lg:h-[520px]"
                  fallbackLabel="The Room"
                  fallbackTitle="Warm light, late nights, and comfort plates."
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="panel inline-flex items-center gap-3 rounded-full px-4 py-2 text-brand-cream/72">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-gold" />
                    <span className="font-body text-xs uppercase tracking-[0.2em]">
                      Built for the neighborhood
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="panel rounded-[24px] p-5">
                  <div className="font-accent text-4xl text-brand-red leading-none">9+</div>
                  <div className="mt-2 font-body text-sm text-brand-cream/62">
                    Years serving DTLA from morning rush to last call.
                  </div>
                </div>
                <div className="panel rounded-[24px] p-5">
                  <div className="text-yellow-400 text-base mb-1">★★★★★</div>
                  <div className="font-body text-sm text-brand-cream/62">
                    Over 1,200 reviews from locals, regulars, and first-timers.
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left">
            <div className="panel rounded-[34px] p-6 sm:p-8 lg:p-10">
              <p className="font-body text-brand-gold uppercase tracking-[0.25em] text-sm font-semibold mb-4">
                Our Story
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-brand-cream mb-6 leading-tight">
                Built on{' '}
                <span className="text-gradient italic">Community,</span>
                <br />
                Comfort &amp; Craft.
              </h2>
              <div className="space-y-4 font-body text-brand-cream/60 leading-relaxed text-[1.05rem]">
                <p>
                  The L.A. Cafe started with one idea: downtown should have a place
                  where generous food, warm service, and late-night comfort all
                  belong in the same room.
                </p>
                <p>
                  Our menu is built in-house every day with real ingredients and
                  honest portions. No frozen shortcuts. No flavor packets. Just
                  recipes refined over years of feeding regulars.
                </p>
                <p>
                  Whether you walk in for a 7AM coffee or a 1AM burger, the feeling
                  should be the same: lively, welcoming, and worth coming back to.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {[
                  { icon: Heart, label: 'Scratch-Made Daily', color: 'text-brand-red' },
                  { icon: Users, label: 'Community Focused', color: 'text-brand-gold' },
                  { icon: Award, label: 'Award Winning', color: 'text-emerald-400' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="panel rounded-[24px] p-5 text-center transition-all duration-300 hover:border-brand-gold/24"
                  >
                    <item.icon size={22} className={`${item.color} mx-auto mb-3`} />
                    <span className="font-body text-[11px] uppercase tracking-[0.18em] text-brand-cream/55 leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
