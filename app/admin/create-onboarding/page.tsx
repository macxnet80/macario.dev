'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  User,
  Mail,
  Building,
  FileText,
  Calendar,
  Euro,
  MessageSquare,
  Copy,
  Check,
  Send,
  Settings,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface OnboardingFormData {
  customerName: string
  customerEmail: string
  company: string
  customerGender: 'herr' | 'frau' | 'divers' | 'keine_angabe'
  projectReference: string
  projectScope: string
  contractType: string
  paymentTerms: string
  plannedStart: string
  personalMessage: string
  addressStyle: 'du' | 'sie'
  // Neue Projektbriefing-Felder
  projectBriefing: string
  techStack: string[]
  projectDeadline: string
}

export default function CreateOnboardingPage() {
  const [formData, setFormData] = useState<OnboardingFormData>({
    customerName: '',
    customerEmail: '',
    company: '',
    customerGender: 'keine_angabe',
    projectReference: '',
    projectScope: '',
    contractType: '',
    paymentTerms: '7 Tage',
    plannedStart: '',
    personalMessage: '',
    addressStyle: 'sie',
    // Neue Felder
    projectBriefing: '',
    techStack: [],
    projectDeadline: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')
  const [linkCopied, setLinkCopied] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [isOptimizingBriefing, setIsOptimizingBriefing] = useState(false)
  const [customTechInput, setCustomTechInput] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/me')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    }
  }

  const projectScopes = [
    'Neue Website erstellen',
    'Website-Redesign',
    'Web-Anwendung entwickeln',
    'AI Voice Agent',
    'Landing Page',
    'Blog/CMS System',
    'Automatisierung/Integration',
    'KI-Integration',
    'Website-Wartung',
    'SEO-Optimierung'
  ]

  const contractTypes = [
    'Einmaliges Projekt',
    'Laufende Betreuung',
    'Wartungsvertrag',
    'Beratung'
  ]

  const paymentTermsOptions = [
    'Bereits bezahlt',
    'Vorauszahlung',
    '50/50 Vorauszahlung und bei Projektabgabe',
    '7 Tage'
  ]

  const techStackOptions = [
    'Next.js',
    'React',
    'Svelte',
    'Webflow',
    'Framer',
    'Supabase',
    'Vercel',
    'Tailwind CSS',
    'Shadcn/ui',
    'Framer Motion',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'Stripe',
    'n8n',
    'OpenAI API',
    'Cursor AI',
    'GitHub',
    'Figma'
  ]

  const handleInputChange = (field: keyof OnboardingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTechStackChange = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }))
  }

  const addCustomTech = () => {
    const trimmed = customTechInput.trim()
    if (trimmed && !formData.techStack.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, trimmed]
      }))
      setCustomTechInput('')
    }
  }

  const removeTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }))
  }

  const optimizeBriefing = async () => {
    if (!formData.projectBriefing.trim()) {
      alert('Bitte geben Sie zuerst ein Projektbriefing ein.')
      return
    }

    setIsOptimizingBriefing(true)

    try {
      const response = await fetch('/api/admin/optimize-briefing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          briefing: formData.projectBriefing,
          projectScope: formData.projectScope,
          techStack: formData.techStack,
          customerName: formData.customerName,
          company: formData.company,
          addressStyle: formData.addressStyle
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setFormData(prev => ({
          ...prev,
          projectBriefing: data.optimizedBriefing
        }))
      } else {
        alert(data.message || 'Fehler bei der KI-Optimierung')
      }
    } catch (error) {
      console.error('Error optimizing briefing:', error)
      alert('Verbindungsfehler bei der KI-Optimierung')
    } finally {
      setIsOptimizingBriefing(false)
    }
  }

  const generatePersonalMessage = () => {
    const addressForm = formData.addressStyle === 'du' ? 'Du' : 'Sie'
    const verb = formData.addressStyle === 'du' ? 'hast' : 'haben'
    const pronoun = formData.addressStyle === 'du' ? 'dich' : 'sich'
    const possessive = formData.addressStyle === 'du' ? 'dein' : 'Ihr'
    
    // Geschlechts-spezifische Anrede
    let greeting = ''
    if (formData.addressStyle === 'du') {
      greeting = `Hallo ${formData.customerName}! 👋`
    } else {
      const lastName = formData.customerName.split(' ').slice(-1)[0] || formData.customerName
      switch (formData.customerGender) {
        case 'herr':
          greeting = `Sehr geehrter Herr ${lastName}! 👋`
          break
        case 'frau':
          greeting = `Sehr geehrte Frau ${lastName}! 👋`
          break
        case 'divers':
          greeting = `Sehr geehrte*r ${formData.customerName}! 👋`
          break
        default:
          greeting = `Sehr geehrte Damen und Herren! 👋`
          break
      }
    }
    
    return `${greeting}

Schön, dass ${addressForm} ${pronoun} für mein ${formData.projectScope}-Projekt entschieden ${verb}. 

Ich freue mich auf die Zusammenarbeit und möchte sicherstellen, dass ich alle wichtigen Informationen für einen reibungslosen Projektstart habe.

Das Ausfüllen dauert etwa 10-15 Minuten und hilft mir dabei, ${possessive} Projekt optimal vorzubereiten.

Beste Grüße,
Lars Macario`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/onboarding-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          personalMessage: formData.personalMessage || generatePersonalMessage(),
          projectBriefing: formData.projectBriefing,
          techStack: formData.techStack,
          projectDeadline: formData.projectDeadline
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setGeneratedLink(data.onboardingUrl)
      } else {
        // Detaillierte Fehlermeldung anzeigen
        let errorMessage = data.message || 'Fehler beim Erstellen der Onboarding-Session'
        
        if (data.error === 'SUPABASE_NOT_CONFIGURED' || data.error === 'SUPABASE_SERVICE_ROLE_KEY_MISSING') {
          errorMessage = `Datenbank nicht konfiguriert!\n\nBitte überprüfen Sie:\n- NEXT_PUBLIC_SUPABASE_URL\n- SUPABASE_SERVICE_ROLE_KEY\n\nDiese Variablen müssen in .env.local gesetzt sein.`
        } else if (data.error === 'SUPABASE_ERROR') {
          errorMessage = data.message || 'Fehler beim Erstellen der Session'
          if (data.details?.message) {
            errorMessage += `\n\nDetails: ${data.details.message}`
          }
        }
        
        alert(errorMessage)
      }
    } catch (error) {
      console.error('Error creating session:', error)
      alert('Verbindungsfehler. Bitte versuchen Sie es erneut.\n\nFalls das Problem weiterhin besteht, überprüfen Sie die Supabase-Konfiguration.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const sendEmail = async () => {
    // TODO: Implementiere E-Mail-Versand
    alert('E-Mail-Versand wird in einer zukünftigen Version implementiert.')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Lädt...</div>
      </div>
    )
  }

  if (generatedLink) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  ✅ Onboarding-Link erstellt!
                </CardTitle>
                <p className="text-gray-400">
                  Der personalisierte Onboarding-Link für {formData.customerName} wurde erfolgreich generiert.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Onboarding-Link
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={generatedLink}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                    />
                    <Button
                      onClick={copyLink}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="text-blue-300 font-medium mb-2">Nächste Schritte:</h3>
                  <ul className="text-blue-200 text-sm space-y-1">
                    <li>• Link an {formData.customerName} senden</li>
                    <li>• Kunde füllt Onboarding-Formular aus</li>
                    <li>• Daten werden automatisch an Webhook gesendet</li>
                    <li>• Projekt kann starten! 🚀</li>
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={sendEmail}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    E-Mail senden
                  </Button>
                  <Button
                    onClick={() => router.push('/admin/dashboard')}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Zum Dashboard
                  </Button>
                </div>

                <Button
                  onClick={() => {
                    setGeneratedLink('')
                    setCustomTechInput('')
                    setFormData({
                      customerName: '',
                      customerEmail: '',
                      company: '',
                      customerGender: 'keine_angabe',
                      projectReference: '',
                      projectScope: '',
                      contractType: '',
                      paymentTerms: '7 Tage',
                      plannedStart: '',
                      personalMessage: '',
                      addressStyle: 'sie',
                      projectBriefing: '',
                      techStack: [],
                      projectDeadline: ''
                    })
                  }}
                  variant="ghost"
                  className="w-full text-gray-400 hover:text-white"
                >
                  Weiteres Onboarding erstellen
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            onClick={() => router.push('/admin/dashboard')}
            variant="ghost"
            className="text-gray-400 hover:text-white mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">Neues Onboarding erstellen</h1>
            <p className="text-gray-400">Personalisierte Onboarding-Session für einen Kunden</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hauptformular */}
            <div className="lg:col-span-2 space-y-6">
              {/* Kundendaten */}
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Kundendaten
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Erste Zeile: Anrede | Anrede-Stil */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Anrede
                      </label>
                      <Select value={formData.customerGender} onValueChange={(value) => handleInputChange('customerGender', value)}>
                        <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white py-3">
                          <SelectValue placeholder="Anrede wählen..." />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="herr" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">Herr</SelectItem>
                          <SelectItem value="frau" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">Frau</SelectItem>
                          <SelectItem value="divers" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">Divers</SelectItem>
                          <SelectItem value="keine_angabe" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">Keine Angabe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Anrede-Stil *
                      </label>
                      <Select 
                        value={formData.addressStyle} 
                        onValueChange={(value: 'du' | 'sie') => handleInputChange('addressStyle', value)}
                      >
                        <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white py-3">
                          <SelectValue placeholder="Anrede wählen" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="sie" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">Sie (förmlich)</SelectItem>
                          <SelectItem value="du" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">Du (persönlich)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Zweite Zeile: Name | E-Mail */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Kundenname *
                      </label>
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Max Mustermann"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        E-Mail-Adresse *
                      </label>
                      <input
                        type="email"
                        value={formData.customerEmail}
                        onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="max@beispiel.de"
                        required
                      />
                    </div>
                  </div>

                  {/* Dritte Zeile: Firma (volle Breite) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Firma (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Beispiel GmbH"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Projektdaten */}
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Projektdaten
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Projektreferenz
                      </label>
                      <input
                        type="text"
                        value={formData.projectReference}
                        onChange={(e) => handleInputChange('projectReference', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="PRJ-2024-001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Projektumfang *
                      </label>
                      <Select 
                        value={formData.projectScope} 
                        onValueChange={(value) => handleInputChange('projectScope', value)}
                      >
                        <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white py-3">
                          <SelectValue placeholder="Projektumfang auswählen" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {projectScopes.map((scope) => (
                            <SelectItem key={scope} value={scope} className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">{scope}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Vertragsart *
                      </label>
                      <Select 
                        value={formData.contractType} 
                        onValueChange={(value) => handleInputChange('contractType', value)}
                      >
                        <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white py-3">
                          <SelectValue placeholder="Vertragsart auswählen" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {contractTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Zahlungsziel
                      </label>
                      <Select 
                        value={formData.paymentTerms} 
                        onValueChange={(value) => handleInputChange('paymentTerms', value)}
                      >
                        <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white py-3">
                          <SelectValue placeholder="Zahlungsziel auswählen" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {paymentTermsOptions.map((term) => (
                            <SelectItem key={term} value={term} className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">{term}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Geplanter Projektstart
                      </label>
                      <input
                        type="date"
                        value={formData.plannedStart}
                        onChange={(e) => handleInputChange('plannedStart', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Projekt-Deadline
                      </label>
                      <input
                        type="date"
                        value={formData.projectDeadline}
                        onChange={(e) => handleInputChange('projectDeadline', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Techstack */}
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Techstack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Geplante Technologien (mehrfach auswählbar)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {techStackOptions.map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => handleTechStackChange(tech)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            formData.techStack.includes(tech)
                              ? 'bg-primary text-white'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                    {formData.techStack.length > 0 && (
                      <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Ausgewählte Technologien:</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-primary/20 text-primary rounded text-xs flex items-center gap-1"
                            >
                              {tech}
                              <button
                                type="button"
                                onClick={() => removeTech(tech)}
                                className="ml-1 hover:text-red-400 transition-colors"
                                title="Entfernen"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Individuelles Tool hinzufügen */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Individuelles Tool hinzufügen
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customTechInput}
                          onChange={(e) => setCustomTechInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addCustomTech()
                            }
                          }}
                          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="z.B. Custom Tool, Spezialsoftware, etc."
                        />
                        <Button
                          type="button"
                          onClick={addCustomTech}
                          disabled={!customTechInput.trim() || formData.techStack.includes(customTechInput.trim())}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Tool eingeben und Enter drücken oder Button klicken
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Projektbriefing */}
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Projektbriefing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Detaillierte Projektbeschreibung
                    </label>
                    <textarea
                      value={formData.projectBriefing}
                      onChange={(e) => handleInputChange('projectBriefing', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={6}
                      placeholder="Beschreiben Sie das Projekt im Detail: Ziele, Anforderungen, gewünschte Features, Zielgruppe, Design-Vorstellungen, etc."
                    />
                  </div>
                  <div className="flex items-center space-x-3 mt-4">
                    <Button
                      type="button"
                      onClick={optimizeBriefing}
                      disabled={isOptimizingBriefing || !formData.projectBriefing.trim()}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {isOptimizingBriefing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          KI optimiert...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Mit KI optimieren
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-gray-400">
                      Die KI verbessert Struktur, Klarheit und Vollständigkeit des Briefings
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Persönliche Nachricht */}
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Persönliche Nachricht
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Begrüßungstext (optional - wird automatisch generiert)
                    </label>
                    <textarea
                      value={formData.personalMessage}
                      onChange={(e) => handleInputChange('personalMessage', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={6}
                      placeholder="Wird automatisch basierend auf den Projektdaten generiert..."
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleInputChange('personalMessage', generatePersonalMessage())}
                    variant="outline"
                    className="mt-2 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Automatisch generieren
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Vorschau */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Vorschau</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <h3 className="text-white font-medium mb-2">Kunde</h3>
                    <p className="text-gray-300 text-sm">
                      {formData.customerName || 'Name eingeben...'}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formData.customerEmail || 'E-Mail eingeben...'}
                    </p>
                    {formData.company && (
                      <p className="text-gray-400 text-xs">{formData.company}</p>
                    )}
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <h3 className="text-white font-medium mb-2">Projekt</h3>
                    <p className="text-gray-300 text-sm">
                      {formData.projectScope || 'Projektumfang wählen...'}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formData.contractType || 'Vertragsart wählen...'}
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <h3 className="text-white font-medium mb-2">Anrede</h3>
                    <p className="text-gray-300 text-sm">
                      {formData.addressStyle === 'du' ? 'Du (persönlich)' : 'Sie (förmlich)'}
                    </p>
                    {formData.customerGender !== 'keine_angabe' && (
                      <p className="text-gray-400 text-xs mt-1">
                        {formData.customerGender === 'herr' && 'Herr'}
                        {formData.customerGender === 'frau' && 'Frau'}
                        {formData.customerGender === 'divers' && 'Divers'}
                      </p>
                    )}
                  </div>

                  {formData.techStack.length > 0 && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-white font-medium mb-2">Techstack</h3>
                      <div className="flex flex-wrap gap-1">
                        {formData.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-primary/20 text-primary rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {formData.techStack.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{formData.techStack.length - 3} weitere
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {formData.projectDeadline && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-white font-medium mb-2">Deadline</h3>
                      <p className="text-gray-300 text-sm">
                        {new Date(formData.projectDeadline).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading || !formData.customerName || !formData.customerEmail || !formData.projectScope || !formData.contractType}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? 'Erstelle Link...' : 'Onboarding-Link erstellen'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
