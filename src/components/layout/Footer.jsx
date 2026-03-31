import { ArrowUpRight, Camera, Mail, MapPin, Phone, Users } from 'lucide-react'
import { navLinks, socialLinks } from '../../data/siteData'
import { smoothScrollTo } from '../../utils/helpers'

const socialIcons = {
  Instagram: Camera,
  Facebook: Users,
}

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-black text-white">
      <div className="border-b border-white/12">
        <div className="container-max flex flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-white/70">
            <a
              href="https://maps.google.com/?q=639+S+Spring+St+Los+Angeles+CA+90014"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <MapPin size={12} />
              639 S. Spring St., Los Angeles, CA 90014
            </a>
            <a href="tel:+12136123000" className="inline-flex items-center gap-2 hover:text-white">
              <Phone size={12} />
              (213) 612-3000
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+12136123000"
              className="inline-flex min-h-11 w-full items-center justify-center border border-white px-4 py-2 font-body text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-black sm:w-auto"
            >
              Call Now
            </a>
            <a
              href="https://maps.google.com/?q=639+S+Spring+St+Los+Angeles+CA+90014"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center border border-white px-4 py-2 font-body text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-black sm:w-auto"
            >
              Get Directions
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="container-max px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
          <div>
            <img
              src="/images/brand/la-cafe-logo.png"
              alt="The L.A. Cafe"
              width="332"
              height="183"
              loading="lazy"
              decoding="async"
              className="logo-tilt w-[170px]"
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
                Explore
              </h4>
              <ul className="mt-4 space-y-3">
                {navLinks.map(({ label, href }) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => smoothScrollTo(href)}
                      className="font-body text-sm uppercase tracking-[0.14em] text-white/68 transition-colors hover:text-white"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
                Quick Notes
              </h4>
              <ul className="mt-4 space-y-3 font-body text-sm leading-relaxed text-white/68">
                <li>All-day breakfast</li>
                <li>Walk-in only, no reservations</li>
                <li>Vegan-friendly menu options</li>
                <li>Pickup is the fastest move during peak traffic</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
              Follow + Contact
            </h4>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label]

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center border border-white/22 text-white/72 transition-colors hover:bg-white hover:text-black"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>

            <div className="mt-5 space-y-3 font-body text-sm text-white/68">
              <a href="tel:+12136123000" className="block transition-colors hover:text-white">
                (213) 612-3000
              </a>
              <a
                href="mailto:hello@thelacafe.com"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail size={14} />
                hello@thelacafe.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/12 pt-5 font-body text-[11px] uppercase tracking-[0.18em] text-white/42">
          © {new Date().getFullYear()} The L.A. Cafe
        </div>
      </div>
    </footer>
  )
}
