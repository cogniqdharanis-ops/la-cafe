import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { navLinks } from '../../data/siteData'
import { smoothScrollTo } from '../../utils/helpers'

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-black text-white">
      {/* Top CTA bar */}
      <div className="border-b border-white/10">
        <div className="container-max flex flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-white/65">
            <a
              href="https://maps.google.com/?q=639+S+Spring+St+Los+Angeles+CA+90014"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <MapPin size={12} />639 S. Spring St., Los Angeles, CA 90014
            </a>
            <a href="tel:+12136123000"
               className="inline-flex items-center gap-2 hover:text-white">
              <Phone size={12} />(213) 612-3000
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="tel:+12136123000"
               className="inline-flex min-h-[44px] w-full items-center justify-center border border-white px-4 py-2 text-[11px] font-bold uppercase hover:bg-white hover:text-black sm:w-auto">
              Call Now
            </a>
            <a
              href="https://maps.google.com/?q=639+S+Spring+St+Los+Angeles+CA+90014"
              target="_blank" rel="noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center border border-white px-4 py-2 text-[11px] font-bold uppercase hover:bg-white hover:text-black sm:w-auto"
            >
              Get Directions <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer body */}
      <div className="container-max px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)_280px]">

          {/* Brand */}
          <div>
            <img
              src="/images/brand/la-cafe-logo.png"
              alt="The L.A. Cafe"
              className="w-[160px]"
            />
            <p className="mt-5 text-sm text-white/55">
              All-day breakfast. Scratch-made. Generous portions.
            </p>
          </div>

          {/* Nav */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-[11px] uppercase text-white/50">Explore</h4>
              <ul className="mt-4 space-y-3">
                {navLinks.map(({ label, href }) => (
                  <li key={label}>
                    <button
                      onClick={() => smoothScrollTo(href)}
                      className="text-sm uppercase text-white/62 hover:text-white"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-[11px] uppercase text-white/50">
              Follow + Contact
            </h4>

            {/* ✅ UPDATED ICONS */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/thelacafe"
                target="_blank" rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/65 hover:bg-white hover:text-black"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="https://www.facebook.com/TheLACafe"
                target="_blank" rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/65 hover:bg-white hover:text-black"
              >
                <FaFacebook size={16} />
              </a>
            </div>

            <div className="mt-5 space-y-3 text-sm text-white/62">
              <a href="tel:+12136123000">(213) 612-3000</a>
              <a href="mailto:hello@thelacafe.com"
                 className="flex items-center gap-2">
                <Mail size={14} />hello@thelacafe.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 flex justify-between text-xs text-white/35">
          <div>© {new Date().getFullYear()} The L.A. Cafe</div>
          <div>Open Till 2AM</div>
        </div>
      </div>
    </footer>
  )
}