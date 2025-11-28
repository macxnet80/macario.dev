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
            Leidenschaftlicher No-Code-Entwickler mit der Mission, 
            digitale Innovationen schnell und effizient zu realisieren
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
                Als leidenschaftlicher <strong className="text-white">No-Code-Entwickler</strong> und 
                digitaler Innovator helfe ich Unternehmen dabei, ihre Visionen schnell und 
                kosteneffizient in die Realität umzusetzen.
              </p>
              
              <p className="text-[#e7e7e7] leading-relaxed">
                Mit über <strong className="text-white">5 Jahren Erfahrung</strong> in der 
                digitalen Transformation nutze ich modernste Tools wie Cursor, Supabase, 
                n8n und KI-Technologien, um komplexe Anwendungen ohne traditionelles 
                Coding zu entwickeln.
              </p>

              <p className="text-[#e7e7e7] leading-relaxed">
                Mein Fokus liegt darauf, <strong className="text-white">komplexe Prozesse zu vereinfachen</strong> und 
                Unternehmen dabei zu unterstützen, ihre digitalen Ziele bis zu 80% schneller 
                zu erreichen als mit herkömmlichen Entwicklungsmethoden.
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