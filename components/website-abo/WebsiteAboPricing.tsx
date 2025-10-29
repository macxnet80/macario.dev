'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, ArrowRight, Zap, HelpCircle } from 'lucide-react'
import PackageWizard from './PackageWizard'

export default function WebsiteAboPricing() {
  const [showWizard, setShowWizard] = useState(false)
  
  const packages = [
    {
      name: 'Starter',
      subtitle: 'Perfekt für kleine Unternehmen',
      setupPrice: '299',
      monthlyPrice: '29',
      popular: false,
      color: 'from-blue-500 to-cyan-500',
      features: [
        '1-3 Seiten Website',
        'Responsive Design',
        'Kontaktformular',
        'Google Maps Integration',
        'SSL-Verschlüsselung',
        'Hosting & Domain inklusive',
        'Basis SEO-Optimierung',
        'E-Mail Support'
      ],
      ideal: 'Ideal für: Handwerker, kleine Dienstleister, Praxen'
    },
    {
      name: 'Business',
      subtitle: 'Für wachsende Unternehmen',
      setupPrice: '499',
      monthlyPrice: '49',
      popular: true,
      color: 'from-green-500 to-emerald-500',
      features: [
        '4-8 Seiten Website',
        'Blog-System',
        'Erweiterte SEO-Optimierung',
        'Google Analytics Integration',
        'Social Media Integration',
        'Newsletter-Anmeldung',
        'Terminbuchung-System',
        'Prioritäts-Support'
      ],
      ideal: 'Ideal für: Mittelständische Unternehmen, Agenturen, Berater'
    },
    {
      name: 'Premium',
      subtitle: 'Maximale Funktionalität',
      setupPrice: '799',
      monthlyPrice: '79',
      popular: false,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Unbegrenzte Seiten',
        'Online-Shop Integration',
        'Erweiterte Funktionen',
        'Multi-Language Support',
        'API-Integrationen',
        'Custom Features',
        'Monatliche Optimierung',
        'Persönlicher Ansprechpartner'
      ],
      ideal: 'Ideal für: E-Commerce, größere Unternehmen, komplexe Anforderungen'
    }
  ]

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact-section')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="pricing-section" className="py-16 sm:py-24 bg-gray-50">
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
            <Star className="w-4 h-4" />
            Transparente Preise
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Wählen Sie Ihr
            <span className="block text-green-600">Website-Paket</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Faire Preise ohne versteckte Kosten. Alle Pakete beinhalten Hosting, Domain und Wartung.
          </p>
          
          {/* Package Finder Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <button
              onClick={() => setShowWizard(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <HelpCircle className="w-6 h-6" />
              Welches Paket passt zu mir?
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Kostenloser Paket-Finder in nur 2 Minuten
            </p>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16 pt-4">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                    ⭐ Beliebteste Wahl
                  </div>
                </div>
              )}

              <div className={`bg-white rounded-3xl shadow-xl border-2 ${
                pkg.popular ? 'border-green-500 transform scale-105' : 'border-gray-100'
              } h-full relative ${pkg.popular ? 'mt-3' : ''}`}>

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${pkg.color} mx-auto mb-4 flex items-center justify-center`}>
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {pkg.subtitle}
                  </p>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-500">Einrichtung:</span>
                      <span className="text-3xl font-bold text-gray-900">
                        {pkg.setupPrice}€
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-500">Monatlich:</span>
                      <span className="text-4xl font-bold text-gray-900">
                        {pkg.monthlyPrice}€
                      </span>
                      <span className="text-gray-500">/Monat</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.05) }}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Ideal for */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-8">
                  <p className="text-sm text-gray-600 font-medium">
                    {pkg.ideal}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={scrollToContact}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 group ${
                    pkg.popular
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  Paket wählen
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">
                Keine Vertragsbindung
              </h4>
              <p className="text-gray-600">
                Monatlich kündbar. Sie gehen kein Risiko ein.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">
                30 Tage Geld-zurück
              </h4>
              <p className="text-gray-600">
                Nicht zufrieden? Geld zurück, ohne Wenn und Aber.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">
                Live in 7 Tagen
              </h4>
              <p className="text-gray-600">
                Ihre Website ist schneller online als Sie denken.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-4">
            Haben Sie Fragen zu den Paketen?
          </p>
          <button
            onClick={() => {
              const faqSection = document.querySelector('#faq-section')
              faqSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 hover:underline-offset-2 transition-all duration-300"
          >
            Häufige Fragen ansehen →
          </button>
        </motion.div>
      </div>

      {/* Package Wizard Modal */}
      {showWizard && (
        <PackageWizard onClose={() => setShowWizard(false)} />
      )}
    </section>
  )
}
