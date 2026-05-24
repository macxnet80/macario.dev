'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles, Zap, CheckCircle, Code2, Database, Bot, Users, Loader2, AlertCircle, Globe } from 'lucide-react'
import { useProjects } from '@/hooks/useProjects'
import Image from 'next/image'

export default function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState<'all' | 'client' | 'personal'>('all')
  const [mounted, setMounted] = useState(false)
  const { projects, loading, error } = useProjects()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Index zurücksetzen bei Filteränderung
  useEffect(() => {
    setCurrentIndex(0)
  }, [filter])

  // Filter anwenden
  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.project_category === filter
  )

  const nextProject = () => {
    if (filteredProjects.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length)
  }

  const prevProject = () => {
    if (filteredProjects.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="py-20 px-6 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-head)' }}>
              Projekt-Showcase
            </h2>
            <p className="text-xl text-[var(--fg-mute)] max-w-3xl mx-auto">
              Entdecke einige meiner erfolgreich umgesetzten Projekte - 
              alle ohne traditionelles Coding, aber mit professionellen Ergebnissen.
            </p>
          </div>
          <div className="bg-[var(--bg-card)] rounded-3xl p-12 text-center border border-[var(--line)]">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[var(--accent)]" />
            <p className="text-[var(--fg-mute)]">Wird geladen...</p>
          </div>
        </div>
      </section>
    )
  }

  // Loading State
  if (loading) {
    return (
      <section className="py-20 px-6 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-head)' }}>
              Projekt-Showcase
            </h2>
            <p className="text-xl text-[var(--fg-mute)] max-w-3xl mx-auto">
              Entdecke einige meiner erfolgreich umgesetzten Projekte - 
              alle ohne traditionelles Coding, aber mit professionellen Ergebnissen.
            </p>
          </motion.div>
          
          <div className="bg-[var(--bg-card)] rounded-3xl p-12 text-center border border-[var(--line)]">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[var(--accent)]" />
            <p className="text-[var(--fg-mute)]">Projekte werden geladen...</p>
          </div>
        </div>
      </section>
    )
  }

  // Error State
  if (error) {
    return (
      <section className="py-20 px-6 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-head)' }}>
              Projekt-Showcase
            </h2>
            <p className="text-xl text-[var(--fg-mute)] max-w-3xl mx-auto">
              Entdecke einige meiner erfolgreich umgesetzten Projekte - 
              alle ohne traditionelles Coding, aber mit professionellen Ergebnissen.
            </p>
          </motion.div>
          
          <div className="bg-[var(--bg-card)] rounded-3xl p-12 text-center border border-[var(--line)]">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-[var(--danger)]" />
            <p className="text-[var(--fg-mute)] mb-4">{error}</p>
            <p className="text-sm text-[var(--fg-dim)]">Fallback-Daten werden angezeigt</p>
          </div>
        </div>
      </section>
    )
  }

  const currentProject = filteredProjects[currentIndex]

  return (
    <section id="projekte" className="py-20 px-6 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-head)' }}>
            Projekt-Showcase
          </h2>
          <p className="text-xl text-[var(--fg-mute)] max-w-3xl mx-auto">
            Entdecke einige meiner erfolgreich umgesetzten Projekte - 
            alle ohne traditionelles Coding, aber mit professionellen Ergebnissen.
          </p>
        </motion.div>

        {/* Kategorie-Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {(['all', 'client', 'personal'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                filter === cat
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)] shadow-md shadow-[var(--accent-soft)]'
                  : 'bg-[var(--bg-card)] text-[var(--fg-mute)] border-[var(--line)] hover:text-[var(--fg)] hover:border-[var(--line-strong)]'
              }`}
            >
              {cat === 'all' && 'Alle Projekte'}
              {cat === 'client' && 'Kundenprojekte'}
              {cat === 'personal' && 'Eigene Projekte'}
            </button>
          ))}
        </div>

        <div className="relative">
          {filteredProjects.length === 0 ? (
            <div className="bg-[var(--bg-card)] rounded-3xl p-16 text-center border border-[var(--line)]">
              <Database className="w-12 h-12 mx-auto mb-4 text-[var(--fg-dim)]" />
              <p className="text-[var(--fg-mute)]">In dieser Kategorie sind noch keine Projekte online.</p>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl overflow-hidden bg-[var(--bg-card)] border border-[var(--line)] shadow-xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 lg:p-12 min-h-[450px]">
                    {/* Project Info */}
                    <div className="space-y-6 flex flex-col justify-between order-2 md:order-1">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-2xl md:text-3xl font-bold text-[var(--fg)]" style={{ fontFamily: 'var(--font-head)' }}>
                              {currentProject.title}
                            </h3>
                            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold border ${
                              currentProject.project_category === 'client'
                                ? 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]/10'
                                : 'bg-white/10 text-[var(--fg)] border-white/5'
                            }`}>
                              {currentProject.project_category === 'client' ? 'Kundenprojekt' : 'Eigenes Projekt'}
                            </span>
                          </div>
                          <p className="text-[var(--fg-mute)] text-sm md:text-base leading-relaxed">
                            {currentProject.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-dim)] mb-2.5">
                            EINGESETZTE TOOLS
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {currentProject.tools.map((tool) => (
                              <span
                                key={tool}
                                className="px-2.5 py-1 rounded-lg bg-black/40 border border-[var(--line)] text-[var(--fg-mute)] text-xs font-medium"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-dim)] mb-2.5">
                            KEY FEATURES
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {currentProject.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-xs md:text-sm text-[var(--fg-mute)]">
                                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Links Buttons */}
                      {(currentProject.project_url || currentProject.git_url) && (
                        <div className="flex flex-wrap gap-3 pt-6 border-t border-[var(--line)] mt-6">
                          {currentProject.project_url && (
                            <a
                              href={currentProject.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#6ae993] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-card)] cursor-pointer"
                            >
                              <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
                              Live Webseite
                            </a>
                          )}
                          {currentProject.git_url && (
                            <a
                              href={currentProject.git_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-black/40 px-5 py-2.5 text-sm font-semibold text-[var(--fg-mute)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--line-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-card)] cursor-pointer"
                            >
                              <Code2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                              Repository
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Project Image / Visual */}
                    <div className="relative order-1 md:order-2 rounded-2xl overflow-hidden aspect-video md:aspect-auto flex items-center justify-center min-h-[220px] bg-black/20 border border-[var(--line)]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${currentProject.color} opacity-10`} />
                      {currentProject.image_url ? (
                        <Image
                          src={currentProject.image_url}
                          alt={currentProject.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          style={{ objectPosition: 'center center' }}
                        />
                      ) : (
                        <div className="text-center p-6 z-10">
                          <div className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-gradient-to-br ${currentProject.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                            {currentProject.project_url ? (
                              <Globe className="w-9 h-9 md:w-11 md:h-11 text-white" />
                            ) : (
                              <Code2 className="w-9 h-9 md:w-11 md:h-11 text-white" />
                            )}
                          </div>
                          <p className="text-[var(--fg)] font-semibold text-sm md:text-base">Projekt-Demo verfügbar</p>
                          <p className="text-[var(--fg-mute)] text-xs mt-1">Gradients und Icons passen sich dynamisch an.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {filteredProjects.length > 1 && (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={prevProject}
                      className="p-3 rounded-full bg-[var(--bg-card)] border border-[var(--line)] hover:border-[var(--line-strong)] text-[var(--fg-mute)] hover:text-[var(--fg)] transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-2">
                      {filteredProjects.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                              ? 'w-6 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]' 
                              : 'w-2 bg-[var(--line-strong)] hover:bg-[var(--fg-dim)]'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextProject}
                      className="p-3 rounded-full bg-[var(--bg-card)] border border-[var(--line)] hover:border-[var(--line-strong)] text-[var(--fg-mute)] hover:text-[var(--fg)] transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

// KI & Automatisierung Section (dunkles UI)
export function KIAutomatisierungSection() {
  const [tab, setTab] = useState<'ideen' | 'auto'>('ideen')
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
    'Ein AI Voice Agent für Kundenservice mit mehrsprachiger Unterstützung',
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



  return (
    <section className="py-20 px-6 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white mb-2">KI & Automatisierung</h2>
        <p className="text-xl text-white max-w-3xl mx-auto text-center mb-10">
          Intelligente Web-Lösungen mit modernen Tools, die dein Business automatisieren und voranbringen
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-12 px-4">
          <button
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-md transition-all border border-white/10 focus:outline-none text-sm sm:text-base ${tab === 'ideen' ? 'bg-[#d1d1d1] text-black shadow-lg scale-105' : 'bg-background text-white hover:bg-white/10'}`}
            onClick={() => setTab('ideen')}
          >
            <Sparkles className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />Ideen-Generator
          </button>
          <button
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-md transition-all border border-white/10 focus:outline-none text-sm sm:text-base ${tab === 'auto' ? 'bg-[#d1d1d1] text-black shadow-lg scale-105' : 'bg-background text-white hover:bg-white/10'}`}
            onClick={() => setTab('auto')}
          >
            <Zap className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />Automatisierungen
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
              <p className="text-white mb-4">Beschreibe deine Web-Projekt Idee und erhalte konkrete Umsetzungsvorschläge mit modernen Tools</p>
            </div>
            <div className="mb-4 text-left">
              <span className="text-white text-sm font-semibold">Oder wähle ein Beispiel:</span>
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
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-[#e7e7e7] focus:ring-2 focus:ring-primary/40 outline-none mb-4"
                placeholder="z.B. Eine Website für lokale Hundesitter, die Termine buchen und Hundebesitzer verwalten können..."
                disabled={showContact}
              />
              <button
                className="w-full bg-[#e7e7e7] hover:bg-[#e7e7e7]/90 text-black py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-base mt-2 disabled:bg-[#e7e7e7]/50"
                disabled={isLoading || !input.trim() || showContact}
                onClick={async () => {
                  if (ideaCount >= 3) {
                    setShowContact(true)
                    return
                  }
                  setIsLoading(true)
                  setResponse('')
                  
                  try {
                    const response = await fetch('/api/generate-idea', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ input }),
                    })
                    
                    const data = await response.json()
                    
                    if (data.success) {
                      setResponse(data.idea)
                    } else {
                      throw new Error(data.message || 'Fehler bei der Ideen-Generierung')
                    }
                  } catch (error) {
                    console.error('Fehler beim Generieren der Idee:', error)
                    // Fallback bei Fehlern
                    const fallbackIdeas = [
                      `Basierend auf "${input}" könnte ich dir eine innovative Lösung mit modernen No/Low-Code Tools entwickeln. Die Umsetzung würde etwa 2-3 Wochen dauern.`,
                      `Für "${input}" empfehle ich eine maßgeschneiderte Web-Applikation mit automatisierten Workflows. Das Projekt wäre in 1-2 Wochen umsetzbar.`,
                      `Interessante Idee! Für "${input}" würde sich eine intelligente Plattform mit Echtzeit-Features anbieten. Mit modernen Tools schnell realisierbar.`
                    ]
                    setResponse(fallbackIdeas[Math.floor(Math.random() * fallbackIdeas.length)])
                  }
                  
                  setIsLoading(false)
                  setIdeaCount(c => c + 1)
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
                  <p className="text-white text-sm mb-4">Lass uns persönlich sprechen, um die beste Lösung für dein Projekt zu finden.</p>
                  <div className="flex flex-col gap-2">
                    <a href="mailto:hello@example.com" className="bg-[#e7e7e7] text-black rounded-lg px-4 py-2 font-medium hover:bg-[#e7e7e7]/90 transition-all">Dein Projekt jetzt besprechen</a>
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
                      <p className="text-white text-sm">{response}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
        {tab === 'auto' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automations.map((a) => (
              <div key={a.title} className="bg-black/50 rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center mb-4">
                  <a.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{a.title}</h3>
                <p className="text-white mb-3">{a.desc}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {a.tools.map((t) => (
                    <span key={t} className="bg-[#b0b0b0] text-black px-3 py-1 rounded-full text-xs font-medium">{t}</span>
                  ))}
                </div>
                <div className="mt-2">
                  <span className="text-white text-xs font-semibold">Vorteile:</span>
                  <ul className="mt-1 space-y-1">
                    {a.vorteile.map((v) => (
                      <li key={v} className="flex items-center gap-2 text-[#b0b0b0] text-sm"><CheckCircle className="w-4 h-4" />{v}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 
