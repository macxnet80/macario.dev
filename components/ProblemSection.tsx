'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ProblemSection() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
      }
    )

    const element = document.getElementById('problem-section')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const staggerChildren = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  return (
    <section id="problem-section" className="py-20 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={mounted && isVisible ? "visible" : "hidden"}
          variants={staggerChildren}
          className="space-y-16"
        >
          {/* Problem Section - Full Width */}
          <motion.div variants={fadeInUp} className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-12">
                Problem
              </h2>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
              <div className="space-y-6 text-lg sm:text-xl text-gray-300 leading-relaxed">
                <p>
                  Du hast eine Idee. Eine <span className="text-green-400 font-semibold">richtig gute Idee</span>.
                </p>
                
                <p>
                  Eine Idee, die dir nachts keine Ruhe lässt, weil du <span className="text-white font-semibold">GENAU</span> weißt – das könnte funktionieren.
                </p>
                
                <p>
                  Eine App, die dein Business automatisiert. Ein Tool, das anderen das Leben leichter macht. 
                  Ein MVP, das dein Sprungbrett in die Selbstständigkeit sein könnte.
                </p>
              </div>

              {/* But... */}
              <div className="text-2xl sm:text-3xl font-bold text-red-400 mt-12 text-center">
                Aber irgendetwas hält dich zurück...
              </div>

              {/* Pain Points */}
              <div className="space-y-4 text-lg text-gray-300">
                <p>
                  Vielleicht ist es die <span className="text-red-400">Angst vor dem Unbekannten</span>. 
                  Oder der Gedanke: <span className="text-white italic">"Ich bin doch kein Entwickler – wie soll ich das umsetzen?"</span>
                </p>
                
                <p>
                  Vielleicht wartest du auf den <span className="text-red-400">"perfekten Moment"</span>. 
                  Oder darauf, dass du endlich Zeit findest, dich in Programmierung einzuarbeiten.
                </p>
              </div>

              {/* Time Passing */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 sm:p-8 mt-8">
                <p className="text-lg sm:text-xl text-red-300 font-medium">
                  Und während du wartest... vergeht Zeit. Andere bringen ihre Ideen auf den Markt. 
                  Die Konkurrenz wird stärker. Dein Traum rückt in weite Ferne.
                </p>
              </div>

              {/* Hard Truth */}
              <div className="space-y-4 mt-12">
                <div className="text-xl sm:text-2xl font-bold text-white text-center">
                  Hier ist die harte Wahrheit:
                </div>
                
                <div className="text-lg sm:text-xl text-red-400 font-semibold text-center">
                  Warten macht es nicht einfacher.
                </div>
                
                <div className="space-y-3 text-lg text-gray-300">
                  <p>Der Markt bewegt sich schnell. Ideen ohne Umsetzung sind wertlos.</p>
                  <p>Die Gewinner? Sie warten nicht. Sie handeln. Sie bauen.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solution Section - Full Width */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-12">
                Lösung
              </h2>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">

            {/* Solution Promise */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 sm:p-8">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-4">
                Und in nur 2 Wochen könnte deine Idee live sein.
              </div>
              
              <div className="space-y-3 text-lg text-gray-300">
                <p>Nicht nur ein Konzept. Nicht nur ein Traum.</p>
                <p className="text-white font-semibold">Ein echtes Produkt. Mit echten Nutzern.</p>
              </div>
            </div>

            {/* How I Do It */}
            <div className="space-y-4">
              <div className="text-xl sm:text-2xl font-bold text-white">
                Wie ich das umsetze:
              </div>
              
              <div className="space-y-3 text-lg text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">No/Low-Code Entwicklung:</span> Moderne Tools statt monatelange Programmierung</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">KI-Integration:</span> Intelligente Automatisierung für bessere User Experience</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">Agile Umsetzung:</span> Transparente Kommunikation und schnelle Iterationen</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">Sofort einsatzbereit:</span> Hosting, Domain und Launch inklusive</p>
                </div>
              </div>
            </div>

            {/* Vorteile */}
            <div className="space-y-6">
              <div className="text-xl sm:text-2xl font-bold text-white">
                Deine Vorteile:
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">80%</div>
                  <div className="text-lg font-semibold text-white mb-2">Zeit sparen</div>
                  <div className="text-sm text-gray-300">Bis zu 80% weniger manuelle Arbeit durch intelligente Automatisierung</div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">3x</div>
                  <div className="text-lg font-semibold text-white mb-2">Effizienz steigern</div>
                  <div className="text-sm text-gray-300">Moderne Tools für optimierte Prozesse und weniger Fehler</div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">2w</div>
                  <div className="text-lg font-semibold text-white mb-2">Schnelle Umsetzung</div>
                  <div className="text-sm text-gray-300">Mit Cursor, Supabase und Vercel in wenigen Wochen live</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-6">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                Das ist dein Moment.
              </div>
              
              <div className="text-lg sm:text-xl text-gray-300 space-y-4">
                <p>
                  Deine Chance, aufzuhören zu überdenken, anzufangen zu bauen und 
                  die Kontrolle über deine Zukunft zu übernehmen.
                </p>
                
                <div className="text-xl font-semibold text-red-400">
                  Denn wenn du nicht jetzt handelst... wer dann?
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  const ctaSection = document.querySelector('#cta-section')
                  ctaSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="min-w-40 relative touch-none bg-[#d1d1d1] text-black hover:bg-[#d1d1d1]/90 border border-white/20 transition-all duration-300 rounded-full px-6 py-3 font-semibold shadow-lg hover:scale-105 w-full sm:w-auto"
              >
                <span className="relative w-full flex items-center justify-center gap-2">
                  Deine Idee umsetzen →
                </span>
              </button>
            </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
