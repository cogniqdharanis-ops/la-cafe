import { Suspense, useEffect } from 'react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { FAQSection } from './components/sections/FAQSection'
import { FeaturesSection } from './components/sections/FeaturesSection'
import { GallerySection } from './components/sections/GallerySection'
import { HeroSection } from './components/sections/HeroSection'
import { MenuSection } from './components/sections/MenuSection'
import { OrderingSection } from './components/sections/OrderingSection'
import { ServiceHubSection } from './components/sections/ServiceHubSection'
import { VeganSection } from './components/sections/VeganSection'
import { OrderPlanProvider } from './context/OrderPlanContext'
import { smoothScrollTo } from './utils/helpers'
import Chatbot from './components/Chatbot'

const PAGE_TITLE = 'The L.A. Cafe | Downtown Los Angeles'

export default function App() {
  useEffect(() => {
    document.title = PAGE_TITLE

    if (!window.location.hash) return undefined

    const timeoutId = window.setTimeout(() => {
      smoothScrollTo(window.location.hash)
    }, 120)

    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <OrderPlanProvider>
      <div className="relative min-h-screen bg-brand-dark text-brand-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-[-14rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full bg-brand-amber/12 blur-3xl" />
          <div className="absolute right-[-12rem] top-[18rem] h-[30rem] w-[30rem] rounded-full bg-brand-gold/10 blur-3xl" />
          <div className="absolute bottom-[-10rem] left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-brand-red/8 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/22 to-transparent" />
        </div>

        <div className="relative isolate">
          <Navbar />

          <main id="main-content">
            <HeroSection />
            <ServiceHubSection />
            <MenuSection />
            <VeganSection />
            <OrderingSection />
            <FeaturesSection />
            <GallerySection />
            <AboutSection />
            <FAQSection />
            <ContactSection />
          </main>

          <Footer />

          <Suspense fallback={null}>
            <Chatbot />
          </Suspense>
        </div>
      </div>
    </OrderPlanProvider>
  )
}
