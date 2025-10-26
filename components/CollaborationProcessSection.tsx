'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Rocket, CheckCircle, Clock, Users, Target, TrendingUp } from 'lucide-react'

export default function CollaborationProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Kostenloses Beratungsgespräch',
      description: 'Wir besprechen deine Idee, Ziele und Anforderungen in einem unverbindlichen 30-Minuten Call.',
      icon: MessageCircle,
      details: [
        'Analyse deiner Geschäftsidee',
        'Technische Machbarkeit prüfen',
        'Zeitrahmen und Budget besprechen',
        'Konkrete Lösungsskizze erstellen'
      ],
      duration: '30 Min',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      number: '02',
      title: 'Projektplanung & Konzept',
      description: 'Ich erstelle ein detailliertes Konzept mit Wireframes, Technologie-Stack und Meilensteinen.',
      icon: Target,
      details: [
        'Detaillierte Projektstruktur',
        'UI/UX Wireframes erstellen',
        'Technologie-Stack definieren',
        'Zeitplan und Meilensteine festlegen'
      ],
      duration: '1-2 Tage',
      color: 'from-purple-500 to-pink-400'
    },
    {
      number: '03',
      title: 'Umsetzung & Launch',
      description: 'Deine Website/App wird entwickelt, getestet und live geschaltet - transparent und in regelmäßigen Updates.',
      icon: Rocket,
      details: [
        'Entwicklung in Sprints',
        'Regelmäßige Updates & Feedback',
        'Testing & Optimierung',
        'Live-Schaltung & Einweisung'
      ],
      duration: 'Ø 2 Wochen',
      color: 'from-green-500 to-emerald-400'
    }
  ]

  const benefits = [
     {
       icon: TrendingUp,
       title: 'Schnelle Umsetzung',
       description: 'Dein Projekt ist in Ø 2 Wochen live'
     },
    {
      icon: Users,
      title: 'Persönliche Betreuung',
      description: 'Direkter Kontakt und regelmäßige Updates'
    },
    {
      icon: CheckCircle,
      title: 'Transparente Abrechnung',
      description: 'Feste Preise, keine versteckten Kosten'
    }
  ]

  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Von der Idee zur Live-Website
          </h2>
          <p className="text-xl text-[#e7e7e7] max-w-3xl mx-auto">
            Mein bewährter 3-Schritte-Prozess bringt dein Projekt schnell und transparent zum Erfolg
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-12 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-8 top-24 w-px h-32 bg-gradient-to-b from-white/20 to-transparent z-0" />
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Step Number & Icon */}
                <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 relative z-10`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-6xl font-bold text-white/10 lg:text-8xl">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-10">
                  <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="text-[#e7e7e7] text-lg">
                          {step.description}
                        </p>
                      </div>
                       <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full whitespace-nowrap">
                         <Clock className="w-4 h-4 text-[#e7e7e7]" />
                         <span className="text-[#e7e7e7] font-medium">{step.duration}</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-[#e7e7e7]">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            Warum dieser Prozess funktioniert
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-400 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-[#e7e7e7]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
