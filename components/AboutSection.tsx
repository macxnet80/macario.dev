'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Sparkles
} from 'lucide-react'
import TestimonialsSection from './testimonials'

export default function AboutSection() {
  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
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
            Über mich
          </h2>
          <p className="text-xl text-[#e7e7e7] max-w-3xl mx-auto">
            Personal Trainer. Entwickler. Branchenkenner.
            <br />
            Digitale Lösungen für die Fitness-Branche aus eigener Erfahrung
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-1">
              <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden">
                <Image
                  src="/lars.macario.dev - No-Code Pitch.jpg"
                  alt="Lars Macario bei einer Präsentation"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >

            {/* Introduction */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#f6f6f6]">Lars Macario</h3>
              </div>
              
              <p className="text-[#e7e7e7] text-lg leading-relaxed">
                <strong className="text-white">Lars Macario</strong> – Personal Trainer. Entwickler. Branchenkenner.
              </p>
              
              <p className="text-[#e7e7e7] leading-relaxed">
                Mit über <strong className="text-white">10 Jahren Erfahrung</strong> im Personal Training weiß ich genau, 
                wie es sich anfühlt, wenn der Admin-Aufwand das eigentliche Training überschattet.
              </p>

              <p className="text-[#e7e7e7] leading-relaxed">
                Ich habe selbst erlebt:
              </p>
              
              <div className="space-y-2 pl-4">
                <p className="text-[#e7e7e7]">→ Terminabsagen per WhatsApp um 6 Uhr morgens</p>
                <p className="text-[#e7e7e7]">→ Trainingspläne, die im Chat-Verlauf verschwinden</p>
                <p className="text-[#e7e7e7]">→ Excel-Listen, die irgendwann nicht mehr funktionieren</p>
                <p className="text-[#e7e7e7]">→ Den Wunsch, zu skalieren – aber keine Zeit dafür</p>
              </div>

              <p className="text-[#e7e7e7] leading-relaxed mt-4">
                <strong className="text-white">Deshalb habe ich angefangen, eigene Lösungen zu bauen.</strong>
              </p>

              <p className="text-[#e7e7e7] leading-relaxed">
                Heute kombiniere ich meine Erfahrung als Trainer mit modernen 
                No-Code Tools und KI, um digitale Lösungen zu entwickeln, 
                die wirklich zur Fitness-Branche passen.
              </p>

              <p className="text-[#e7e7e7] leading-relaxed">
                Aktuell arbeite ich an meinem eigenen Kunden-Portal mit 
                integriertem Onboarding- und Anamneseprozess – 
                und genau solche Lösungen kann ich auch für dich umsetzen.
              </p>

              <p className="text-[#e7e7e7] leading-relaxed mt-4">
                <strong className="text-white">Standort:</strong> Hamburg<br />
                <strong className="text-white">Erfahrung:</strong> 10+ Jahre Personal Training, 5+ Jahre digitale Lösungen
              </p>
            </div>

          </motion.div>
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection />

      </div>
    </section>
  )
}