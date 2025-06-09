'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  options?: string[]
}

interface ChatInterfaceProps {
  onComplete?: () => void
}

export default function ChatInterface({ onComplete }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hallo! 👋 Ich bin Lars\' digitaler Assistent. Schön, dass du hier bist! Was möchtest du über Lars und seine No/Low-Code Services erfahren?',
      sender: 'bot',
      options: ['Was kann Lars?', 'Zeig mir Projekte', 'Wie arbeitet Lars?', 'Kontakt aufnehmen']
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleOptionClick = (option: string) => {
    handleSendMessage(option)
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user'
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(text)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase()
    
    if (lowerInput.includes('was kann') || lowerInput.includes('fähigkeiten')) {
      return {
        id: Date.now().toString(),
        content: 'Lars ist spezialisiert auf No/Low-Code Entwicklung! 🚀\n\n• Glide Apps für mobile Lösungen\n• Softr für Web-Applikationen\n• Make.com für Automatisierungen\n• Bubble für komplexe Web-Apps\n• KI-Integration mit ChatGPT & Co.\n\nAlles ohne traditionelles Coding, aber mit professionellen Ergebnissen!',
        sender: 'bot',
        options: ['Zeig mir Beispiele', 'Was kostet das?', 'Wie lange dauert ein Projekt?']
      }
    }
    
    if (lowerInput.includes('projekt') || lowerInput.includes('beispiel')) {
      return {
        id: Date.now().toString(),
        content: 'Hier sind einige spannende Projekte, die Lars umgesetzt hat:\n\n📱 **Fitness-Tracker App** - Mit Glide entwickelt\n🤖 **KI-Chatbot für Kundenservice** - OpenAI Integration\n📊 **Dashboard für Vertriebsteam** - Softr + Airtable\n⚡ **Automatisierte Rechnungsstellung** - Make.com Workflow',
        sender: 'bot',
        options: ['Mehr Details', 'Andere Projekte', 'Lass uns starten!']
      }
    }
    
    if (lowerInput.includes('arbeitet') || lowerInput.includes('prozess')) {
      return {
        id: Date.now().toString(),
        content: 'So arbeitet Lars:\n\n1️⃣ **Kostenloses Erstgespräch** - Wir besprechen deine Idee\n2️⃣ **Konzept & Prototyp** - Schnelle erste Version\n3️⃣ **Iterative Entwicklung** - Gemeinsam zum perfekten Ergebnis\n4️⃣ **Launch & Support** - Ich begleite dich auch nach dem Go-Live\n\nAlles transparent, agil und kundenorientiert!',
        sender: 'bot',
        options: ['Kontakt aufnehmen', 'Preise erfahren', 'Zurück zum Start']
      }
    }
    
    if (lowerInput.includes('kontakt') || lowerInput.includes('starten')) {
      return {
        id: Date.now().toString(),
        content: 'Super, lass uns loslegen! 🎯\n\nDu kannst Lars direkt kontaktieren oder einen Termin für ein kostenloses Erstgespräch buchen.\n\nWas passt dir besser?',
        sender: 'bot',
        options: ['Termin buchen', 'E-Mail schreiben', 'WhatsApp Nachricht']
      }
    }

    if (lowerInput.includes('preis') || lowerInput.includes('kostet')) {
      return {
        id: Date.now().toString(),
        content: 'Die Preise richten sich nach Projektumfang:\n\n💡 **Kleine Apps/Automatisierungen**: ab 500€\n📱 **Mobile Apps**: ab 1.500€\n🌐 **Web-Applikationen**: ab 2.500€\n🤖 **KI-Integrationen**: individuell\n\nAlle Preise transparent und fair. Keine versteckten Kosten!',
        sender: 'bot',
        options: ['Kostenloses Erstgespräch', 'Beispielprojekte', 'Kontakt']
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      content: 'Interessante Frage! Lass mich dir mehr über Lars\' No/Low-Code Services erzählen. Was interessiert dich besonders?',
      sender: 'bot',
      options: ['Services', 'Projekte', 'Über Lars', 'Kontakt']
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] glass rounded-2xl flex flex-col">
      {/* Chat Header */}
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          Interaktiver Assistent
        </h3>
        <p className="text-sm text-gray-400 mt-1">Entdecke meine Services im Dialog</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "flex gap-3",
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              )}
              
              <div className={cn(
                "max-w-[70%] rounded-2xl p-4",
                message.sender === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-white/10 backdrop-blur-sm'
              )}>
                <p className="whitespace-pre-line">{message.content}</p>
                
                {message.options && (
                  <div className="mt-3 space-y-2">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="block w-full text-left px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-secondary" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/10">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Stelle eine Frage..."
            className="flex-1 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white rounded-full p-3 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
} 