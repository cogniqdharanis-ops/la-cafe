import { ArrowUpRight, BadgeX, Camera, Car, Clock3, Mail, MapPin, Phone, Users } from 'lucide-react'
import { mapEmbedSrc, parkingTips, socialLinks, weeklyHours } from '../../data/siteData'
import { useCafeStatus } from '../../hooks/useCafeStatus'
import { AnimatedSection } from '../ui/AnimatedSection'

const socialIcons = {
  Instagram: Camera,
  Facebook: Users,
  X: BadgeX,
}

export function ContactSection() {
  const { service } = useCafeStatus()

  return (
    <section id="contact" className="section-padding" aria-labelledby="contact-heading">
      <div className="container-max">
        <AnimatedSection className="mb-14 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Visit + Contact
          </p>
          <h2 id="contact-heading" className="font-display text-4xl font-black text-brand-cream sm:text-5xl">
            Everything you need before you <span className="text-gradient italic">head over</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body leading-relaxed text-brand-cream/54">
            For a fast-moving DTLA restaurant, the essentials matter most: where to park, when we are open, how to call the counter, and which option gets you food fastest.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,400px)]">
          <AnimatedSection direction="right">
            <div className="panel-strong overflow-hidden rounded-[34px]">
              <div className="h-[280px] overflow-hidden border-b border-brand-gold/10 sm:h-[360px]">
                <iframe
                  title="The L.A. Cafe location"
                  src={mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'grayscale(1) contrast(1.05)',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-[minmax(0,1fr)_280px] md:items-end">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-brand-gold/72">
                    Downtown Los Angeles
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-brand-cream">
                    639 S. Spring Street
                  </h3>
                  <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-brand-cream/56">
                    A walk-in friendly counter-service room with all-day breakfast, burgers, vegan options, curbside pickup, and late-night energy that keeps moving.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="tel:+12136123000"
                      className="btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                    >
                      <Phone size={16} />
                      Call Now
                    </a>
                    <a
                      href="https://maps.google.com/?q=639+S+Spring+St+Los+Angeles+CA+90014"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                    >
                      Get Directions
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

                <div className="panel rounded-[26px] p-4">
                  <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-gold/72">
                    Current status
                  </p>
                  <p className="mt-2 font-display text-2xl text-brand-cream">
                    {service.label}
                  </p>
                  <p className="mt-2 max-w-[14rem] font-body text-sm leading-relaxed text-brand-cream/56">
                    {service.detail || service.nextWindow}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection direction="left">
              <div className="panel rounded-[30px] p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-gold/72">
                      Hours
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-brand-cream">
                      Late-night friendly
                    </h3>
                  </div>
                  <Clock3 size={20} className="text-brand-gold" />
                </div>

                <div className="space-y-3">
                  {weeklyHours.map((entry) => (
                    <div
                      key={entry.label}
                      className="flex flex-col items-start gap-1 rounded-[22px] border border-brand-gold/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span className="font-body text-sm uppercase tracking-[0.14em] text-brand-cream/52">
                        {entry.label}
                      </span>
                      <span className="font-display text-lg text-brand-cream">
                        {entry.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.05}>
              <div className="panel rounded-[30px] p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-gold/72">
                      DTLA parking tips
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-brand-cream">
                      Park smarter
                    </h3>
                  </div>
                  <Car size={20} className="text-brand-red" />
                </div>

                <div className="space-y-3">
                  {parkingTips.map((tip) => (
                    <div key={tip} className="rounded-[22px] border border-brand-gold/10 bg-white/5 px-4 py-3">
                      <p className="font-body text-sm leading-relaxed text-brand-cream/56">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.1}>
              <div className="panel rounded-[30px] p-6">
                <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-gold/72">
                  Reach the cafe
                </p>

                <div className="mt-4 space-y-3">
                  <a
                    href="tel:+12136123000"
                    className="flex items-center gap-3 rounded-[22px] border border-brand-gold/10 bg-white/5 px-4 py-3 font-body text-sm text-brand-cream/72 transition-colors hover:text-brand-cream"
                  >
                    <Phone size={16} className="text-brand-red" />
                    +1 213-612-3000
                  </a>
                  <a
                    href="mailto:hello@thelacafe.com"
                    className="flex items-center gap-3 rounded-[22px] border border-brand-gold/10 bg-white/5 px-4 py-3 font-body text-sm text-brand-cream/72 transition-colors hover:text-brand-cream"
                  >
                    <Mail size={16} className="text-brand-gold" />
                    hello@thelacafe.com
                  </a>
                  <div className="flex items-start gap-3 rounded-[22px] border border-brand-gold/10 bg-white/5 px-4 py-3 font-body text-sm text-brand-cream/62">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-brand-red" />
                    639 S. Spring St.
                    <br />
                    Los Angeles, CA 90014
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {socialLinks.map((social) => {
                    const Icon = socialIcons[social.label]

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/20 text-brand-cream/42 transition-all duration-300 hover:border-brand-gold/45 hover:bg-brand-gold/10 hover:text-brand-gold"
                      >
                        <Icon size={16} />
                      </a>
                    )
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
