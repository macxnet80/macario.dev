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
    <section ref={heroRef} className="min-h-screen w-full relative bg-black">
      {/* Ocean Abyss Background with Top Glow */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Header */}
      <div className="relative z-10 pt-4 sm:pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 min-h-screen flex flex-col justify-center pb-20">
        {/* Mobile Layout - Avatar and Description above headline */}
        <div className="block sm:hidden mb-8">
          <div className="flex items-center gap-4 mb-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
              <Image
                src="/lars_macario_no_code_dev.jpg"
                alt="Lars - No/Low-Code Developer"
                width={80}
                height={80}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            
            {/* Description */}
            <div className="text-white leading-relaxed text-sm">
            Mit No/Low-Code und intelligenter KI-Integration entwickle ich für dich ein skalierbares MVP, eine moderne Website oder eine Web-Anwendung – schnell, transparent und mit spürbarem Mehrwert für dein Unternehmen.
            </div>
          </div>
        </div>

        {/* Desktop Layout - Avatar and Description - Top Left */}
        <div className="hidden sm:flex items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8 md:mb-12 lg:mb-16 absolute top-12 sm:top-16 md:top-20 lg:top-24 left-4 sm:left-5 md:left-6 lg:left-8">
          {/* Avatar */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
            <Image
              src="/lars_macario_no_code_dev.jpg"
              alt="Lars - No/Low-Code Developer"
              width={80}
              height={80}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          
          {/* Description */}
          <div className="text-white leading-relaxed max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md text-xs sm:text-sm md:text-base text-left">
          Mit No/Low-Code und intelligenter KI-Integration entwickle ich für dich ein skalierbares MVP, eine moderne Website oder eine Web-Anwendung – schnell, transparent und mit spürbarem Mehrwert für dein Unternehmen.
          </div>
        </div>

        {/* Main Content - Bottom of Viewport */}
        <div className="w-full">
          {/* Main Headline - Center */}
          <div className="text-center lg:text-left mb-6 sm:mb-8">
            <h1 className="font-bold text-[#f6f6f6] leading-tight" style={{
              fontSize: 'clamp(2.5rem, 4vw + 0.5rem, 6.5rem)'
            }}>
              <div className="mb-2 sm:mb-3 md:mb-4">Deine Idee.</div>
              <div className="mb-2 sm:mb-3 md:mb-4">Deine Website.</div>
              <HighlightText 
                text="In 2 Wochen live." 
                className="text-[#000000] font-bold"
                style={{
                  fontSize: 'clamp(2.5rem, 4vw + 0.5rem, 6.5rem)'
                }}
              />
            </h1>
          </div>

          {/* Horizontal Line */}
          <div className="w-full h-px bg-secondary/30 mb-4"></div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 w-full items-center">
            <button
              onClick={() => setShowWizard(true)}
              className="bg-[#d1d1d1] text-black hover:bg-[#d1d1d1]/90 transition-all duration-300 rounded-full px-3 sm:px-6 py-2 sm:py-3 font-semibold shadow-lg hover:scale-105 flex items-center justify-center gap-2 w-4/5 sm:w-auto text-xs sm:text-base min-h-[40px] sm:min-h-[auto]"
            >
              <span className="text-center">Kostenloses Strategie-Gespräch buchen</span>
              <span>📅</span>
            </button>
            
          </div>
        </div>
      </div>

      
      {/* Floating CTA Button */}
      {showFloatingCTA && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 md:left-auto md:right-6 md:transform-none z-40"
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