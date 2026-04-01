import { ArrowUpRight, Mail, MapPin, Phone, Users } from 'lucide-react'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import { mapEmbedSrc, parkingTips, weeklyHours } from '../../data/siteData'
import { useCafeStatus } from '../../hooks/useCafeStatus'
import { AnimatedSection } from '../ui/AnimatedSection'
import { Clock3, Car } from 'lucide-react'

export function ContactSection() {
  const { service } = useCafeStatus()

  return (
    <section id="contact" className="section-padding" aria-labelledby="contact-heading">
      <div className="container-max">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-brand-amber">
            Visit + Contact
          </p>
          <h2 id="contact-heading"
              className="font-display text-4xl font-black text-brand-cream sm:text-5xl">
            Everything you need before you{' '}
            <span className="text-gradient italic">head over</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body leading-relaxed text-brand-cream/54">
            Where to park, when we're open, how to order fastest, and how to reach us —
            all right here.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,400px)]">

          {/* Map + address */}
          <AnimatedSection direction="right">
            <div className="panel-strong overflow-hidden rounded-[34px]">
              <div className="h-[260px] overflow-hidden border-b border-black/10 sm:h-[340px]">
                <iframe
                  title="The L.A. Cafe location"
                  src={mapEmbedSrc}
                  width="100%" height="100%"
                  style={{ border: 0, filter: 'grayscale(1) contrast(1.05)' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-[minmax(0,1fr)_260px] md:items-end">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-brand-amber">
                    Downtown Los Angeles
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-brand-cream">
                    639 S. Spring Street
                  </h3>
                  <p className="mt-1 font-body text-sm text-brand-cream/50">
                    Inside Spring Towers Lofts · DTLA
                  </p>
                  <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-brand-cream/55">
                    All-day breakfast, burgers, vegan options, curbside pickup, and
                    sidewalk seating. Walk-in only counter-service.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a href="tel:+12136123000"
                       className="btn-primary sm:w-auto">
                      <Phone size={15} /> Call Now
                    </a>
                    <a
                      href="https://maps.google.com/?q=639+S+Spring+St+Los+Angeles+CA+90014"
                      target="_blank" rel="noreferrer"
                      className="btn-outline sm:w-auto"
                    >
                      Get Directions <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>

                <div className="panel rounded-[26px] p-4">
                  <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-amber">
                    Current status
                  </p>
                  <p className="mt-2 font-display text-2xl text-brand-cream">
                    {service.label}
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-brand-cream/55">
                    {service.detail || service.nextWindow}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right column */}
          <div className="space-y-5">

            {/* Hours */}
            <AnimatedSection direction="left">
              <div className="panel rounded-[28px] p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-amber">
                      Hours
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-brand-cream sm:text-3xl">
                      Late-night friendly
                    </h3>
                  </div>
                  <Clock3 size={18} className="text-brand-amber mt-1" />
                </div>
                <div className="space-y-2">
                  {weeklyHours.map(entry => (
                    <div key={entry.label}
                         className="flex items-center justify-between gap-4 rounded-[18px] border border-black/8 bg-white/45 px-4 py-3">
                      <span className="font-body text-sm uppercase tracking-[0.12em] text-brand-cream/52">
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

            {/* Parking */}
            <AnimatedSection direction="left" delay={0.04}>
              <div className="panel rounded-[28px] p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-amber">
                      DTLA parking tips
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-brand-cream sm:text-3xl">
                      Park smarter
                    </h3>
                  </div>
                  <Car size={18} className="text-brand-cream mt-1" />
                </div>
                <div className="space-y-2">
                  {parkingTips.map(tip => (
                    <div key={tip} className="rounded-[18px] border border-black/8 bg-white/45 px-4 py-3">
                      <p className="font-body text-sm leading-relaxed text-brand-cream/55">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Contact + Socials */}
            <AnimatedSection direction="left" delay={0.08}>
              <div className="panel rounded-[28px] p-6">
                <p className="font-body text-[10px] uppercase tracking-[0.18em] text-brand-amber">
                  Reach us
                </p>

                <div className="mt-4 space-y-2">
                  <a href="tel:+12136123000"
                     className="flex items-center gap-3 rounded-[18px] border border-black/8 bg-white/45 px-4 py-3 text-sm text-brand-cream/65 hover:text-brand-cream">
                    <Phone size={15} className="text-brand-amber" />
                    +1 213-612-3000
                  </a>

                  <a href="mailto:hello@thelacafe.com"
                     className="flex items-center gap-3 rounded-[18px] border border-black/8 bg-white/45 px-4 py-3 text-sm text-brand-cream/65 hover:text-brand-cream">
                    <Mail size={15} className="text-brand-amber" />
                    hello@thelacafe.com
                  </a>

                  <div className="flex items-start gap-3 rounded-[18px] border border-black/8 bg-white/45 px-4 py-3 text-sm text-brand-cream/55">
                    <MapPin size={15} className="text-brand-amber" />
                    <span>639 S. Spring St., Los Angeles CA 90014<br />
                    Inside Spring Towers Lofts</span>
                  </div>
                </div>

                {/* Social links */}
                <div className="mt-4 flex items-center gap-3">
                  <FaInstagram size={16} />
                  <FaFacebook size={16} />
                </div>

              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}