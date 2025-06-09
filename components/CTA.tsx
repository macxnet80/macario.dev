'use client'

import { motion } from 'framer-motion'
import { Calendar, Mail, MessageCircle, ArrowRight } from 'lucide-react'

export default function CTA() {
  const contactOptions = [
    {
      icon: Calendar,
      title: 'Termin buchen',
      description: 'Kostenloses Erstgespräch vereinbaren',
      action: 'https://calendly.com/your-link',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'E-Mail schreiben',
      description: 'Direkt Kontakt aufnehmen',
      action: 'mailto:hello@example.com',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Schnell und unkompliziert',
      action: 'https://wa.me/your-number',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
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
              Lass uns gemeinsam loslegen!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              Bereit, deine Idee in die Realität umzusetzen? 
              Wähle den Weg, der am besten zu dir passt.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {contactOptions.map((option, index) => (
                <motion.a
                  key={option.title}
                  href={option.action}
                  target={option.action.startsWith('http') ? '_blank' : undefined}
                  rel={option.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${option.color} p-3 mb-4 mx-auto`}>
                    <option.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{option.description}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Jetzt starten</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-gray-400"
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
    </section>
  )
} 