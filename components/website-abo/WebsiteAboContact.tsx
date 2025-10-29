'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'

export default function WebsiteAboContact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    package: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const industries = [
    'Handwerk (Elektro, Sanitär, etc.)',
    'Gastronomie & Hotellerie',
    'Gesundheitswesen (Praxis, Apotheke)',
    'Dienstleistung (Friseur, Kosmetik)',
    'Beratung & Coaching',
    'Einzelhandel',
    'Immobilien',
    'Sonstiges'
  ]

  const packages = [
    'Starter (299€ + 29€/Monat)',
    'Business (499€ + 49€/Monat)',
    'Premium (799€ + 79€/Monat)',
    'Noch unsicher - Beratung gewünscht'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send data to webhook
      const webhookResponse = await fetch('https://auto.macario.dev/webhook/125bf416-5a16-46dc-bda5-43a6dd202d4d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'website-abo-landingpage',
          timestamp: new Date().toISOString()
        }),
      })

      // Also save to Supabase as backup
      const supabaseResponse = await fetch('/api/website-abo-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (webhookResponse.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          industry: '',
          package: '',
          message: ''
        })
      } else {
        throw new Error('Fehler beim Senden an Webhook')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="contact-section" className="py-16 sm:py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-green-200 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vielen Dank für Ihre Anfrage!
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden bei Ihnen. 
              In der Zwischenzeit können Sie uns auch direkt kontaktieren.
            </p>

            <div className="flex justify-center">
              <a
                href="mailto:abo@macario.dev"
                className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                E-Mail schreiben
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Phone className="w-4 h-4" />
                Kostenlose Beratung
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Lassen Sie uns
                <span className="block text-blue-600">sprechen</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Erzählen Sie uns von Ihrem Unternehmen und wir finden gemeinsam 
                die perfekte Website-Lösung für Sie.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">E-Mail</div>
                  <a href="mailto:lars@macario.dev" className="text-green-600 hover:text-green-700">
                    lars@macario.dev
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Standort</div>
                  <div className="text-gray-600">Quickborn bei Hamburg</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Antwortzeit</div>
                  <div className="text-gray-600">Innerhalb von 24 Stunden</div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">Projekte</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">7</div>
                  <div className="text-sm text-gray-600">Tage Live</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">4.9★</div>
                  <div className="text-sm text-gray-600">Bewertung</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Ihr Name"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Unternehmen *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Ihr Unternehmen"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="ihre@email.de"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Ihre Telefonnummer"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                  Branche *
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white"
                  style={{
                    colorScheme: 'light'
                  }}
                >
                  <option value="" style={{ backgroundColor: 'white', color: '#111827' }}>Bitte wählen</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry} style={{ backgroundColor: 'white', color: '#111827' }}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-2">
                  Gewünschtes Paket
                </label>
                <select
                  id="package"
                  name="package"
                  value={formData.package}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white"
                  style={{
                    colorScheme: 'light'
                  }}
                >
                  <option value="" style={{ backgroundColor: 'white', color: '#111827' }}>Bitte wählen</option>
                  {packages.map(pkg => (
                    <option key={pkg} value={pkg} style={{ backgroundColor: 'white', color: '#111827' }}>{pkg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-gray-900 placeholder-gray-500"
                  placeholder="Erzählen Sie uns von Ihrem Projekt..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Kostenlose Beratung anfragen
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                * Pflichtfelder. Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
