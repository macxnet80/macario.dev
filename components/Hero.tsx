'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import ProjectWizard from './ProjectWizard'

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
    <section ref={heroRef} className="min-h-screen bg-background flex items-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Verfügbar für neue Projekte
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            <div className="mb-2 whitespace-nowrap">Deine Idee.</div>
            <div className="mb-2 whitespace-nowrap">Dein digitales Produkt.</div>
            <div className="text-primary whitespace-nowrap">In 2 Wochen live.</div>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mb-8"
          >
            Mit No/Low-Code und gezielter KI-Integration baue ich dir ein skalierbares MVP oder moderne Web-Lösung – blitzschnell, transparent und mit echten Business-Outcomes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowWizard(true)}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full text-base font-medium transition-all glow"
            >
              <Sparkles className="w-4 h-4" />
              Kostenloses Erstgespräch buchen
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToSkills}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-base font-medium transition-all border border-white/30"
            >
              <ArrowDown className="w-4 h-4" />
              Lösungen entdecken
            </motion.button>
          </motion.div>
        </div>

        {/* Right Content - Avatar & Features */}
        <div className="relative">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto relative">
              {/* Avatar Image */}
              <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/lars_macario_no_code_dev.jpg"
                  alt="Lars - No/Low-Code Developer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Code symbol decoration */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">&lt;/&gt;</span>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 grid grid-cols-2 gap-4 w-80 -ml-8"
          >
            <div className="glass rounded-2xl p-4 border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-300">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mb-3 border border-green-500/30">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Schnell</h3>
              <p className="text-sm text-gray-300">Durchschnitt 2 Wochen von Idee zu Live-Website</p>
            </div>

            <div className="glass rounded-2xl p-4 border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-300">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mb-3 border border-purple-500/30">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Skalierbar</h3>
              <p className="text-sm text-gray-300">Moderne Architektur für Wachstum</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToSkills}
          className="cursor-pointer"
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </motion.div>
      
      {/* Project Wizard Modal */}
      {showWizard && (
        <ProjectWizard onClose={() => setShowWizard(false)} />
      )}

      {/* Floating CTA Button */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowWizard(true)}
              className="group relative bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-full shadow-2xl shadow-primary/30 border border-primary/20 backdrop-blur-sm transition-all duration-300 flex items-center gap-3 font-medium text-base"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <span className="hidden sm:inline">Projekt anfrage</span>
              <span className="sm:hidden">Anfrage</span>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10 group-hover:bg-primary/30 transition-all duration-300" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 