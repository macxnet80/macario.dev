'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ProjectWizard from './ProjectWizard'
import { HighlightText } from './ui/shadcn-io/highlight-text'

export default function Hero() {
  const [showWizard, setShowWizard] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const [glowAnimation, setGlowAnimation] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Intersection Observer für Floating CTA
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // CTA erscheint wenn Hero aus dem Viewport ist
        setShowFloatingCTA(!entry.isIntersecting)
      },
      {
        threshold: 0.1, // 10% des Hero-Bereichs muss sichtbar sein
        rootMargin: '-50px 0px 0px 0px' // 50px Puffer nach oben
      }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  // Herzschlag Animation alle 15 Sekunden
  useEffect(() => {
    if (!showFloatingCTA) return

    const interval = setInterval(() => {
      setGlowAnimation(true)
      // Animation nach 1.2 Sekunden beenden (Herzschlag-Duration)
      setTimeout(() => setGlowAnimation(false), 1200)
    }, 15000) // Alle 15 Sekunden

    return () => clearInterval(interval)
  }, [showFloatingCTA])

  return (
    <section ref={heroRef} className="w-full relative bg-black flex flex-col" style={{ height: '100vh' }}>
      {/* Ocean Abyss Background with Top Glow */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Header */}
      <div className="relative z-10 pt-4 sm:pt-8 pb-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            {/* Name */}
            <div className="text-xl sm:text-2xl font-bold text-[#f6f6f6]">Lars Macario</div>
            
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span className="bg-green-400/10 text-green-400 border border-green-400/20 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Verfügbar für neue Projekte
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content - Drei Container: Avatar, Headline, CTA */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-center min-h-0">
          
          {/* Container 1: Avatar */}
          <div style={{ marginBottom: '48px' }}>
            <div className="flex flex-wrap items-start justify-start gap-3 w-full max-w-[60%]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                <Image
                  src="/lars_macario_no_code_dev.jpg"
                  alt="Lars - No/Low-Code Developer"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              
              <div className="text-white leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg text-left w-full sm:max-w-md min-w-0 flex-1">
                Als Product Owner und No-Code Entwickler helfe ich KMU dabei, ihre Ideen schnell und unkompliziert umzusetzen. Web-Apps, Automatisierungen und KI-Lösungen – ohne Tech-Kopfschmerzen.
              </div>
            </div>
          </div>

          {/* Container 2: Headline */}
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#f6f6f6] leading-tight sm:leading-[72px] text-left">
              <div className="mb-0">Deine Idee.</div>
              <div className="mb-0">Deine Website.</div>
              <div>
                <HighlightText 
                  text="In 2 Wochen live." 
                  className="text-[#000000] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold px-2 py-0"
                />
              </div>
            </h1>
          </div>

          {/* Container 3: CTA */}
          <div>
            <div className="w-full h-px bg-secondary/30 mb-3 sm:mb-4"></div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
              <button
                onClick={() => setShowWizard(true)}
                className="bg-[#d1d1d1] text-black hover:bg-[#d1d1d1]/90 transition-all duration-300 rounded-full px-4 sm:px-6 py-2 sm:py-3 font-semibold shadow-lg hover:scale-105 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base min-h-[40px] sm:min-h-[auto]"
              >
                <span className="text-center">Kostenloses Strategie-Gespräch buchen</span>
                <span>📅</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      
      {/* Floating CTA Button */}
      {showFloatingCTA && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="hidden md:block fixed bottom-6 left-1/2 transform -translate-x-1/2 md:left-auto md:right-6 md:transform-none z-40"
        >
          <div className="relative">
            {/* Herzschlag Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/40 via-pink-500/40 to-red-600/40 opacity-0 blur-md"
              animate={{
                opacity: glowAnimation ? [0, 0.6, 0.2, 0.8, 0] : 0,
                scale: glowAnimation ? [1, 1.15, 1.05, 1.2, 1] : 1,
              }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1], // Herzschlag-ähnliche Kurve
                times: [0, 0.3, 0.5, 0.7, 1]
              }}
            />
            
            {/* Herzschlag Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400/30"
              animate={{
                scale: glowAnimation ? [1, 1.1, 1.02, 1.15, 1] : 1,
                opacity: glowAnimation ? [0.3, 0.7, 0.4, 0.8, 0.3] : 0.3,
              }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                times: [0, 0.3, 0.5, 0.7, 1]
              }}
            />
            
            <button
              onClick={() => setShowWizard(true)}
              className="relative z-10 bg-[#d1d1d1] text-black hover:bg-[#d1d1d1]/90 transition-all duration-300 rounded-full px-6 py-3 font-semibold shadow-lg hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Projekt besprechen</span>
              <span>→</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Project Wizard Modal */}
      {showWizard && (
        <ProjectWizard onClose={() => setShowWizard(false)} />
      )}


    </section>
  )
} 