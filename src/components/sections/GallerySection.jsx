import { motion } from 'framer-motion'
import { galleryImages } from '../../data/menuData'
import { AnimatedSection } from '../ui/AnimatedSection'
import { PremiumImage } from '../ui/PremiumImage'

const galleryLayout = [
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-2 lg:row-span-1',
]
const galleryThemes = ['interior','brunch','coffee','drinks','interior','drinks','burger','coffee']

export function GallerySection() {
  return (
    <section id="gallery" className="section-padding relative overflow-x-clip border-t border-black/8"
             style={{ background: 'rgba(245,241,235,0.5)' }}>
      {/* Subtle blobs */}
      <div className="pointer-events-none absolute right-[-6rem] top-8 h-60 w-60 rounded-full blur-3xl"
           style={{ background: 'rgba(167,85,47,0.06)', position: 'absolute' }} />

      <div className="container-max relative">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-brand-amber">
            Gallery
          </p>
          <h2 className="mb-4 font-display text-4xl font-black text-brand-cream sm:text-5xl">
            The{' '}
            <span className="text-gradient italic">Experience</span>
          </h2>
          <p className="mx-auto max-w-md font-body text-brand-cream/52">
            4.3 stars · 2,281+ Google reviews · DTLA's favorite all-day spot
          </p>
        </AnimatedSection>

        <div className="grid auto-rows-[160px] gap-3 sm:grid-cols-2 sm:auto-rows-[200px] lg:grid-cols-4 lg:auto-rows-[180px]">

          {/* Editorial card — first slot */}
          <AnimatedSection
            direction="right"
            className="panel-strong rounded-[28px] p-6 lg:col-span-2 lg:row-span-2"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.22em] text-brand-amber">
                  Inside The Experience
                </p>
                <h3 className="font-display text-3xl font-bold leading-tight text-brand-cream lg:text-4xl">
                  Plates, light, and late-night mood built for downtown.
                </h3>
                <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-brand-cream/55">
                  Warm room, sharp plating, and a vibe that feels as good at 8AM as it
                  does at 1AM. Sidewalk seating when the weather calls for it.
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { value: '4.3★', label: 'Google Rating' },
                  { value: '2AM',  label: 'Open Late' },
                  { value: '2,281', label: 'Reviews' },
                ].map(stat => (
                  <div key={stat.label} className="panel rounded-xl px-4 py-4">
                    <div className="font-accent text-2xl text-brand-amber leading-none">{stat.value}</div>
                    <div className="mt-1.5 font-body text-[10px] uppercase tracking-[0.16em] text-brand-cream/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Photo tiles */}
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative cursor-pointer overflow-hidden rounded-[24px] border border-black/10 ${galleryLayout[i] ?? ''}`}
            >
              <PremiumImage
                src={img.src} alt={img.alt}
                theme={galleryThemes[i]}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 group-hover:scale-110"
                fallbackLabel={i % 2 === 0 ? 'Signature Scene' : 'House Detail'}
                fallbackTitle={img.alt}
                sizes="(min-width:1024px) 25vw,(min-width:768px) 50vw,100vw"
              />
              {/* Hover overlay — subtle for light theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
