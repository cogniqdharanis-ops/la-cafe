import { Heart, Users, Award, ExternalLink } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { PremiumImage } from '../ui/PremiumImage'

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_minmax(0,0.98fr)] xl:gap-16">

          {/* Image side */}
          <AnimatedSection direction="right">
            <div className="panel-strong rounded-[34px] p-3">
              <div className="relative overflow-hidden rounded-[28px]">
                <PremiumImage
                  src="/images/site/restaurant-interior.jpg"
                  alt="The L.A. Cafe interior"
                  theme="interior"
                  className="h-[340px] w-full sm:h-[420px] lg:h-[500px]"
                  fallbackLabel="The Room"
                  fallbackTitle="Warm light, late nights, and comfort plates."
                  sizes="(min-width:1024px) 50vw,100vw"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="panel inline-flex items-center gap-3 rounded-full px-4 py-2 text-brand-cream/72">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-amber" />
                    <span className="font-body text-xs uppercase tracking-[0.2em]">
                      Sidewalk seating available
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div className="panel rounded-[22px] p-5">
                  <div className="font-accent text-4xl leading-none text-brand-amber">9+</div>
                  <div className="mt-2 font-body text-sm text-brand-cream/60">
                    Years serving DTLA from morning rush to last call.
                  </div>
                </div>
                <div className="panel rounded-[22px] p-5">
                  {/* Correct rating: 4.3/5 */}
                  <div className="mb-1 font-display text-2xl font-bold text-brand-cream">4.3/5</div>
                  <div className="flex text-yellow-500 text-sm mb-1">★★★★☆</div>
                  <div className="font-body text-sm text-brand-cream/60">
                    2,281+ Google reviews from locals, regulars, and first-timers.
                  </div>
                </div>
                <div className="panel rounded-[22px] p-5">
                  <div className="font-accent text-4xl leading-none text-brand-amber">$10</div>
                  <div className="mt-2 font-body text-sm text-brand-cream/60">
                    Average check. Generous portions at honest DTLA prices.
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Text side */}
          <AnimatedSection direction="left">
            <div className="panel rounded-[34px] p-6 sm:p-8 lg:p-10">
              <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-brand-amber">
                Our Story
              </p>
              <h2 className="mb-6 font-display text-4xl font-black leading-tight text-brand-cream sm:text-5xl">
                Built on Community,{' '}
                <span className="text-gradient italic">Comfort</span>{' '}
                &amp; Craft.
              </h2>
              <div className="space-y-4 font-body text-[1.03rem] leading-relaxed text-brand-cream/62">
                <p>
                  The L.A. Cafe started with one idea: downtown should have a place
                  where generous food, warm service, and late-night comfort all
                  belong in the same room. We opened at 639 S. Spring St. inside
                  Spring Towers Lofts — right in the heart of the Historic Core.
                </p>
                <p>
                  Our menu is built in-house every day with real ingredients and
                  honest portions. Scratch-made breakfast all day, hearty burgers,
                  chicken &amp; waffles, fresh bagels and pastries, and a dedicated
                  vegan menu — no frozen shortcuts, no flavor packets.
                </p>
                <p>
                  Whether you walk in at 8AM for a coffee and burrito or pull up for
                  a 1AM smash burger, the feeling should be the same: lively,
                  welcoming, and worth the trip.
                </p>
              </div>

              {/* Quick facts */}
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  { label: 'Dine-in with sidewalk seating' },
                  { label: 'Curbside pickup & delivery' },
                  { label: 'Walk-in only — no reservations' },
                  { label: 'Near Fashion District, DTLA' },
                ].map(f => (
                  <div key={f.label} className="flex items-center gap-2 font-body text-sm text-brand-cream/65">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-amber" />
                    {f.label}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Heart, label: 'Scratch-Made Daily', color: '#a7552f' },
                  { icon: Users, label: 'Community Focused', color: '#929292' },
                  { icon: Award, label: '4.3★ Google Rated', color: '#ca8a04' },
                ].map(item => (
                  <div
                    key={item.label}
                    className="panel rounded-[22px] p-5 text-center transition-all duration-300 hover:shadow-md"
                  >
                    <item.icon size={22} className="mx-auto mb-3" style={{ color: item.color }} />
                    <span className="font-body text-[11px] uppercase tracking-[0.16em] text-brand-cream/55 leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=639+S+Spring+St+Los+Angeles+CA+90014"
                target="_blank" rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.14em] text-brand-amber transition-opacity hover:opacity-75"
              >
                Get Directions <ExternalLink size={14} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
