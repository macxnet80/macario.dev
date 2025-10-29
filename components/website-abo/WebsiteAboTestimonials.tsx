'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

export default function WebsiteAboTestimonials() {
  const testimonials = [
    {
      name: 'Michael Weber',
      company: 'Weber Elektrotechnik GmbH',
      location: 'Hamburg',
      text: 'Endlich eine professionelle Website ohne den ganzen Stress! Das Abo-Modell passt perfekt zu unserem Budget und wir müssen uns um nichts kümmern. Seitdem bekommen wir deutlich mehr Anfragen.',
      rating: 5,
      avatar: 'MW',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Sandra Müller',
      company: 'Friseur Salon Müller',
      location: 'Bremen',
      text: 'Als kleiner Salon war eine teure Website einfach nicht drin. Mit dem Website-Abo haben wir jetzt eine wunderschöne Seite mit Online-Terminbuchung. Unsere Kunden lieben es!',
      rating: 5,
      avatar: 'SM',
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Thomas Schneider',
      company: 'Schneider Heizung & Sanitär',
      location: 'Lübeck',
      text: 'Ich bin Handwerker, kein IT-Experte. Hier bekomme ich alles aus einer Hand - von der Website bis zur Wartung. Kann ich jedem Kollegen nur empfehlen. Top Service!',
      rating: 5,
      avatar: 'TS',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Zufriedene Kunden
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Das sagen unsere
            <span className="block text-blue-600">Kunden</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Echte Erfahrungen von lokalen Unternehmen und Handwerkern, 
            die bereits von ihrer neuen Website profitieren.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-300" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 leading-relaxed mb-8 relative z-10">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.company}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-8 sm:p-12 border border-blue-100"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-lg font-semibold text-gray-900">
                Zufriedene Kunden
              </div>
              <div className="text-gray-600">
                Lokale Unternehmen vertrauen uns
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-4xl font-bold text-green-600">7</div>
              <div className="text-lg font-semibold text-gray-900">
                Tage bis Live
              </div>
              <div className="text-gray-600">
                Durchschnittliche Projektdauer
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-4xl font-bold text-purple-600">4.9/5</div>
              <div className="text-lg font-semibold text-gray-900">
                Kundenbewertung
              </div>
              <div className="text-gray-600">
                Basierend auf echten Bewertungen
              </div>
            </div>
          </div>
        </motion.div>

        {/* Local Focus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Speziell für Norddeutschland
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Wir verstehen die Bedürfnisse lokaler Unternehmen in Hamburg, Bremen, 
              Schleswig-Holstein und Niedersachsen. Persönlicher Service, 
              regionale Optimierung und direkter Draht zu Ihrem Ansprechpartner.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
