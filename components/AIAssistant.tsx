'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Loader2, Sparkles, X, MessageSquare } from 'lucide-react'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [ideaCount, setIdeaCount] = useState(0)
  const [showContact, setShowContact] = useState(false)

  const generateIdea = async () => {
    if (!input.trim()) return

    if (ideaCount >= 3) {
      setShowContact(true)
      return
    }

    setIsLoading(true)
    setResponse('')

    // Simuliere KI-Antwort (in einer echten App würde hier die OpenAI API aufgerufen)
    setTimeout(() => {
      const ideas = [
        `Basierend auf "${input}" könnte ich dir eine ${getRandomApp()} mit ${getRandomFeature()} entwickeln. Die Umsetzung würde etwa ${getRandomTime()} dauern.`,
        `Für "${input}" empfehle ich eine Lösung mit ${getRandomTool()}. Wir könnten ${getRandomFeature()} integrieren und das Ganze in ${getRandomTime()} fertigstellen.`,
        `Interessante Idee! Für "${input}" würde sich eine ${getRandomApp()} anbieten. Mit ${getRandomTool()} können wir ${getRandomFeature()} umsetzen.`
      ]
      
      setResponse(ideas[Math.floor(Math.random() * ideas.length)])
      setIsLoading(false)
      setIdeaCount((c) => c + 1)
    }, 2000)
  }

  const getRandomApp = () => {
    const apps = ['Mobile App', 'Web-Applikation', 'Automatisierung', 'Dashboard', 'Portal']
    return apps[Math.floor(Math.random() * apps.length)]
  }

  const getRandomFeature = () => {
    const features = [
      'KI-gestützter Analyse',
      'Echtzeit-Synchronisation',
      'automatisierten Workflows',
      'benutzerfreundlichem Interface',
      'intelligenter Datenverarbeitung'
    ]
    return features[Math.floor(Math.random() * features.length)]
  }

  const getRandomTool = () => {
    const tools = ['Glide', 'Softr', 'Make.com', 'Bubble', 'Zapier']
    return tools[Math.floor(Math.random() * tools.length)]
  }

  const getRandomTime = () => {
    const times = ['2-3 Wochen', '1-2 Wochen', '3-4 Wochen', '4-6 Wochen']
    return times[Math.floor(Math.random() * times.length)]
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center group"
          >
            <Brain className="w-8 h-8 text-white" />
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                KI-Ideen Generator
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] glass rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg p-2">
                  <Brain className="w-full h-full text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">KI-Ideen Generator</h3>
                  <p className="text-xs text-white/80">Powered by AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[500px] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-300 mb-4">
                    Beschreibe deine Geschäftsidee und ich zeige dir, wie wir sie mit No/Low-Code umsetzen können.
                  </p>
                  
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="z.B. Ich möchte eine App für Restaurants..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 min-h-[100px] outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm"
                  />
                </div>

                <button
                  onClick={generateIdea}
                  disabled={isLoading || !input.trim() || showContact}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      KI denkt nach...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Idee generieren
                    </>
                  )}
                </button>

                {showContact ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20 text-center"
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
                    className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Mein Vorschlag:</h4>
                        <p className="text-gray-300 text-sm">{response}</p>
                        <button 
                          onClick={() => setIsOpen(false)}
                          className="mt-3 text-primary hover:text-primary/80 font-medium text-xs"
                        >
                          Lass uns darüber sprechen →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 