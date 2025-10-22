'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ProjectWizard from './ProjectWizard'
import HighlightText from './ui/shadcn-io/highlight-text'
import { MagneticButton } from './ui/MagneticButton'

export default function Hero() {
  const [showWizard, setShowWizard] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  
  const scrollToSkills = () => {
    const skillsSection = document.querySelector('#skills-section')
    skillsSection?.scrollIntoView({ behavior: 'smooth' })
  }

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

  return (
    <section ref={heroRef} className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

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
        {/* Avatar and Description - Top Left */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8 sm:mb-16 absolute top-16 sm:top-20 left-4 sm:left-6 right-4 sm:right-auto">
          {/* Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
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
          <div className="text-white leading-relaxed max-w-md text-sm sm:text-base text-center sm:text-left">
          Mit No/Low-Code und intelligenter KI-Integration entwickle ich für dich ein skalierbares MVP oder eine moderne Web-Lösung – schnell, transparent und mit spürbarem Mehrwert für dein Unternehmen.
          </div>
        </div>

        {/* Main Content - Bottom of Viewport */}
        <div className="w-full">
          {/* Main Headline - Center */}
          <div className="text-center lg:text-left mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-[#f6f6f6] leading-tight">
              <div className="mb-2 sm:mb-4">Deine Idee.</div>
              <div className="mb-2 sm:mb-4">Dein digitales Produkt.</div>
              <HighlightText 
                text="In 2 Wochen live." 
                className="text-green-400 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold"
              />
            </h1>
          </div>

          {/* Horizontal Line */}
          <div className="w-full h-px bg-secondary/30 mb-4"></div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <MagneticButton
              onClick={() => window.open('https://zeeg.me/larsmacario/30min', '_blank')}
              particleCount={6}
              attractRadius={35}
              className="bg-[#d1d1d1] text-black hover:bg-[#d1d1d1]/90"
            >
              <span>Kostenloses Erstgespräch buchen</span>
              <span>📅</span>
            </MagneticButton>
            
            <button
              onClick={() => {
                const skillsSection = document.querySelector('#skills-section')
                skillsSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-full px-6 py-3 font-semibold shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <span>Lösungen entdecken</span>
              <span>↓</span>
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
          className="fixed bottom-6 right-6 z-40"
        >
          <MagneticButton
            onClick={() => setShowWizard(true)}
            particleCount={8}
            attractRadius={40}
          >
            <span>Projekt starten</span>
            <span>→</span>
          </MagneticButton>
        </motion.div>
      )}

      {/* Project Wizard Modal */}
      {showWizard && (
        <ProjectWizard onClose={() => setShowWizard(false)} />
      )}

    </section>
  )
} 