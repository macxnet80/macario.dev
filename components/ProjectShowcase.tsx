'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles, Zap, TrendingUp, Clock, CheckCircle, Code2, Database, Bot, ArrowRight, Users, BarChart2, Loader2, AlertCircle } from 'lucide-react'
import { useProjects } from '@/hooks/useProjects'
import Image from 'next/image'

export default function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { projects, loading, error } = useProjects()

  useEffect(() => {
    setMounted(true)
  }, [])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Projekt-Showcase
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Entdecke einige meiner erfolgreich umgesetzten Projekte - 
              alle ohne traditionelles Coding, aber mit professionellen Ergebnissen.
            </p>
          </div>
          <div className="glass rounded-3xl p-12 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-300">Wird geladen...</p>
          </div>
        </div>
      </section>
    )
  }

  // Loading State
  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Projekt-Showcase
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Entdecke einige meiner erfolgreich umgesetzten Projekte - 
              alle ohne traditionelles Coding, aber mit professionellen Ergebnissen.
            </p>
          </motion.div>
          
          <div className="glass rounded-3xl p-12 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-300">Projekte werden geladen...</p>
          </div>
        </div>
      </section>
    )
  }

  // Error State
  if (error) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Projekt-Showcase
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Entdecke einige meiner erfolgreich umgesetzten Projekte - 
              alle ohne traditionelles Coding, aber mit professionellen Ergebnissen.
            </p>
          </motion.div>
          
          <div className="glass rounded-3xl p-12 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <p className="text-gray-300 mb-4">{error}</p>
            <p className="text-sm text-gray-400">Fallback-Daten werden angezeigt</p>
          </div>
        </div>
      </section>
    )
  }

  // No projects available
  if (!projects || projects.length === 0) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Projekt-Showcase
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Entdecke einige meiner erfolgreich umgesetzten Projekte - 
              alle ohne traditionelles Coding, aber mit professionellen Ergebnissen.
            </p>
          </motion.div>
          
          <div className="glass rounded-3xl p-12 text-center">
            <Database className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-300">Keine Projekte verfügbar</p>
          </div>
        </div>
      </section>
    )
  }

  const currentProject = projects[currentIndex]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Projekt-Showcase
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Entdecke einige meiner erfolgreich umgesetzten Projekte - 
            alle ohne traditionelles Coding, aber mit professionellen Ergebnissen.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                {/* Project Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-3">{currentProject.title}</h3>
                    <p className="text-gray-300 text-lg">{currentProject.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">EINGESETZTE TOOLS</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 rounded-full bg-white/10 text-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">KEY FEATURES</h4>
                    <ul className="space-y-2">
                      {currentProject.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${currentProject.color} opacity-20 rounded-2xl`} />
                  <div className="relative bg-gray-800 rounded-2xl p-8 h-full flex items-center justify-center">
                    {currentProject.image_url ? (
                      <div className="relative w-full h-64 rounded-xl overflow-hidden">
                        <Image
                          src={currentProject.image_url}
                          alt={currentProject.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-primary to-purple-400 rounded-2xl flex items-center justify-center">
                          <ExternalLink className="w-16 h-16 text-white" />
                        </div>
                        <p className="text-gray-400">Projekt-Demo verfügbar</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevProject}
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
              disabled={projects.length <= 1}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'w-8 bg-primary' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
              disabled={projects.length <= 1}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// KI & Automatisierung Section (dunkles UI)
export function KIAutomatisierungSection() {
  const [tab, setTab] = useState<'ideen' | 'auto' | 'vorteile'>('ideen')
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [ideaCount, setIdeaCount] = useState(0)
  const [showContact, setShowContact] = useState(false)

  // Beispielideen für den Generator
  const beispiele = [
    'Eine Website für lokale Restaurants mit Online-Bestellung',
    'Ein Booking-System für Fitness-Studios',
    'Eine Community-Plattform für Freelancer',
    'Ein Dashboard für E-Commerce Analytics',
    'Eine Lern-Plattform mit Fortschrittstracking',
  ]

  // Automatisierungsbeispiele
  const automations = [
    {
      icon: Sparkles,
      title: 'E-Mail Marketing Automation',
      desc: 'Automatische Willkommens-Serie und Follow-up Kampagnen',
      tools: ['n8n', 'Supabase', 'Vercel'],
      vorteile: ['80% Zeit gespart', '40% höhere Öffnungsrate', 'Personalisierte Inhalte'],
    },
    {
      icon: Code2,
      title: 'Lead-Generierung & CRM Sync',
      desc: 'Leads automatisch sammeln, qualifizieren und an CRM weiterleiten',
      tools: ['n8n', 'Supabase', 'Airtable'],
      vorteile: ['100% der Leads erfasst', 'Sofortige Bearbeitung', 'Keine Datenverluste'],
    },
    {
      icon: Users,
      title: 'Social Media Management',
      desc: 'Content-Planung, Posting und Performance-Tracking automatisieren',
      tools: ['n8n', 'Supabase', 'Vercel API'],
      vorteile: ['Konsistente Präsenz', '70% weniger Aufwand', 'Bessere Engagement Rates'],
    },
    {
      icon: Zap,
      title: 'Backend API Automation',
      desc: 'Serverless Functions für Datenverarbeitung und Integration',
      tools: ['Cursor', 'Supabase', 'Vercel'],
      vorteile: ['Skalierbare Architektur', 'Real-time Processing', '99.9% Uptime'],
    },
    {
      icon: Database,
      title: 'Database Workflow Engine',
      desc: 'Automatisierte Datenverarbeitung und Synchronisation',
      tools: ['Supabase', 'n8n', 'Cursor'],
      vorteile: ['Fehlerfreie Sync', 'Real-time Updates', '90% weniger Maintenance'],
    },
    {
      icon: Bot,
      title: 'AI-Powered Content Generation',
      desc: 'Intelligente Content-Erstellung und Optimierung',
      tools: ['Cursor', 'Vercel API', 'Supabase'],
      vorteile: ['Personalisierte Inhalte', '5x schnellere Erstellung', 'SEO-optimiert'],
    },
  ]

  // Vorteile
  const vorteile = [
    {
      icon: Clock,
      title: '80%',
      subtitle: 'Zeit sparen',
      desc: 'Bis zu 80% weniger manuelle Arbeit durch intelligente Automatisierung',
    },
    {
      icon: TrendingUp,
      title: '3x',
      subtitle: 'Effizienz steigern',
      desc: 'Moderne Tools für optimierte Prozesse und weniger Fehler',
    },
    {
      icon: Zap,
      title: '5 Tage',
      subtitle: 'Schnelle Umsetzung',
      desc: 'Mit Cursor, Supabase und Vercel in wenigen Tagen live',
    },
  ]

  // 4 Schritte
  const schritte = [
    { icon: BarChart2, title: 'Analyse', desc: 'Anforderungen verstehen und Tech-Stack planen' },
    { icon: Code2, title: 'Design', desc: 'Mit Cursor schnell Prototypen entwickeln' },
    { icon: Database, title: 'Build', desc: 'Supabase Backend und n8n Automatisierung' },
    { icon: ArrowRight, title: 'Deploy', desc: 'Vercel Deployment und Performance-Monitoring' },
  ]

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-primary mb-2">KI & Automatisierung</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mb-10">
          Intelligente Web-Lösungen mit modernen Tools, die dein Business automatisieren und voranbringen
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-12 px-4">
          <button
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-md transition-all border border-white/10 focus:outline-none text-sm sm:text-base ${tab === 'ideen' ? 'bg-primary text-white shadow-lg scale-105' : 'bg-background text-primary-foreground hover:bg-primary/10'}`}
            onClick={() => setTab('ideen')}
          >
            <Sparkles className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />Ideen-Generator
          </button>
          <button
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-md transition-all border border-white/10 focus:outline-none text-sm sm:text-base ${tab === 'auto' ? 'bg-primary text-white shadow-lg scale-105' : 'bg-background text-primary-foreground hover:bg-primary/10'}`}
            onClick={() => setTab('auto')}
          >
            <Zap className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />Automatisierungen
          </button>
          <button
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-md transition-all border border-white/10 focus:outline-none text-sm sm:text-base ${tab === 'vorteile' ? 'bg-primary text-white shadow-lg scale-105' : 'bg-background text-primary-foreground hover:bg-primary/10'}`}
            onClick={() => setTab('vorteile')}
          >
            <TrendingUp className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />Vorteile
          </button>
        </div>
        {/* Tab Inhalte */}
        {tab === 'ideen' && (
          <div className="max-w-3xl mx-auto bg-white/10 rounded-3xl p-8 md:p-12 text-center shadow-xl border border-white/10">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">KI-Ideen Generator</h3>
              <p className="text-gray-300 mb-4">Beschreibe deine Web-Projekt Idee und erhalte konkrete Umsetzungsvorschläge mit modernen Tools</p>
            </div>
            <div className="mb-4 text-left">
              <span className="text-gray-400 text-sm font-semibold">Oder wähle ein Beispiel:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {beispiele.map((b) => (
                  <button key={b} className="bg-white/10 hover:bg-primary/20 text-primary-foreground px-4 py-2 rounded-lg text-sm transition-all"
                    onClick={() => setInput(b)}>{b}</button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none mb-4"
                placeholder="z.B. Eine Website für lokale Hundesitter, die Termine buchen und Hundebesitzer verwalten können..."
                disabled={showContact}
              />
              <button
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-base mt-2 disabled:bg-primary/50"
                disabled={isLoading || !input.trim() || showContact}
                onClick={() => {
                  if (ideaCount >= 3) {
                    setShowContact(true)
                    return
                  }
                  setIsLoading(true)
                  setTimeout(() => {
                    const ideas = [
                      `Basierend auf "${input}" könnte ich dir eine Mobile App mit KI-gestützter Analyse entwickeln. Die Umsetzung würde etwa 2-3 Wochen dauern.`,
                      `Für "${input}" empfehle ich eine Lösung mit Supabase und n8n. Wir könnten automatisierte Workflows integrieren und das Ganze in 1-2 Wochen fertigstellen.`,
                      `Interessante Idee! Für "${input}" würde sich eine Web-Applikation anbieten. Mit Vercel können wir ein benutzerfreundliches Interface umsetzen.`
                    ]
                    setResponse(ideas[Math.floor(Math.random() * ideas.length)])
                    setIsLoading(false)
                    setIdeaCount(c => c + 1)
                  }, 1500)
                }}
              >
                <Sparkles className="w-5 h-5" /> Lösung generieren
              </button>
              {showContact ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 rounded-xl p-4 border border-purple-500/20 text-center mt-6"
                >
                  <h4 className="font-semibold mb-2 text-sm text-primary">Du hast 3 Ideen ausprobiert!</h4>
                  <p className="text-gray-300 text-sm mb-4">Lass uns persönlich sprechen, um die beste Lösung für dein Projekt zu finden.</p>
                  <div className="flex flex-col gap-2">
                    <a href="mailto:hello@example.com" className="bg-primary text-white rounded-lg px-4 py-2 font-medium hover:bg-primary/90 transition-all">Jetzt Kontakt aufnehmen</a>
                    <button
                      onClick={() => { setShowContact(false); setIdeaCount(0); setInput(''); setResponse(''); }}
                      className="bg-white/10 text-primary rounded-lg px-4 py-2 font-medium hover:bg-white/20 transition-all"
                    >Zurück zum Start</button>
                  </div>
                </motion.div>
              ) : response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 rounded-xl p-4 border border-purple-500/20 mt-6"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Mein Vorschlag:</h4>
                      <p className="text-gray-300 text-sm">{response}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
        {tab === 'auto' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {automations.map((a) => (
              <div key={a.title} className="glass rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center mb-4">
                  <a.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{a.title}</h3>
                <p className="text-gray-300 mb-3">{a.desc}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {a.tools.map((t) => (
                    <span key={t} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">{t}</span>
                  ))}
                </div>
                <div className="mt-2">
                  <span className="text-gray-400 text-xs font-semibold">Vorteile:</span>
                  <ul className="mt-1 space-y-1">
                    {a.vorteile.map((v) => (
                      <li key={v} className="flex items-center gap-2 text-green-400 text-sm"><CheckCircle className="w-4 h-4" />{v}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'vorteile' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {vorteile.map((v) => (
                <div key={v.title} className="glass rounded-2xl p-8 border border-white/10 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center mb-4 mx-auto">
                    <v.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-1">{v.title}</h3>
                  <div className="text-lg font-semibold text-white mb-1">{v.subtitle}</div>
                  <p className="text-gray-300 text-base">{v.desc}</p>
                </div>
              ))}
            </div>
            <div className="max-w-4xl mx-auto bg-white/5 rounded-3xl p-8 md:p-12 text-center shadow-xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-white">Moderne Web-Entwicklung in 4 Schritten</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {schritte.map((s, i) => (
                  <div key={s.title} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center mb-3">
                      <s.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">{i + 1}</div>
                    <div className="font-semibold text-white mb-1">{s.title}</div>
                    <div className="text-gray-300 text-sm">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
} 