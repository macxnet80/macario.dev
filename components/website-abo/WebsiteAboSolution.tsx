'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Zap, Shield, Target, Smartphone, Search, Headphones } from 'lucide-react'

export default function WebsiteAboSolution() {
  const benefits = [
    {
      icon: Zap,
      title: 'Individuell & Maßgeschneidert',
      description: 'Keine Templates oder Baukästen. Jede Website wird speziell für Ihr Unternehmen entwickelt.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Komplett-Service ohne Sorgen',
      description: 'Website, Hosting, Domain, Wartung, Updates und Sicherheit – alles aus einer Hand.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Abo-Modell statt hohe Kosten',
      description: 'Niedrige monatliche Kosten statt 5.000€+ Einmalzahlung. Planbare Ausgaben für Ihr Budget.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Search,
      title: 'Lokal optimiert & sichtbar',
      description: 'SEO für lokale Suche inklusive. Ihre Kunden finden Sie bei Google Maps und lokalen Suchanfragen.',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const features = [
    'Responsive Design für alle Geräte',
    'Schnelle Ladezeiten',
    'Suchmaschinenoptimierung (SEO)',
    'Kontaktformulare',
    'Google Maps Integration',
    'SSL-Verschlüsselung',
    'Regelmäßige Backups',
    'DSGVO-konform'
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Die Lösung für Ihr Unternehmen
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Website im Abo –
            <span className="block text-green-600">einfach, sicher, professionell</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stellen Sie sich vor: In nur 7 Tagen haben Sie eine professionelle Website, 
            die automatisch gewartet wird und Ihnen neue Kunden bringt.
          </p>
        </motion.div>

        {/* Main Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${benefit.color} text-white shadow-lg`}>
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              So einfach funktioniert's
            </h3>
            <p className="text-lg text-gray-600">
              Von der Anfrage bis zur fertigen Website in nur 3 Schritten
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Kostenlose Beratung',
                description: 'Wir besprechen Ihre Wünsche und finden das passende Paket für Ihr Unternehmen.',
                color: 'bg-blue-500'
              },
              {
                step: '2',
                title: 'Website-Entwicklung',
                description: 'Wir erstellen Ihre individuelle Website und halten Sie über jeden Schritt auf dem Laufenden.',
                color: 'bg-green-500'
              },
              {
                step: '3',
                title: 'Live & Wartungsfrei',
                description: 'Ihre Website geht online und wird automatisch gewartet. Sie können sich auf Ihr Geschäft konzentrieren.',
                color: 'bg-purple-500'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg`}>
                  {step.step}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Alles inklusive – keine versteckten Kosten
            </h3>
            <p className="text-lg text-gray-300">
              Diese Features sind in jedem Paket enthalten
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
