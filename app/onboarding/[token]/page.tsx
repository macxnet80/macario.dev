'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CustomerOnboardingWizard from '@/components/CustomerOnboardingWizard'

interface SessionData {
  id: string
  token: string
  customerName: string
  customerEmail: string
  company?: string
  customerGender: 'herr' | 'frau' | 'divers' | 'keine_angabe'
  projectReference?: string
  projectScope: string
  contractType: string
  paymentTerms: string
  plannedStart?: string
  personalMessage?: string
  addressStyle: 'du' | 'sie'
  projectBriefing?: string
  techStack: string[]
  projectDeadline?: string
  status: string
}

export default function OnboardingPage() {
  const params = useParams()
  const router = useRouter()
  const token = params?.token as string

  const [session, setSession] = useState<SessionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showWizard, setShowWizard] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    if (!token) {
      setError('Ungültiger Link')
      setIsLoading(false)
      return
    }

    loadSession()
  }, [token])

  const loadSession = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/onboarding-session/${token}`)

      if (!response.ok) {
        if (response.status === 404) {
          setError('Onboarding-Link nicht gefunden')
        } else if (response.status === 410) {
          setError('Dieses Onboarding wurde bereits abgeschlossen')
        } else {
          setError('Fehler beim Laden der Daten')
        }
        setIsLoading(false)
        return
      }

      const data = await response.json()
      if (data.success && data.session) {
        setSession(data.session)
      } else {
        setError('Fehler beim Laden der Session')
      }
    } catch (error) {
      console.error('Error loading session:', error)
      setError('Verbindungsfehler')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Lade Onboarding-Daten...</p>
        </div>
      </div>
    )
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Fehler</h2>
          <p className="text-gray-300 text-lg mb-8">{error || 'Session nicht gefunden'}</p>
          <Button 
            onClick={() => router.push('/')} 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
          >
            Zur Startseite
          </Button>
        </div>
      </div>
    )
  }

  if (showWizard) {
    return (
      <CustomerOnboardingWizard 
        initialData={{
          projectReference: session.projectReference,
          projectScope: session.projectScope,
          contractType: session.contractType,
          paymentTerms: session.paymentTerms,
          plannedStart: session.plannedStart,
          agreedDeadline: session.projectDeadline
        }}
        sessionToken={token}
        addressStyle={session.addressStyle}
      />
    )
  }

  const getGreeting = () => {
    if (session.personalMessage) {
      const lines = session.personalMessage.split('\n')
      return {
        title: lines[0] || '',
        message: lines.slice(1).join('\n')
      }
    }
    
    if (session.addressStyle === 'du') {
      return {
        title: `Hallo ${session.customerName}! 👋`,
        message: ''
      }
    }
    
    const lastName = session.customerName.split(' ').slice(-1)[0]
    let title = ''
    switch (session.customerGender) {
      case 'herr':
        title = `Sehr geehrter Herr ${lastName}! 👋`
        break
      case 'frau':
        title = `Sehr geehrte Frau ${lastName}! 👋`
        break
      case 'divers':
        title = `Sehr geehrte*r ${session.customerName}! 👋`
        break
      default:
        title = 'Sehr geehrte Damen und Herren! 👋'
    }
    
    return { title, message: '' }
  }

  const greeting = getGreeting()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Links: Begrüßung */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center md:text-left"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {greeting.title}
                </h1>

                {greeting.message && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed whitespace-pre-line"
                  >
                    {greeting.message}
                  </motion.p>
                )}

                {!session.personalMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
                  >
                    Bitte {session.addressStyle === 'du' ? 'fülle' : 'füllen Sie'} das nachfolgende Formular aus, 
                    um mir alle wichtigen Informationen für einen reibungslosen Projektstart zu geben.
                  </motion.p>
                )}

                {/* Start Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8"
                >
                  <Button
                    onClick={() => {
                      setShowWelcome(false)
                      setTimeout(() => setShowWizard(true), 500)
                    }}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-xl font-semibold rounded-full shadow-2xl hover:scale-105 transition-transform"
                  >
                    Onboarding starten
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                  <p className="text-gray-400 text-sm mt-6">
                    Das Ausfüllen dauert etwa 10-15 Minuten
                  </p>
                </motion.div>
              </motion.div>

              {/* Rechts: TechStack und Briefing */}
              {(session.techStack?.length > 0 || session.projectBriefing || session.projectDeadline) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-8"
                >
                  {/* TechStack mit Überschrift */}
                  {session.techStack && session.techStack.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-white text-left">
                        Geplante Technologien
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {session.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Projektbriefing - linksbündig */}
                  {session.projectBriefing && (
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-white text-left">
                        Projektbriefing
                      </h3>
                      <div className="text-base md:text-lg text-gray-300 leading-relaxed whitespace-pre-line text-left">
                        {session.projectBriefing}
                      </div>
                    </div>
                  )}
                  
                  {/* Deadline */}
                  {session.projectDeadline && (
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-bold text-white text-left">
                        Projekt-Deadline
                      </h3>
                      <p className="text-lg md:text-xl text-gray-300 text-left">
                        {new Date(session.projectDeadline).toLocaleDateString('de-DE', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
