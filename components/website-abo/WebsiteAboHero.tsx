'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react'

export default function WebsiteAboHero() {
  const [showContactForm, setShowContactForm] = useState(false)

  const scrollToPricing = () => {
    const pricingSection = document.querySelector('#pricing-section')
    pricingSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact-section')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Für lokale Unternehmen & Handwerker
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Ihre professionelle Website
                <span className="block text-blue-600">ohne Sorgen,</span>
                <span className="block text-green-600">ohne Risiko</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Individuelle Website, Hosting, Domain und Wartung – alles aus einer Hand. 
                Keine hohen Einmalkosten, keine technischen Sorgen. 
                <span className="font-semibold text-gray-900"> Einfach professionell online sein.</span>
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                'Individuelle Website (keine Templates)',
                'Hosting & Domain inklusive',
                'Wartung & Updates automatisch',
                'Lokale SEO-Optimierung'
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={scrollToContact}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Phone className="w-5 h-5" />
                Kostenlose Beratung
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={scrollToPricing}
                className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Pakete ansehen
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-6 pt-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Keine Vertragsbindung</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>30 Tage Geld-zurück</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                {/* Mockup Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-600 flex-1">
                    www.ihr-unternehmen.de
                  </div>
                </div>

                {/* Mockup Content */}
                <div className="space-y-4">
                  <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="bg-green-100 rounded-lg p-4 text-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
                      <div className="h-2 bg-green-300 rounded w-3/4 mx-auto"></div>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-4 text-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                      <div className="h-2 bg-blue-300 rounded w-3/4 mx-auto"></div>
                    </div>
                  </div>
                  
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>

                {/* Mobile Responsive Indicator */}
                <div className="flex justify-center pt-4">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 text-sm text-gray-600">
                    <div className="w-4 h-6 bg-gray-400 rounded-sm"></div>
                    <div className="w-6 h-4 bg-gray-400 rounded-sm"></div>
                    <span>Mobile optimiert</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              ✓ Live in 7 Tagen
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              ✓ Wartungsfrei
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
