'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ProjectWizard from './ProjectWizard'

export default function ProblemSection() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showWizard, setShowWizard] = useState(false)

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
                  Du liebst, was du tust.
                </p>
                
                <p>
                  Jeden Tag hilfst du Menschen, stärker, fitter und gesünder zu werden. 
                  Du siehst die Transformation. Du spürst die Energie. <span className="text-white font-semibold">Das ist dein Antrieb.</span>
                </p>
                
                <p>
                  <span className="text-red-400 font-semibold">Aber irgendwas stimmt nicht...</span>
                </p>
              </div>

              {/* Pain Points */}
              <div className="space-y-4 text-lg text-gray-300 mt-8">
                <p>
                  Zwischen den Trainings sitzt du am Handy:
                </p>
                
                <div className="space-y-2 pl-4">
                  <p>→ WhatsApp-Nachrichten um 6 Uhr morgens: <span className="text-white italic">"Können wir den Termin verschieben?"</span></p>
                  <p>→ Excel-Listen, die niemand versteht – auch du nicht mehr</p>
                  <p>→ Ernährungspläne als PDF, die im Chat-Verlauf verschwinden</p>
                  <p>→ Rechnungen, die du <span className="text-red-400 font-semibold">immer noch</span> nicht geschrieben hast</p>
                  <p>→ Instagram-DMs mit <span className="text-white italic">"Was kostet das?"</span> – und du weißt nicht, ob sie ernsthaft interessiert sind</p>
                  <p>→ Neue Anfragen, die du <span className="text-red-400 font-semibold">nicht qualifizieren kannst</span>, bevor du Zeit investierst</p>
                </div>
              </div>

              {/* Result */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 sm:p-8 mt-8">
                <p className="text-lg sm:text-xl text-red-300 font-medium mb-4">
                  Das Ergebnis?
                </p>
                <p className="text-lg text-gray-300">
                  Du bist Trainer, Sekretär, Buchhalter und Social Media Manager – <span className="text-white font-semibold">in einer Person.</span>
                </p>
                <p className="text-lg text-gray-300 mt-3">
                  Und abends fragst du dich: <span className="text-white italic">"Wann trainiere ich eigentlich selbst noch?"</span>
                </p>
                <p className="text-lg text-red-400 font-semibold mt-4">
                  Währenddessen nutzt deine Konkurrenz KI-Assistenten, die 24/7 Anfragen beantworten und Leads qualifizieren.
                </p>
              </div>

              {/* Hard Truth */}
              <div className="space-y-4 mt-12">
                <div className="text-xl sm:text-2xl font-bold text-white text-center">
                  Hier ist die harte Wahrheit:
                </div>
                
                <div className="space-y-3 text-lg text-gray-300">
                  <p>Dein Business kann nicht wachsen, wenn du alles manuell machst.</p>
                  <p>Deine Zeit ist begrenzt. Dein Stundensatz auch.</p>
                  <p className="text-red-400 font-semibold">Während du Termine jonglierst, nutzt deine Konkurrenz KI-Assistenten und automatisierte Systeme.</p>
                  <p className="text-red-400 font-semibold">Sie beantworten Anfragen 24/7, qualifizieren Leads automatisch und haben Zeit für das, was wirklich zählt: ihre Kunden.</p>
                  <p className="text-white font-semibold text-center mt-4">Du nicht. Noch nicht.</p>
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
                Stell dir vor:
              </div>
              
              <div className="space-y-3 text-lg text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-green-400">→</span>
                  <p>Kunden buchen ihre Termine selbst – ohne Nachfragen</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">→</span>
                  <p>Trainingspläne landen automatisch in der App – nicht in WhatsApp</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">→</span>
                  <p>Neue Anfragen werden qualifiziert, bevor du zurückrufst</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">→</span>
                  <p>Zahlungen laufen automatisch – du siehst nur die Benachrichtigung</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">→</span>
                  <p className="text-white font-semibold">Du hast Zeit für das, was du liebst: Training und Menschen</p>
                </div>
              </div>
            </div>

            {/* My Story */}
            <div className="space-y-4">
              <div className="text-xl sm:text-2xl font-bold text-white">
                Das ist keine Zukunftsmusik.
              </div>
              
              <div className="space-y-3 text-lg text-gray-300">
                <p>
                  Als Personal Trainer mit <span className="text-white font-semibold">10+ Jahren Erfahrung</span> habe ich genau diese Probleme selbst erlebt.
                </p>
                <p>
                  Deshalb habe ich angefangen, meine eigenen digitalen Lösungen zu bauen.
                </p>
                <p>
                  Heute entwickle ich Web-Apps, Kunden-Portale und Automatisierungen 
                  speziell für Personal Trainer, Fitnessstudios und Gesundheits-Coaches.
                </p>
              </div>
            </div>

            {/* What I Can Do */}
            <div className="space-y-4">
              <div className="text-xl sm:text-2xl font-bold text-white">
                Was ich für dich umsetzen kann:
              </div>
              
              <div className="space-y-3 text-lg text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">KI-Assistent</span> der 24/7 Anfragen beantwortet und Leads automatisch qualifiziert – während du schläfst</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">Buchungs-System</span> mit KI-gestützten Erinnerungen und automatischer Terminoptimierung</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">Kunden-Portal</span> mit KI-generierten Trainingsplänen und personalisiertem Progress-Tracking</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">Automatische Workflows</span> mit KI für intelligente Follow-ups, Rechnungen und Upselling</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">Professionelle Website</span> mit integriertem KI-Chatbot für sofortige Lead-Qualifizierung</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 mt-6">
                <p className="text-lg text-white font-semibold mb-2">
                  KI ist kein Buzzword mehr – es ist dein Wettbewerbsvorteil.
                </p>
                <p className="text-gray-300">
                  Während andere noch manuell WhatsApp-Nachrichten beantworten, arbeitet dein KI-Assistent rund um die Uhr. 
                  Das ist der Unterschied zwischen "Ich schaue mal, ob ich Zeit habe" und "Ja, ich habe Zeit – hier sind die verfügbaren Termine."
                </p>
              </div>
              
              <div className="mt-4 text-lg text-gray-300">
                <p>
                  <span className="text-white font-semibold">Zeitrahmen:</span> In nur 2-4 Wochen live.
                </p>
                <p>
                  <span className="text-white font-semibold">Ohne:</span> Programmierkenntnisse, Tech-Stress oder ewige Meetings.
                </p>
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
                  <div className="text-lg font-semibold text-white mb-2">Weniger Admin</div>
                  <div className="text-sm text-gray-300">Automatisierung übernimmt Routine-Aufgaben</div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">2-4w</div>
                  <div className="text-lg font-semibold text-white mb-2">Go-Live</div>
                  <div className="text-sm text-gray-300">Deine App oder Website ist schnell einsatzbereit</div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                  <div className="text-lg font-semibold text-white mb-2">Erreichbar</div>
                  <div className="text-sm text-gray-300">Dein Buchungssystem arbeitet, auch wenn du schläfst</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-6">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                Bereit, dein Fitness-Business zu digitalisieren?
              </div>
              
              <div className="text-lg sm:text-xl text-gray-300 space-y-4">
                <p>
                  Lass uns gemeinsam herausfinden, welche Lösung am besten zu dir passt.
                </p>
                <p className="text-white font-semibold">
                  Von der ersten Idee bis zum Go-Live – ich begleite dich durch den gesamten Prozess.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => setShowWizard(true)}
                className="min-w-40 relative touch-none bg-[#d1d1d1] text-black hover:bg-[#d1d1d1]/90 border border-white/20 transition-all duration-300 rounded-full px-6 py-3 font-semibold shadow-lg hover:scale-105 w-full sm:w-auto"
              >
                <span className="relative w-full flex items-center justify-center gap-2">
                  Kostenloses Strategie-Gespräch buchen →
                </span>
              </button>
            </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Wizard Modal */}
      {showWizard && (
        <ProjectWizard onClose={() => setShowWizard(false)} />
      )}
    </section>
  )
}
