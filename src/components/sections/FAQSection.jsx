import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '../../data/menuData'
import { AnimatedSection, StaggerContainer, StaggerItem } from '../ui/AnimatedSection'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section id="faq" className="section-padding border-t border-brand-gold/10 bg-brand-brown/20" aria-labelledby="faq-heading">
      <div className="container-max max-w-3xl">
        <AnimatedSection className="mb-14 text-center">
          <p className="font-body text-brand-gold uppercase tracking-[0.25em] text-sm font-semibold mb-3">
            Got Questions?
          </p>
          <h2 id="faq-heading" className="font-display text-4xl sm:text-5xl font-black text-brand-cream">
            Frequently <span className="text-gradient italic">Asked</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="space-y-3">
          {faqs.map((faq, i) => (
            <StaggerItem key={faq.question}>
              <div
                className={`panel rounded-[24px] overflow-hidden transition-all duration-300 ${
                  openIndex === i
                    ? 'border-brand-gold/30'
                    : 'hover:border-brand-gold/20'
                }`}
              >
                <button
                  id={`faq-trigger-${i}`}
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-semibold text-brand-cream">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === i
                        ? 'bg-brand-gold text-brand-dark'
                        : 'bg-brand-brown/70 text-brand-cream/45'
                    }`}
                  >
                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <p className="font-body text-brand-cream/62 leading-relaxed px-6 pb-5 text-[15px]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
