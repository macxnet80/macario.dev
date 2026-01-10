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
                  Du führst ein Unternehmen. Du kennst dein Geschäft. Du weißt, was funktioniert.
                </p>
                
                <p>
                  Aber deine Website ist veraltet. Deine Prozesse laufen noch manuell. 
                  Und während du im Tagesgeschäft versinkst, <span className="text-white font-semibold">nutzt deine Konkurrenz moderne Tools und KI.</span>
                </p>
                
                <p>
                  <span className="text-red-400 font-semibold">Das Problem?</span>
                </p>
              </div>

              {/* Pain Points */}
              <div className="space-y-4 text-lg text-gray-300 mt-8">
                <p>
                  Jeden Tag siehst du:
                </p>
                
                <div className="space-y-2 pl-4">
                  <p>→ Eine Website, die <span className="text-white italic">keine Kunden bringt</span> – veraltet, langsam, nicht gefunden</p>
                  <p>→ Excel-Listen und E-Mails für alles – Termine, Kunden, Rechnungen</p>
                  <p>→ Manuelle Prozesse, die Stunden kosten, die du nicht hast</p>
                  <p>→ IT-Projekte, die <span className="text-red-400 font-semibold">Monate dauern</span> und das Budget sprengen</p>
                  <p>→ Keine Zeit für Digitalisierung – <span className="text-white italic">"Das machen wir später"</span></p>
                  <p>→ Kundenanfragen, die du <span className="text-red-400 font-semibold">nicht automatisch qualifizieren kannst</span></p>
                </div>
              </div>

              {/* Result */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 sm:p-8 mt-8">
                <p className="text-lg sm:text-xl text-red-300 font-medium mb-4">
                  Das Ergebnis?
                </p>
                <p className="text-lg text-gray-300">
                  Du bist Unternehmer, IT-Manager, Marketing-Experte und Buchhalter – <span className="text-white font-semibold">in einer Person.</span>
                </p>
                <p className="text-lg text-gray-300 mt-3">
                  Und abends fragst du dich: <span className="text-white italic">"Wann arbeite ich eigentlich an meinem Business?"</span>
                </p>
                <p className="text-lg text-red-400 font-semibold mt-4">
                  Währenddessen nutzt deine Konkurrenz moderne Web-Apps, KI-Assistenten und Automatisierungen – und ist dir einen Schritt voraus.
                </p>
              </div>

              {/* Hard Truth */}
              <div className="space-y-4 mt-12">
                <div className="text-xl sm:text-2xl font-bold text-white text-center">
                  Hier ist die harte Wahrheit:
                </div>
                
                <div className="space-y-3 text-lg text-gray-300">
                  <p>Dein Unternehmen kann nicht wachsen, wenn alles manuell läuft.</p>
                  <p>Deine Zeit ist begrenzt. Dein Budget auch.</p>
                  <p className="text-red-400 font-semibold">Während du Prozesse verwaltest, nutzt deine Konkurrenz moderne Tools und KI.</p>
                  <p className="text-red-400 font-semibold">Sie haben automatisierte Workflows, moderne Websites und KI-Assistenten, die 24/7 arbeiten.</p>
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
                  <p>Eine moderne Website, die <span className="text-white font-semibold">Kunden bringt</span> – in 2 Wochen statt 6 Monaten</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">→</span>
                  <p>Automatisierte Prozesse, die dir <span className="text-white font-semibold">Stunden zurückgeben</span> – Rechnungen, Follow-ups, Termine</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">→</span>
                  <p>KI-Assistenten, die <span className="text-white font-semibold">24/7 Anfragen beantworten</span> und Leads qualifizieren</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">→</span>
                  <p>Interne Tools, die <span className="text-white font-semibold">deine Prozesse optimieren</span> – ohne monatelange IT-Projekte</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">→</span>
                  <p className="text-white font-semibold">Du hast Zeit für das, was wirklich zählt: dein Business</p>
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
                  Als Product Owner und No-Code Entwickler verstehe ich die Herausforderungen kleiner und mittelständischer Unternehmen.
                </p>
                <p>
                  Ich weiß: Ihr braucht <span className="text-white font-semibold">schnelle, bezahlbare Lösungen</span> – keine monatelangen IT-Projekte.
                </p>
                <p>
                  Deshalb entwickle ich Web-Apps, Automatisierungen und KI-Lösungen speziell für KMU – 
                  <span className="text-white font-semibold"> pragmatisch, schnell und ohne Tech-Kopfschmerzen.</span>
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
                  <p><span className="text-white font-semibold">Moderne Unternehmens-Website</span> – Portfolio, Landing Pages, Firmenpräsenz in 2 Wochen live</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">Kunden-Portal</span> – Dashboard, Self-Service, Dokumentenzugriff für deine Kunden</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">Buchungs- & Terminsysteme</span> – für Dienstleister aller Art mit automatischen Erinnerungen</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">Interne Tools</span> – Workflows, Datenbanken, Reporting für deine Prozesse</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">KI-Assistenten</span> – Chatbots, FAQ, Lead-Qualifizierung rund um die Uhr</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
                  <p><span className="text-white font-semibold">Automatisierungen</span> – E-Mail, Rechnungen, CRM-Integration ohne manuelle Arbeit</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 mt-6">
                <p className="text-lg text-white font-semibold mb-2">
                  KI ist kein Buzzword mehr – es ist dein Wettbewerbsvorteil.
                </p>
                <p className="text-gray-300">
                  Während andere noch manuell E-Mails beantworten und Prozesse verwalten, arbeitet dein KI-Assistent rund um die Uhr. 
                  Das ist der Unterschied zwischen "Ich schaue mal, ob ich Zeit habe" und "Ja, hier ist die Lösung."
                </p>
              </div>
              
              <div className="mt-4 text-lg text-gray-300">
                <p>
                  <span className="text-white font-semibold">Zeitrahmen:</span> In nur 2 Wochen live.
                </p>
                <p>
                  <span className="text-white font-semibold">Ohne:</span> Lange IT-Projekte, versteckte Kosten oder Tech-Stress.
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
                Bereit, dein Unternehmen zu digitalisieren?
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
