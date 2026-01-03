'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Globe,
  Smartphone,
  Mic,
  Bot,
  Zap,
  Calendar,
  Euro,
  Clock,
  Star,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  User,
  Users,
  Building,
  MessageSquare,
  Brain
} from 'lucide-react'

interface ProjectData {
  projectType: string
  budget: number
  timeline: string
  features: string[]
  priority: string
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  description: string
  source: string
  privacyAccepted: boolean
  marketingAccepted: boolean
}

interface StepProps {
  data: ProjectData
  updateData: (updates: Partial<ProjectData>) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

const projectTypes = [
  {
    id: 'trainer-website',
    title: 'Trainer-Website',
    description: 'Portfolio + Buchungssystem + Kontakt',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    basePrice: 750,
    features: ['Portfolio & Über mich', 'Online-Buchung', 'Kontaktformular', 'SEO-Optimierung']
  },
  {
    id: 'booking-app',
    title: 'Buchungs-App',
    description: 'Terminverwaltung + Erinnerungen',
    icon: Calendar,
    color: 'from-purple-500 to-pink-500',
    basePrice: 1500,
    features: ['Kalender-Integration', 'Automatische Erinnerungen', 'Zahlungsintegration', 'Kundenverwaltung']
  },
  {
    id: 'client-portal',
    title: 'Kunden-Portal',
    description: 'Trainingspläne + Progress + Check-Ins',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    basePrice: 2500,
    features: ['Trainingsplan-Erstellung', 'Progress-Tracking', 'Ernährungspläne', 'Check-Ins']
  },
  {
    id: 'studio-management',
    title: 'Studio-Management',
    description: 'Mitglieder + Kurse + Zugang',
    icon: Building,
    color: 'from-orange-500 to-red-500',
    basePrice: 3500,
    features: ['Mitgliederverwaltung', 'Kursplanung', 'Zugangs-System', 'Reporting']
  },
  {
    id: 'ai-assistant',
    title: 'KI-Assistent',
    description: 'Chatbot + FAQ + Lead-Qualifizierung',
    icon: Bot,
    color: 'from-indigo-500 to-purple-500',
    basePrice: 2000,
    features: ['24/7 Verfügbar', 'FAQ-Beantwortung', 'Lead-Qualifizierung', 'Terminvorschläge']
  },
  {
    id: 'automation',
    title: 'Automatisierung',
    description: 'Workflows + Follow-ups + Rechnungen',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    basePrice: 750,
    features: ['E-Mail Automation', 'Zahlungserinnerungen', 'Follow-ups', 'Reporting']
  }
]

const timelineOptions = [
  { id: '1-2-weeks', label: '1-2 Wochen', multiplier: 1.5 },
  { id: '3-4-weeks', label: '3-4 Wochen', multiplier: 1.2 },
  { id: '1-2-months', label: '1-2 Monate', multiplier: 1.0 },
  { id: '3-6-months', label: '3-6 Monate', multiplier: 0.9 },
  { id: 'flexible', label: 'Flexibel', multiplier: 0.8 }
]

const priorityOptions = [
  { id: 'speed', label: 'Speed', icon: Zap },
  { id: 'quality', label: 'Quality', icon: Star },
  { id: 'budget', label: 'Budget', icon: Euro },
  { id: 'features', label: 'Features', icon: Sparkles }
]

const sourceOptions = [
  { id: 'website', label: 'malt.de', icon: Globe },
  { id: 'google', label: 'Google', icon: Globe },
  { id: 'social-media', label: 'Social Media', icon: MessageSquare },
  { id: 'referral', label: 'Empfehlung', icon: User }
]

// Step 1: Project Type Selection
function ProjectTypeStep({ data, updateData, onNext }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Welche Art von Projekt planst du?</h2>
        <p className="text-[#e7e7e7]">Wähle den Projekttyp, der am besten zu deiner Vision passt</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectTypes.map((type) => (
          <motion.button
            key={type.id}
            onClick={() => {
              updateData({ projectType: type.id })
              setTimeout(onNext, 300)
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              data.projectType === type.id
                ? 'border-[#d1d1d1] bg-[#d1d1d1]/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${type.color} p-3 mb-4`}>
              <type.icon className="w-full h-full text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
            <p className="text-[#e7e7e7] text-sm mb-4">{type.description}</p>
            <div className="text-[#d1d1d1] font-medium">ab {type.basePrice}€</div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Step 2: Budget Selection
function BudgetStep({ data, updateData, onNext, onPrev }: StepProps) {
  const selectedType = projectTypes.find(t => t.id === data.projectType)
  const minBudget = selectedType?.basePrice || 1000
  const maxBudget = 25000

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Was ist dein Budget?</h2>
        <p className="text-[#e7e7e7]">Bewege den Slider um dein gewünschtes Budget festzulegen</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-[#d1d1d1] mb-2">
              {data.budget.toLocaleString('de-DE')}€
            </div>
            <div className="text-[#e7e7e7]">Geschätztes Projektbudget</div>
          </div>
          
          <input
            type="range"
            min={minBudget}
            max={maxBudget}
            step={250}
            value={data.budget}
            onChange={(e) => updateData({ budget: parseInt(e.target.value) })}
            className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          />
          
          <div className="flex justify-between text-sm text-[#e7e7e7] mt-2">
            <span>{minBudget.toLocaleString('de-DE')}€</span>
            <span>{maxBudget.toLocaleString('de-DE')}€</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onPrev}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </button>
          <button
            onClick={onNext}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#d1d1d1] text-black rounded-xl hover:bg-[#d1d1d1]/90 transition-all"
          >
            Weiter
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Step 3: Timeline & Priority
function TimelinePriorityStep({ data, updateData, onNext, onPrev }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Timeline & Prioritäten</h2>
        <p className="text-[#e7e7e7]">Wann soll das Projekt fertig sein und was ist dir wichtig?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Timeline */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#d1d1d1]" />
            Gewünschte Timeline
          </h3>
          <div className="space-y-3">
            {timelineOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => updateData({ timeline: option.id })}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  data.timeline === option.id
                    ? 'border-[#d1d1d1] bg-[#d1d1d1]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{option.label}</span>
                  {option.multiplier !== 1.0 && (
                    <span className={`text-sm px-2 py-1 rounded ${
                      option.multiplier > 1 ? 'bg-red-500/20 text-red-400' : 'bg-[#b0b0b0] text-black'
                    }`}>
                      {option.multiplier > 1 ? '+' : ''}{((option.multiplier - 1) * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#d1d1d1]" />
            Was ist dir wichtig?
          </h3>
          <div className="space-y-3">
            {priorityOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => updateData({ priority: option.id })}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  data.priority === option.id
                    ? 'border-[#d1d1d1] bg-[#d1d1d1]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <option.icon className="w-5 h-5 text-[#d1d1d1]" />
                  <span className="font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <button
          onClick={onPrev}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Zurück
        </button>
        <button
          onClick={onNext}
          disabled={!data.timeline || !data.priority}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#d1d1d1] text-black rounded-xl hover:bg-[#d1d1d1]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Weiter
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Step 4: Project Description
function ProjectDescriptionStep({ data, updateData, onNext, onPrev }: StepProps) {
  const selectedType = projectTypes.find(t => t.id === data.projectType)
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Erzähl mir mehr über dein Projekt</h2>
        <p className="text-[#e7e7e7]">Je detaillierter deine Beschreibung, desto besser kann ich dir helfen</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Quick Info Summary */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d1d1d1]" />
            Dein Projekt bisher
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[#e7e7e7]">Typ:</span>
              <span className="ml-2">{selectedType?.title}</span>
            </div>
            <div>
              <span className="text-[#e7e7e7]">Budget:</span>
              <span className="ml-2">{data.budget.toLocaleString('de-DE')}€</span>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-3">
              Projektbeschreibung *
            </label>
            <textarea
              value={data.description}
              onChange={(e) => updateData({ description: e.target.value })}
              rows={6}
              className="w-full bg-white/10 border border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#d1d1d1]/50 resize-none text-base"
              placeholder="Beschreibe dein Fitness-Projekt so detailliert wie möglich:

Was ist das Ziel deines Projekts?
Wie viele Kunden/Mitglieder betreust du aktuell?
Welche Funktionen sind dir wichtig?
Welche Probleme soll die Lösung lösen?
Hast du schon konkrete Vorstellungen oder Referenzen?"
            />
            <div className="text-right text-sm text-[#e7e7e7] mt-2">
              {data.description.length} Zeichen
            </div>
          </div>

          {/* Inspiration Examples */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              Beispiele für gute Beschreibungen:
            </h4>
            <div className="space-y-2 text-sm text-[#e7e7e7]">
              <p>• "Ich möchte eine Buchungs-App für mein Personal Training Business mit automatischen Erinnerungen und Zahlungsintegration"</p>
              <p>• "Ein Kunden-Portal für meine Trainingspläne mit Progress-Tracking und Check-In Funktionen"</p>
              <p>• "Ein Studio-Management-System für mein Fitnessstudio mit Mitgliederverwaltung und Kursplanung"</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={onPrev}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </button>
          <button
            onClick={onNext}
            disabled={!data.description.trim() || data.description.length < 50}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#d1d1d1] text-black rounded-xl hover:bg-[#d1d1d1]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Weiter
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {data.description.length < 50 && data.description.length > 0 && (
          <p className="text-center text-sm text-orange-400 mt-2">
            Mindestens 50 Zeichen für eine aussagekräftige Beschreibung
          </p>
        )}
      </div>
    </div>
  )
}

// Step 5: Contact & Final Details
function ContactStep({ data, updateData, onNext, onPrev, isLast }: StepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<string>('')
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [emailError, setEmailError] = useState<string>('')

  const selectedType = projectTypes.find(t => t.id === data.projectType)
  const timelineOption = timelineOptions.find(t => t.id === data.timeline)
  const finalPrice = Math.round((selectedType?.basePrice || 1000) * (timelineOption?.multiplier || 1))

  const generateAIAnalysis = async () => {
    setShowAnalysis(true)
    try {
      const response = await fetch('/api/analyze-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      setAiAnalysis(result.analysis)
    } catch (error) {
      setAiAnalysis('Entschuldigung, die KI-Analyse ist momentan nicht verfügbar. Ich werde dein Projekt gerne persönlich analysieren!')
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async () => {
    if (!data.firstName || !data.lastName || !data.email || !data.source || !data.privacyAccepted) return
    
    // E-Mail-Format validieren
    if (!isValidEmail(data.email)) {
      setEmailError('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
      return
    }
    
    setEmailError('') // Fehler zurücksetzen
    setIsSubmitting(true)
    
    // Transform data - IDs für Validierung, Labels für Webhook
    const selectedType = projectTypes.find(t => t.id === data.projectType)
    const timelineOption = timelineOptions.find(t => t.id === data.timeline)
    const priorityOption = priorityOptions.find(p => p.id === data.priority)
    const sourceOption = sourceOptions.find(s => s.id === data.source)
    
    // Daten mit IDs für API-Validierung senden
    // Labels werden im Webhook-Payload verwendet
    const transformedData = {
      ...data,
      // IDs für Validierung behalten
      projectType: data.projectType, // ID bleibt erhalten
      timeline: data.timeline, // ID bleibt erhalten
      priority: data.priority, // ID bleibt erhalten
      source: data.source, // ID bleibt erhalten
      // Labels für Webhook hinzufügen
      projectTypeLabel: selectedType?.title || data.projectType,
      timelineLabel: timelineOption?.label || data.timeline,
      priorityLabel: priorityOption?.label || data.priority,
      sourceLabel: sourceOption?.label || data.source,
      finalPrice,
      aiAnalysis,
      privacyAccepted: data.privacyAccepted,
      marketingAccepted: data.marketingAccepted || false
    }
    
    try {
      const response = await fetch('/api/submit-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transformedData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Fehler beim Senden der Anfrage')
      }
      
      onNext() // Go to success step
    } catch (error) {
      console.error('Fehler beim Senden:', error)
      setEmailError('Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Fast geschafft!</h2>
        <p className="text-[#e7e7e7]">Lass mich deine Kontaktdaten erfassen und eine KI-Analyse erstellen</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Project Summary */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-4">Projekt-Zusammenfassung</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#e7e7e7]">Projekttyp:</span>
              <span>{selectedType?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#e7e7e7]">Budget:</span>
              <span>{data.budget.toLocaleString('de-DE')}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#e7e7e7]">Timeline:</span>
              <span>{timelineOption?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#e7e7e7]">Priorität:</span>
              <span>{priorityOptions.find(p => p.id === data.priority)?.label}</span>
            </div>
            {data.description && (
              <div className="pt-3 border-t border-white/10">
                <span className="text-[#e7e7e7] block mb-2">Projektbeschreibung:</span>
                <p className="text-[#e7e7e7] text-xs leading-relaxed bg-white/5 rounded-lg p-3 max-h-20 overflow-y-auto break-words">
                  {data.description}
                </p>
              </div>
            )}
            <div className="border-t border-white/10 pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Geschätzter Preis:</span>
                <span className="text-[#d1d1d1]">{finalPrice.toLocaleString('de-DE')}€</span>
              </div>
            </div>
          </div>

          {!showAnalysis && (
            <button
              onClick={generateAIAnalysis}
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              KI-Projektanalyse starten
            </button>
          )}
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Kontaktdaten</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Vorname *</label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => updateData({ firstName: e.target.value })}
                  className="w-full bg-white/10 border border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#d1d1d1]/50"
                  placeholder="Dein Vorname"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nachname *</label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={(e) => updateData({ lastName: e.target.value })}
                  className="w-full bg-white/10 border border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#d1d1d1]/50"
                  placeholder="Dein Nachname"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">E-Mail *</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => {
                  updateData({ email: e.target.value })
                  setEmailError('') // Fehler beim Tippen zurücksetzen
                }}
                className={`w-full bg-white/10 border rounded-xl p-3 outline-none focus:ring-2 transition-all ${
                  emailError 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-white/10 focus:ring-[#d1d1d1]/50'
                }`}
                placeholder="deine@email.com"
              />
              {emailError && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {emailError}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unternehmen</label>
              <input
                type="text"
                value={data.company}
                onChange={(e) => updateData({ company: e.target.value })}
                className="w-full bg-white/10 border border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#d1d1d1]/50"
                placeholder="Dein Unternehmen (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefon</label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
                className="w-full bg-white/10 border border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#d1d1d1]/50"
                placeholder="+49 123 456789 (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Wie hast du von mir erfahren? *</label>
              <div className="grid grid-cols-2 gap-2">
                {sourceOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateData({ source: option.id })}
                    className={`p-3 rounded-xl border-2 transition-all text-left flex items-center gap-2 ${
                      data.source === option.id
                        ? 'border-[#d1d1d1] bg-[#d1d1d1]/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <option.icon className="w-4 h-4 text-[#d1d1d1]" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Privacy Policy & Marketing Checkboxes */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.privacyAccepted}
              onChange={(e) => updateData({ privacyAccepted: e.target.checked })}
              className="mt-1 w-4 h-4 text-[#d1d1d1] bg-white/10 border-white/20 rounded focus:ring-[#d1d1d1] focus:ring-2"
            />
            <div className="text-sm text-[#e7e7e7]">
              <span className="text-white">Ich akzeptiere die </span>
              <a 
                href="/datenschutz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#d1d1d1] hover:text-[#d1d1d1]/80 underline"
              >
                Datenschutzerklärung
              </a>
              <span className="text-white"> und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Projektanfrage zu. *</span>
            </div>
          </label>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.marketingAccepted}
              onChange={(e) => updateData({ marketingAccepted: e.target.checked })}
              className="mt-1 w-4 h-4 text-[#d1d1d1] bg-white/10 border-white/20 rounded focus:ring-[#d1d1d1] focus:ring-2"
            />
            <div className="text-sm text-[#e7e7e7]">
              <span className="text-white">Ich möchte gerne über neue Projekte, Angebote und Updates informiert werden. (Optional)</span>
            </div>
          </label>
        </div>
      </div>

      {/* AI Analysis */}
      {showAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 shadow-2xl"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            KI-Projektanalyse
          </h3>
          {aiAnalysis ? (
            <div className="space-y-4">
              {/* Enhanced parsing with better formatting */}
              {(() => {
                const sections = aiAnalysis.split('**').filter(part => part.trim())
                const greeting = sections[0]?.trim()
                
                // Extract structured sections
                const strukturierteSections = []
                for (let i = 1; i < sections.length; i += 2) {
                  if (sections[i] && sections[i + 1]) {
                    strukturierteSections.push({
                      title: sections[i].replace(':', '').trim(),
                      content: sections[i + 1].trim()
                    })
                  }
                }
                
                return (
                  <>
                    {/* Greeting */}
                    {greeting && (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-[#e7e7e7] leading-relaxed">{greeting}</p>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Structured sections */}
                    {strukturierteSections.map((section, index) => {
                      const getIcon = (title: string) => {
                        if (title.toLowerCase().includes('projekt')) return CheckCircle
                        if (title.toLowerCase().includes('budget') || title.toLowerCase().includes('timeline')) return Clock
                        if (title.toLowerCase().includes('einschätzung')) return Star
                        if (title.toLowerCase().includes('weiter')) return ArrowRight
                        return Sparkles
                      }
                      
                      const IconComponent = getIcon(section.title)
                      
                      return (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (index * 0.1) }}
                          className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-3 h-3 text-purple-400" />
                            </div>
                            {section.title}
                          </h4>
                          <p className="text-gray-300 leading-relaxed text-sm ml-8">
                            {section.content}
                          </p>
                        </motion.div>
                      )
                    })}
                    
                    {/* Fallback for unstructured text */}
                    {strukturierteSections.length === 0 && (
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-purple-400" />
                          </div>
                          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {aiAnalysis}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          ) : (
            <div className="flex items-center gap-3 text-gray-400">
              <div className="animate-spin w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full"></div>
              Sam analysiert dein Projekt...
            </div>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <button
          onClick={onPrev}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Zurück
        </button>
        <button
          onClick={handleSubmit}
          disabled={!data.firstName || !data.lastName || !data.email || !data.source || !data.privacyAccepted || isSubmitting}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#d1d1d1] text-black rounded-xl hover:bg-[#d1d1d1]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              Sende...
            </>
          ) : (
            <>
              Projekt einreichen
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// Step 6: Success Step
function SuccessStep() {
  const [showEmailModal, setShowEmailModal] = useState(false)
  
  const emailServices = [
    {
      name: 'Gmail',
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=lars.macario@gmail.com&su=Projektanfrage%20über%20macario.dev&body=Hallo%20Lars,%0D%0A%0D%0AIch%20habe%20über%20deine%20Website%20eine%20Projektanfrage%20gestellt%20und%20möchte%20gerne%20mehr%20Details%20besprechen.%0D%0A%0D%0AViele%20Grüße',
      icon: '📧'
    },
    {
      name: 'Outlook',
      url: 'https://outlook.live.com/mail/0/deeplink/compose?to=lars.macario@gmail.com&subject=Projektanfrage%20über%20macario.dev&body=Hallo%20Lars,%0D%0A%0D%0AIch%20habe%20über%20deine%20Website%20eine%20Projektanfrage%20gestellt%20und%20möchte%20gerne%20mehr%20Details%20besprechen.%0D%0A%0D%0AViele%20Grüße',
      icon: '📮'
    },
    {
      name: 'Standard E-Mail App',
      url: 'mailto:lars.macario@gmail.com?subject=Projektanfrage%20über%20macario.dev&body=Hallo%20Lars,%0D%0A%0D%0AIch%20habe%20über%20deine%20Website%20eine%20Projektanfrage%20gestellt%20und%20möchte%20gerne%20mehr%20Details%20besprechen.%0D%0A%0D%0AViele%20Grüße',
      icon: '✉️'
    }
  ]

  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-20 h-20 bg-[#b0b0b0]/20 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-[#b0b0b0]" />
      </motion.div>
      
      <h2 className="text-3xl font-bold mb-4">Perfekt! 🎉</h2>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Deine Projektanfrage wurde erfolgreich übermittelt. Ich melde mich innerhalb von 24 Stunden bei dir mit einer detaillierten Analyse und dem nächsten Schritt.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto">
        <button
          onClick={() => setShowEmailModal(true)}
          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-all"
        >
          <Mail className="w-5 h-5" />
          E-Mail schreiben
        </button>
        <a
          href="https://zeeg.me/larsmacario/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#d1d1d1] text-black hover:bg-[#d1d1d1]/90 rounded-xl p-4 transition-all"
        >
          <Calendar className="w-5 h-5" />
          Termin buchen
        </a>
      </div>

      {/* E-Mail Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">E-Mail App wählen</h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              {emailServices.map((service) => (
                <a
                  key={service.name}
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 hover:bg-white/10 rounded-xl transition-all text-left border border-white/10 hover:border-white/20"
                  onClick={() => setShowEmailModal(false)}
                >
                  <span className="text-2xl">{service.icon}</span>
                  <span className="font-medium">{service.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default function ProjectWizard({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<ProjectData>({
    projectType: '',
    budget: 750, // Start with lowest base price
    timeline: '',
    features: [],
    priority: '',
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    description: '',
    source: '',
    privacyAccepted: false,
    marketingAccepted: false
  })

  const updateData = (updates: Partial<ProjectData>) => {
    setData(prev => {
      const newData = { ...prev, ...updates }
      
      // If projectType is being updated, always set budget to base price
      if (updates.projectType) {
        const selectedType = projectTypes.find(t => t.id === updates.projectType)
        if (selectedType) {
          newData.budget = selectedType.basePrice
        }
      }
      
      return newData
    })
  }

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  const steps = [
    ProjectTypeStep,
    BudgetStep,
    TimelinePriorityStep,
    ProjectDescriptionStep,
    ContactStep,
    SuccessStep
  ]

  const CurrentStepComponent = steps[currentStep]

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#121212]/95 backdrop-blur-sm rounded-3xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Projekt-Konfigurator</h1>
            {currentStep < steps.length - 1 && (
              <p className="text-gray-400">Schritt {currentStep + 1} von {steps.length - 1}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        {currentStep < steps.length - 1 && (
          <div className="px-6 pt-4">
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-[#d1d1d1] to-[#b0b0b0] h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent
                data={data}
                updateData={updateData}
                onNext={nextStep}
                onPrev={prevStep}
                isFirst={currentStep === 0}
                isLast={currentStep === steps.length - 1}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
} 