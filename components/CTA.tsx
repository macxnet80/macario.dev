'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Mail, ArrowRight, Copy, Check } from 'lucide-react'
import ProjectWizard from './ProjectWizard'

export default function CTA() {
  const [showWizard, setShowWizard] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)

  const handleEmailClick = () => {
    setShowEmailModal(true)
  }

  const openEmailProvider = (provider: string) => {
    const email = 'lars.macario@gmail.com'
    const subject = 'Projektanfrage von macario.dev'
    const body = `Hallo Lars,

Ich interessiere mich für ein Projekt und würde gerne mehr erfahren.

Meine Projektidee:


Viele Grüße`

    let url = ''
    
    switch (provider) {
      case 'gmail':
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        break
      case 'outlook':
        url = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        break
      case 'apple':
        url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        break
      default:
        // Fallback mailto
        url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
    
    window.open(url, '_blank')
    setShowEmailModal(false)
  }

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('lars.macario@gmail.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (error) {
      console.error('Clipboard nicht verfügbar')
    }
  }

  const contactOptions = [
    {
      icon: Calendar,
      title: 'Kostenloses Erstgespräch',
      description: 'Intelligenter Projekt-Konfigurator',
      action: () => setShowWizard(true),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'E-Mail schreiben',
      description: 'Direkt Kontakt aufnehmen',
      action: handleEmailClick,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section id="cta-section" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden bg-[#121212] border border-white/10"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20" />
          
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Dein Projekt starten
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-[#e7e7e7] mb-12 max-w-3xl mx-auto"
            >
              Bereit, deine Idee in die Realität umzusetzen? 
              Wähle den Weg, der am besten zu dir passt.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
              {contactOptions.map((option, index) => {
                // Telegram wurde entfernt - nur noch 2 Optionen verfügbar
                return (
                <motion.button
                  key={option.title}
                  onClick={option.action}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  className="group bg-[#121212] rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-[#1a1a1a] hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 ease-out text-left w-full"
                >
                  <motion.div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${option.color} p-3 mb-4 mx-auto`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                  >
                    <option.icon className="w-full h-full text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-center">{option.title}</h3>
                  <p className="text-[#e7e7e7] text-sm mb-4 text-center">{option.description}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-primary group-hover:gap-3 transition-all duration-300 ease-out">
                    <span className="text-sm font-medium">Projekt besprechen</span>
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.button>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-[#e7e7e7]"
            >
              <p>
                Keine Lust auf Formulare? Kein Problem! 
                <br />
                Schreib mir einfach eine kurze Nachricht und erzähl mir von deinem Projekt.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Email Provider Selection Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">E-Mail schreiben</h3>
              <p className="text-[#e7e7e7] mb-6">
                Wähle deinen bevorzugten E-Mail-Anbieter oder kopiere die Adresse:
              </p>
              
              <div className="space-y-3 mb-6">
                {/* Gmail */}
                <button
                  onClick={() => openEmailProvider('gmail')}
                  className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-4 transition-colors group"
                >
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">Gmail</span>
                  <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Outlook */}
                <button
                  onClick={() => openEmailProvider('outlook')}
                  className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-4 transition-colors group"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">Outlook</span>
                  <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Apple Mail */}
                <button
                  onClick={() => openEmailProvider('apple')}
                  className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-4 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">Apple Mail</span>
                  <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </button>

                {/* E-Mail kopieren */}
                <button
                  onClick={copyEmailToClipboard}
                  className="w-full flex items-center gap-3 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/30 rounded-lg p-4 transition-colors group"
                >
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    {emailCopied ? (
                      <Check className="w-4 h-4 text-black" />
                    ) : (
                      <Copy className="w-4 h-4 text-black" />
                    )}
                  </div>
                  <span className="font-medium text-primary">
                    {emailCopied ? 'E-Mail kopiert!' : 'E-Mail-Adresse kopieren'}
                  </span>
                  {!emailCopied && <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform text-primary" />}
                </button>
              </div>
              
              <button
                onClick={() => setShowEmailModal(false)}
                className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Project Wizard Modal */}
      {showWizard && (
        <ProjectWizard onClose={() => setShowWizard(false)} />
      )}
    </section>
  )
} 