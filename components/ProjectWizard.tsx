'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  Globe, 
  Smartphone, 
  ShoppingCart, 
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
  name: string
  email: string
  company: string
  phone: string
  description: string
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
    id: 'website',
    title: 'Moderne Website',
    description: 'Corporate Website, Portfolio oder Landing Page',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    basePrice: 750,
    features: ['Responsive Design', 'SEO-Optimierung', 'CMS Integration', 'Performance-Optimierung']
  },
  {
    id: 'webapp',
    title: 'Web-Anwendung',
    description: 'SaaS-Platform oder komplexe Web-App',
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
    basePrice: 3500,
    features: ['User Authentication', 'Dashboard', 'Database Integration', 'API Development']
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    description: 'Online-Shop mit Zahlungsintegration',
    icon: ShoppingCart,
    color: 'from-green-500 to-emerald-500',
    basePrice: 2500,
    features: ['Produktkatalog', 'Warenkorb', 'Zahlungsabwicklung', 'Bestellverwaltung']
  },
  {
    id: 'automation',
    title: 'Automatisierung',
    description: 'Workflow-Automatisierung mit KI',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    basePrice: 750,
    features: ['Workflow Design', 'API Integrationen', 'Datenverarbeitung', 'Monitoring']
  },
  {
    id: 'ai',
    title: 'KI-Integration',
    description: 'Chatbots oder KI-gestützte Features',
    icon: Bot,
    color: 'from-indigo-500 to-purple-500',
    basePrice: 1500,
    features: ['OpenAI Integration', 'Custom Training', 'Chat Interface', 'Smart Analytics']
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
  { id: 'speed', label: 'Schnelle Umsetzung', icon: Zap },
  { id: 'quality', label: 'Höchste Qualität', icon: Star },
  { id: 'budget', label: 'Kostenoptimiert', icon: Euro },
  { id: 'features', label: 'Maximale Features', icon: Sparkles }
]

// Step 1: Project Type Selection
function ProjectTypeStep({ data, updateData, onNext }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Welche Art von Projekt planst du?</h2>
        <p className="text-gray-300">Wähle den Projekttyp, der am besten zu deiner Vision passt</p>
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
                ? 'border-primary bg-primary/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${type.color} p-3 mb-4`}>
              <type.icon className="w-full h-full text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{type.description}</p>
            <div className="text-primary font-medium">ab {type.basePrice}€</div>
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
  const maxBudget = minBudget * 5

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Was ist dein Budget?</h2>
        <p className="text-gray-300">Bewege den Slider um dein gewünschtes Budget festzulegen</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-primary mb-2">
              {data.budget.toLocaleString('de-DE')}€
            </div>
            <div className="text-gray-400">Geschätztes Projektbudget</div>
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
          
          <div className="flex justify-between text-sm text-gray-400 mt-2">
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
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary rounded-xl hover:bg-primary/90 transition-all"
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
        <p className="text-gray-300">Wann soll das Projekt fertig sein und was ist dir wichtig?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Timeline */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Gewünschte Timeline
          </h3>
          <div className="space-y-3">
            {timelineOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => updateData({ timeline: option.id })}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  data.timeline === option.id
                    ? 'border-primary bg-primary/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{option.label}</span>
                  {option.multiplier !== 1.0 && (
                    <span className={`text-sm px-2 py-1 rounded ${
                      option.multiplier > 1 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
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
            <Star className="w-5 h-5 text-primary" />
            Was ist dir wichtig?
          </h3>
          <div className="space-y-3">
            {priorityOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => updateData({ priority: option.id })}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  data.priority === option.id
                    ? 'border-primary bg-primary/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <option.icon className="w-5 h-5 text-primary" />
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
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
        <h2 className="text-3xl font-bold mb-4">Erzähl uns mehr über dein Projekt</h2>
        <p className="text-gray-300">Je detaillierter deine Beschreibung, desto besser können wir dir helfen</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Quick Info Summary */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Dein Projekt bisher
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Typ:</span>
              <span className="ml-2">{selectedType?.title}</span>
            </div>
            <div>
              <span className="text-gray-400">Budget:</span>
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
              className="w-full bg-white/10 border border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/50 resize-none text-base"
              placeholder="Beschreibe dein Projekt so detailliert wie möglich:

• Was ist das Ziel deines Projekts?
• Wer ist deine Zielgruppe?
• Welche Funktionen sind dir wichtig?
• Hast du schon konkrete Vorstellungen?
• Gibt es Referenzen oder Inspirationen?"
            />
            <div className="text-right text-sm text-gray-400 mt-2">
              {data.description.length} Zeichen
            </div>
          </div>

          {/* Inspiration Examples */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              Beispiele für gute Beschreibungen:
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• "Ich möchte eine Buchungsplattform für Yogastudios mit Kalenderintegration und Zahlungsabwicklung"</p>
              <p>• "Ein Dashboard für mein E-Commerce Business mit Verkaufsstatistiken und Kundenanalyse"</p>
              <p>• "Eine Community-Plattform für Fotografen zum Teilen von Portfolios und Networking"</p>
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
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

  const handleSubmit = async () => {
    if (!data.name || !data.email) return
    
    setIsSubmitting(true)
    try {
      await fetch('/api/submit-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, finalPrice, aiAnalysis })
      })
      onNext() // Go to success step
    } catch (error) {
      console.error('Fehler beim Senden:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Fast geschafft!</h2>
        <p className="text-gray-300">Lass uns deine Kontaktdaten erfassen und eine KI-Analyse erstellen</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Project Summary */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-4">Projekt-Zusammenfassung</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Projekttyp:</span>
              <span>{selectedType?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Budget:</span>
              <span>{data.budget.toLocaleString('de-DE')}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Timeline:</span>
              <span>{timelineOption?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Priorität:</span>
              <span>{priorityOptions.find(p => p.id === data.priority)?.label}</span>
            </div>
            {data.description && (
              <div className="pt-3 border-t border-white/10">
                <span className="text-gray-400 block mb-2">Projektbeschreibung:</span>
                <p className="text-gray-300 text-xs leading-relaxed bg-white/5 rounded-lg p-3 max-h-20 overflow-y-auto">
                  {data.description}
                </p>
              </div>
            )}
            <div className="border-t border-white/10 pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Geschätzter Preis:</span>
                <span className="text-primary">{finalPrice.toLocaleString('de-DE')}€</span>
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
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => updateData({ name: e.target.value })}
                className="w-full bg-white/10 border border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Dein vollständiger Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">E-Mail *</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => updateData({ email: e.target.value })}
                className="w-full bg-white/10 border border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="deine@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unternehmen</label>
              <input
                type="text"
                value={data.company}
                onChange={(e) => updateData({ company: e.target.value })}
                className="w-full bg-white/10 border border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Dein Unternehmen (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefon</label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
                className="w-full bg-white/10 border border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="+49 123 456789 (optional)"
              />
            </div>

          </div>
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
                          <p className="text-gray-300 leading-relaxed">{greeting}</p>
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
          disabled={!data.name || !data.email || isSubmitting}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
  const [showEmailOptions, setShowEmailOptions] = useState(false)
  
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
        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-green-400" />
      </motion.div>
      
      <h2 className="text-3xl font-bold mb-4">Perfekt! 🎉</h2>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Deine Projektanfrage wurde erfolgreich übermittelt. Ich melde mich innerhalb von 24 Stunden bei dir mit einer detaillierten Analyse und dem nächsten Schritt.
      </p>
      
      <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="relative">
          <button
            onClick={() => setShowEmailOptions(!showEmailOptions)}
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-all"
          >
            <Mail className="w-5 h-5" />
            E-Mail schreiben
            <ChevronDown className={`w-4 h-4 transition-transform ${showEmailOptions ? 'rotate-180' : ''}`} />
          </button>
          
          {showEmailOptions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-xl p-2 z-10"
            >
              {emailServices.map((service) => (
                <a
                  key={service.name}
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-3 hover:bg-white/10 rounded-lg transition-all text-left"
                  onClick={() => setShowEmailOptions(false)}
                >
                  <span className="text-xl">{service.icon}</span>
                  <span className="text-sm">{service.name}</span>
                </a>
              ))}
            </motion.div>
          )}
        </div>
        <a
          href="https://calendly.com/lars_macario/online-meeting"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 rounded-xl p-4 transition-all"
        >
          <Calendar className="w-5 h-5" />
          Termin buchen
        </a>
        <a
          href="https://wa.me/4917663404901"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 rounded-xl p-4 transition-all"
        >
          <MessageSquare className="w-5 h-5" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function ProjectWizard({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<ProjectData>({
    projectType: '',
    budget: 2000,
    timeline: '',
    features: [],
    priority: '',
    name: '',
    email: '',
    company: '',
    phone: '',
    description: ''
  })

  const updateData = (updates: Partial<ProjectData>) => {
    setData(prev => ({ ...prev, ...updates }))
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
        className="bg-background/95 backdrop-blur-sm rounded-3xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Projekt-Konfigurator</h1>
            <p className="text-gray-400">Schritt {currentStep + 1} von {steps.length - 1}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

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