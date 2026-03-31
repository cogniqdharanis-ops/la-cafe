// eslint-disable-next-line no-unused-vars
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

const galleryThemes = ['interior', 'brunch', 'coffee', 'drinks', 'interior', 'drinks', 'burger', 'coffee']

export function GallerySection() {
  return (
    <section id="gallery" className="section-padding relative overflow-x-clip bg-brand-brown/10">
      <div className="pointer-events-none absolute right-[-8rem] top-8 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 rounded-full bg-brand-gold/8 blur-3xl" />

      <div className="container-max relative">
        <AnimatedSection className="mb-14 text-center">
          <p className="font-body text-brand-gold uppercase tracking-[0.25em] text-sm font-semibold mb-3">
            Gallery
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-brand-cream mb-4">
            The <span className="text-gradient italic">Experience</span>
          </h2>
          <p className="font-body text-brand-cream/50 max-w-md mx-auto">
            A feast for the eyes before the feast on your plate.
          </p>
        </AnimatedSection>

        <div className="grid auto-rows-[180px] gap-4 md:grid-cols-2 md:auto-rows-[210px] lg:grid-cols-4">
          <AnimatedSection
            direction="right"
            className="panel-strong rounded-[32px] p-7 lg:col-span-2 lg:row-span-2"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.22em] text-brand-gold/70 font-bold mb-3">
                  Inside The Experience
                </p>
                <h3 className="font-display text-4xl font-bold text-brand-cream leading-tight">
                  Plates, light, and late-night mood built for downtown.
                </h3>
                <p className="mt-4 max-w-md font-body text-brand-cream/56 leading-relaxed">
                  The room is warm, the plating is sharp, and even the quick
                  moments feel considered. This grid now behaves more like an
                  editorial layout than a loose photo dump.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 mt-8">
                {[
                  { value: '4.8★', label: 'Guest Rating' },
                  { value: '2AM', label: 'Open Late' },
                  { value: 'DTLA', label: 'Corner Spot' },
                ].map((stat) => (
                  <div key={stat.label} className="panel rounded-2xl px-4 py-5">
                    <div className="font-accent text-3xl text-brand-gold leading-none">
                      {stat.value}
                    </div>
                    <div className="mt-2 font-body text-[10px] uppercase tracking-[0.18em] text-brand-cream/38">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative cursor-pointer overflow-hidden rounded-[28px] border border-brand-gold/10 ${galleryLayout[i]}`}
            >
              <PremiumImage
                src={img.src}
                alt={img.alt}
                theme={galleryThemes[i]}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 group-hover:scale-110"
                fallbackLabel={img.size === 'large' ? 'Signature Scene' : 'House Detail'}
                fallbackTitle={img.alt}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/14 to-transparent opacity-90 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="translate-y-2 opacity-90 transition-all duration-300 group-hover:translate-y-0">
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold/78">
                    {img.size === 'large' ? 'Signature Scene' : 'House Detail'}
                  </span>
                  <div className="mt-1 font-display text-xl font-semibold text-brand-cream">
                    {img.alt}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
