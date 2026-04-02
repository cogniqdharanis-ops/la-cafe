import { ArrowUpRight, Mail, MapPin, Phone, Clock3, Car, Users } from 'lucide-react'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import { mapEmbedSrc, parkingTips, weeklyHours } from '../../data/siteData'
import { useCafeStatus } from '../../hooks/useCafeStatus'
import { AnimatedSection } from '../ui/AnimatedSection'

export function ContactSection() {
  const { service } = useCafeStatus()

  return (
    <section id="contact" className="section-padding" aria-labelledby="contact-heading">
      <div className="container-max">

        {/* ── Heading ── */}
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-brand-amber">
            Visit + Contact
          </p>
          <h2
            id="contact-heading"
            className="font-display text-4xl font-black text-brand-cream sm:text-5xl"
          >
            Everything you need before you{' '}
            <span className="text-gradient italic">head over</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-brand-cream/54">
            Where to park, when we're open, how to order fastest, and how to reach
            us — all right here.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">

          {/* LEFT */}
          <AnimatedSection direction="right">
            <div className="panel-strong flex flex-col overflow-hidden rounded-[34px]">
              <div className="h-[240px] shrink-0 overflow-hidden border-b border-black/8 sm:h-[320px]">
                <iframe
                  title="The L.A. Cafe location"
                  src={mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) contrast(1.05)' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-start lg:gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl text-brand-cream">639 S. Spring Street</h3>

                  <div className="mt-5 flex gap-3">
                    <a href="tel:+12136123000" className="btn-primary">
                      <Phone size={15} /> Call Now
                    </a>
                    <a href="#" className="btn-outline">
                      Get Directions <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>

                <div className="panel p-5">
                  <p className="text-brand-cream">{service.label}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">

            {/* CONTACT */}
            <AnimatedSection direction="left">
              <div className="panel p-5">

                <div className="space-y-2">
                  <a href="tel:+12136123000" className="flex gap-3">
                    <Phone size={14} />
                    +1 213-612-3000
                  </a>

                  <a href="mailto:hello@thelacafe.com" className="flex gap-3">
                    <Mail size={14} />
                    hello@thelacafe.com
                  </a>

                  <div className="flex gap-3">
                    <MapPin size={14} />
                    639 S. Spring St.
                  </div>
                </div>

                {/* ✅ FIXED SOCIAL ICONS */}
                <div className="mt-4 flex gap-3">
                  <a href="https://www.instagram.com/thelacafe">
                    <FaInstagram size={16} />
                  </a>

                  <a href="https://www.facebook.com/TheLACafe">
                    <FaFacebook size={16} />
                  </a>
                </div>

              </div>
            </AnimatedSection>

          </div>
        </div>
      </div>
    </section>
  )
}