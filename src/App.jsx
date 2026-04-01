import { useEffect } from 'react'
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
      {/*
        Light theme site — bg is #ECE7DE (brand-dark), text is #111111 (brand-cream)
        Ambient blobs use very subtle warm tints that work on light background
      */}
      <div className="relative min-h-screen" style={{ background: '#ECE7DE', color: '#111111' }}>

        {/* Ambient texture blobs — light theme appropriate */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          {/* Warm amber glow top-left */}
          <div
            className="absolute left-[-10rem] top-[-6rem] h-[28rem] w-[28rem] rounded-full blur-3xl"
            style={{ background: 'rgba(167,85,47,0.06)' }}
          />
          {/* Gold glow top-right */}
          <div
            className="absolute right-[-8rem] top-[12rem] h-[24rem] w-[24rem] rounded-full blur-3xl"
            style={{ background: 'rgba(146,146,146,0.08)' }}
          />
          {/* Amber glow bottom-center */}
          <div
            className="absolute bottom-[-8rem] left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: 'rgba(167,85,47,0.05)' }}
          />
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
          <Chatbot />
        </div>
      </div>
    </OrderPlanProvider>
  )
}
