'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, CheckCircle, Send } from 'lucide-react'

interface PackageWizardProps {
  onClose: () => void
}

interface WizardData {
  hasWebsite: string
  hasContent: string
  hasBranding: string
  websiteType: string
  features: string[]
  timeline: string
  budget: string
  contactInfo: {
    name: string
    email: string
    company: string
    phone: string
  }
}

export default function PackageWizard({ onClose }: PackageWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])
  const [wizardData, setWizardData] = useState<WizardData>({
    hasWebsite: '',
    hasContent: '',
    hasBranding: '',
    websiteType: '',
    features: [],
    timeline: '',
    budget: '',
    contactInfo: {
      name: '',
      email: '',
      company: '',
      phone: ''
    }
  })

  const questions = [
    {
      id: 'hasWebsite',
      title: 'Haben Sie bereits eine Website?',
      type: 'radio',
      options: [
        { value: 'Ja, aber sie ist veraltet', label: 'Ja, aber sie ist veraltet' },
        { value: 'Ja, aber sehr einfach', label: 'Ja, aber sehr einfach' },
        { value: 'Nein, komplett neu', label: 'Nein, komplett neu' }
      ]
    },
    {
      id: 'hasContent',
      title: 'Haben Sie bereits Inhalte vorbereitet?',
      type: 'radio',
      options: [
        { value: 'Ja, Texte und Bilder sind fertig', label: 'Ja, Texte und Bilder sind fertig' },
        { value: 'Teilweise vorhanden', label: 'Teilweise vorhanden' },
        { value: 'Nein, brauche Unterstützung', label: 'Nein, brauche Unterstützung' }
      ]
    },
    {
      id: 'hasBranding',
      title: 'Haben Sie ein Corporate Design?',
      type: 'radio',
      options: [
        { value: 'Ja, Logo und Farben sind definiert', label: 'Ja, Logo und Farben sind definiert' },
        { value: 'Nur Logo vorhanden', label: 'Nur Logo vorhanden' },
        { value: 'Nein, brauche Unterstützung', label: 'Nein, brauche Unterstützung' }
      ]
    },
    {
      id: 'websiteType',
      title: 'Was für eine Website benötigen Sie?',
      type: 'radio',
      options: [
        { value: 'Visitenkarte (1-3 Seiten)', label: 'Visitenkarte (1-3 Seiten)' },
        { value: 'Firmenwebsite (4-8 Seiten)', label: 'Firmenwebsite (4-8 Seiten)' },
        { value: 'Online-Shop', label: 'Online-Shop' },
        { value: 'Umfangreiche Website (8+ Seiten)', label: 'Umfangreiche Website (8+ Seiten)' }
      ]
    },
    {
      id: 'features',
      title: 'Welche Funktionen sind wichtig?',
      type: 'checkbox',
      options: [
        { value: 'Kontaktformular', label: 'Kontaktformular' },
        { value: 'Online-Terminbuchung', label: 'Online-Terminbuchung' },
        { value: 'Blog/News-Bereich', label: 'Blog/News-Bereich' },
        { value: 'Bildergalerie', label: 'Bildergalerie' },
        { value: 'Google Maps Integration', label: 'Google Maps Integration' },
        { value: 'Social Media Integration', label: 'Social Media Integration' }
      ]
    },
    {
      id: 'timeline',
      title: 'Wann soll die Website online gehen?',
      type: 'radio',
      options: [
        { value: 'So schnell wie möglich', label: 'So schnell wie möglich' },
        { value: 'In 2 Wochen', label: 'In 2 Wochen' },
        { value: 'In 4 Wochen', label: 'In 4 Wochen' },
        { value: 'Bin flexibel', label: 'Bin flexibel' }
      ]
    },
    {
      id: 'contactInfo',
      title: 'Ihre Kontaktdaten',
      type: 'contact'
    }
  ]

  const handleInputChange = (questionId: string, value: string | string[]) => {
    if (questionId === 'features') {
      setWizardData(prev => ({ ...prev, [questionId]: value as string[] }))
    } else if (questionId.startsWith('contact.')) {
      const field = questionId.split('.')[1]
      setWizardData(prev => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [field]: value as string }
      }))
    } else {
      setWizardData(prev => ({ ...prev, [questionId]: value as string }))
    }
  }

  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = wizardData.features
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature]
    handleInputChange('features', newFeatures)
  }

  const canProceed = () => {
    const currentQuestion = questions[currentStep]
    if (currentQuestion.id === 'features') {
      return true // Features are optional
    }
    if (currentQuestion.id === 'contactInfo') {
      return wizardData.contactInfo.name && wizardData.contactInfo.email && wizardData.contactInfo.company
    }
    return wizardData[currentQuestion.id as keyof WizardData] !== ''
  }

  const getRecommendedPackage = () => {
    const { websiteType, features, hasContent, hasBranding } = wizardData
    
    if (websiteType === 'Online-Shop' || websiteType === 'Umfangreiche Website (8+ Seiten)' || features.length > 3) {
      return 'Premium'
    }
    if (websiteType === 'Firmenwebsite (4-8 Seiten)' || features.length > 1 || hasContent === 'Nein, brauche Unterstützung' || hasBranding === 'Nein, brauche Unterstützung') {
      return 'Business'
    }
    return 'Starter'
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const recommendedPackage = getRecommendedPackage()
      
      const submissionData = {
        ...wizardData,
        recommendedPackage,
        source: 'package-wizard',
        timestamp: new Date().toISOString()
      }

      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_PROJEKT_ANFRAGE
      if (!webhookUrl) {
        throw new Error('Webhook-URL nicht konfiguriert')
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Fehler beim Senden')
      }
    } catch (error) {
      console.error('Error submitting wizard:', error)
      alert('Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (isSubmitted) {
    const recommendedPackage = getRecommendedPackage()
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Perfekt!
            </h3>
            
            <p className="text-gray-600 mb-6">
              Basierend auf Ihren Antworten empfehlen wir das <strong>{recommendedPackage}-Paket</strong>. 
              Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
            
            <button
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Schließen
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Website-Paket Finder
            </h2>
            <p className="text-gray-600">
              Schritt {currentStep + 1} von {questions.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {questions[currentStep].title}
            </h3>

            {questions[currentStep].type === 'radio' && (
              <div className="space-y-3">
                {questions[currentStep].options?.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name={questions[currentStep].id}
                      value={option.value}
                      checked={wizardData[questions[currentStep].id as keyof WizardData] === option.value}
                      onChange={(e) => handleInputChange(questions[currentStep].id, e.target.value)}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {questions[currentStep].type === 'checkbox' && (
              <div className="space-y-3">
                {questions[currentStep].options?.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={wizardData.features.includes(option.value)}
                      onChange={() => handleFeatureToggle(option.value)}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {questions[currentStep].type === 'contact' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={wizardData.contactInfo.name}
                    onChange={(e) => handleInputChange('contact.name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Ihr Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    value={wizardData.contactInfo.email}
                    onChange={(e) => handleInputChange('contact.email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="ihre@email.de"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unternehmen *
                  </label>
                  <input
                    type="text"
                    value={wizardData.contactInfo.company}
                    onChange={(e) => handleInputChange('contact.company', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Ihr Unternehmen"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={wizardData.contactInfo.phone}
                    onChange={(e) => handleInputChange('contact.phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Ihre Telefonnummer (optional)"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>

          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Wird gesendet...
              </>
            ) : currentStep === questions.length - 1 ? (
              <>
                <Send className="w-4 h-4" />
                Empfehlung erhalten
              </>
            ) : (
              <>
                Weiter
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
