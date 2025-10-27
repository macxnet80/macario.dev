'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-8xl lg:text-9xl font-bold text-primary mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Seite nicht gefunden
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Die gesuchte Seite existiert leider nicht oder wurde verschoben.
          </p>
          <p className="text-gray-400">
            Aber keine Sorge - ich helfe dir gerne weiter!
          </p>
        </motion.div>

        {/* Navigation Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all glow group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Zur Startseite
          </Link>
          
          <Link
            href="/#contact"
            className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all border border-white/20 group"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Projekt anfragen
          </Link>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">Oder besuche eine dieser Seiten:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/#skills" className="text-primary hover:text-primary/80 transition-colors">
              Technologien
            </Link>
            <Link href="/#projects" className="text-primary hover:text-primary/80 transition-colors">
              Projekte
            </Link>
            <Link href="/#about" className="text-primary hover:text-primary/80 transition-colors">
              Über mich
            </Link>
            <Link href="/impressum" className="text-primary hover:text-primary/80 transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-primary hover:text-primary/80 transition-colors">
              Datenschutz
            </Link>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <p className="text-gray-400 text-sm">
            Brauchst du Hilfe? Schreib mir eine E-Mail an{' '}
            <a 
              href="mailto:lars.macario@gmail.com" 
              className="text-primary hover:underline"
            >
              lars.macario@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
