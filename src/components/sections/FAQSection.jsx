import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '../ui/AnimatedSection'

const faqs = [
  {
    question: 'Do you have vegan or plant-based options?',
    answer: 'Yes! We have a dedicated vegan menu including the Plant Based Patty Melt, vegan breakfast plates, salads, and more. Every vegan item is clearly marked on the menu and prepared to avoid cross-contamination. Ask our staff for the full plant-based rundown.',
  },
  {
    question: 'What are your opening hours?',
    answer: 'We\'re open Mon–Thu 8AM–12AM (midnight) and Fri–Sat 8AM–2AM. Sunday hours are 8AM–12AM. Kitchen closes 30 minutes before closing time. Perfect for early breakfast or late-night cravings!',
  },
  {
    question: 'How long are wait times during peak hours?',
    answer: 'Peak hours (Sat–Sun brunch 10AM–2PM and weekday evenings 6–9PM) typically run 18–25 minutes for dine-in. Morning visits before 10AM are usually 5–10 minutes. Order curbside pickup online to skip the wait — usually ready in 12–18 minutes!',
  },
  {
    question: 'Do you take reservations?',
    answer: 'We\'re a walk-in only counter-service restaurant — no reservations needed. Just come in! For large groups of 8 or more, call ahead at (213) 612-3000 and we\'ll do our best to accommodate you.',
  },
  {
    question: 'Is parking available nearby?',
    answer: 'Yes! Several options close by: the 6th Street Garage is a 2-minute walk, there\'s metered street parking on Spring St and 6th St, and private lots on 5th/6th. We validate parking for orders over $20. DTLA Metro (Pershing Square station) is also a short walk away.',
  },
  {
    question: 'Do you serve breakfast all day?',
    answer: 'Absolutely — all-day breakfast is our thing! Waffles, eggs, chicken & waffles, breakfast burritos, bagels, French toast, and more. Available from open (8AM) to close every single day.',
  },
  {
    question: 'Do you have sidewalk or outdoor seating?',
    answer: 'Yes, we have sidewalk seating on Spring St when weather permits. We also have indoor dine-in seating. It\'s first come, first seated — no need to call ahead for a table.',
  },
  {
    question: 'Can I order online for pickup or delivery?',
    answer: 'Yes! Order via our website for curbside pickup (ready in 12–18 min) or through DoorDash, Uber Eats, and Grubhub for delivery across DTLA. Tap "Online Ordering" at the top of this page to start.',
  },
  {
    question: 'Do you have gluten-free or allergy-friendly options?',
    answer: 'We do our best to accommodate dietary needs. Many items can be modified for gluten-free, dairy-free, or nut-free requests. Just let our counter staff know your requirements when ordering and we\'ll guide you to the right options.',
  },
  {
    question: 'Where exactly are you located?',
    answer: 'We\'re at 639 S. Spring St., Los Angeles CA 90014 — inside Spring Towers Lofts in Downtown LA, near the Fashion District and Historic Core. Closest Metro stop is Pershing Square on the B/D Lines.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = i => setOpenIndex(current => current === i ? null : i)

  return (
    <section id="faq" className="section-padding border-t border-black/8"
             style={{ background: 'rgba(255,255,255,0.28)' }}
             aria-labelledby="faq-heading">
      <div className="container-max max-w-3xl">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-brand-amber">
            Got Questions?
          </p>
          <h2 id="faq-heading" className="font-display text-4xl font-black text-brand-cream sm:text-5xl">
            Frequently <span className="text-gradient italic">Asked</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-brand-cream/55">
            Everything you need to know before your visit — hours, parking, menu, seating, and more.
          </p>
        </AnimatedSection>

        <StaggerContainer className="space-y-2.5">
          {faqs.map((faq, i) => (
            <StaggerItem key={faq.question}>
              <div
                className="panel overflow-hidden rounded-[22px] transition-all duration-300"
                style={{
                  borderColor: openIndex === i ? 'rgba(167,85,47,0.25)' : 'rgba(0,0,0,0.08)',
                  background: openIndex === i ? 'rgba(255,255,255,0.75)' : undefined,
                }}
              >
                <button
                  id={`faq-trigger-${i}`}
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="font-display text-[17px] font-semibold text-brand-cream sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      background: openIndex === i ? '#a7552f' : 'rgba(0,0,0,0.07)',
                      color: openIndex === i ? '#fff' : 'rgba(17,17,17,0.45)',
                    }}
                  >
                    {openIndex === i ? <Minus size={15} /> : <Plus size={15} />}
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
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-5 pb-5 font-body text-[15px] leading-relaxed text-brand-cream/65 sm:px-6">
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
