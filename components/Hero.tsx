'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const scrollToSkills = () => {
    const skillsSection = document.querySelector('#skills-section')
    skillsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen bg-background flex items-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Verfügbar für neue Projekte
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-gray-300 text-lg">
              Hallo! Ich bin <span className="text-primary font-semibold">Lars</span>
            </p>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl lg:text-6xl font-bold text-white leading-tight"
          >
            Ich baue{' '}
            <span className="gradient-text">moderne Lösungen</span>{' '}
            ohne Code, mit{' '}
            <span className="relative">
              Köpfchen
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-primary/30 -z-10 transform -rotate-1 rounded" />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-lg"
          >
            Von der einfachen Website bis zur komplexen Web-Anwendung – ich 
            verwandle deine Vision mit{' '}
            <span className="text-primary font-medium">Cursor, Supabase und Vercel</span>{' '}
            in digitale Realität.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToSkills}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-medium transition-all glow"
          >
            <Sparkles className="w-5 h-5" />
            Entdecke meine Lösungen
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Right Content - Avatar & Features */}
        <div className="relative">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto relative">
              {/* Avatar Image */}
              <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/avatar.png"
                  alt="Lars - No/Low-Code Developer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Code symbol decoration */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">&lt;/&gt;</span>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 grid grid-cols-2 gap-4"
          >
            <div className="glass rounded-2xl p-4 border border-white/10">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mb-3 border border-green-500/30">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Schnell</h3>
              <p className="text-sm text-gray-300">Durchschnitt 3 Wochen von Idee zu Live-Website</p>
            </div>

            <div className="glass rounded-2xl p-4 border border-white/10">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mb-3 border border-purple-500/30">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Skalierbar</h3>
              <p className="text-sm text-gray-300">Moderne Architektur für Wachstum</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToSkills}
          className="cursor-pointer"
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  )
} 