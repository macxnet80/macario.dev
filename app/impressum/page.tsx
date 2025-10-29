'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'

export default function Impressum() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Ocean Abyss Background with Top Glow - gleich wie Hero-Bereich */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        {/* Navigation zurück zur Startseite */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
            <Link 
              href="/" 
              className="hover:text-white transition-colors flex items-center gap-2"
              aria-label="Zur Startseite"
            >
              <span>←</span>
              <span>Zurück zur Startseite</span>
            </Link>
          </nav>
        </motion.div>


        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Impressum
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Angaben gemäß § 5 TMG
          </p>
        </motion.div>

        {/* Impressum Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-8 lg:p-12 border border-white/10"
        >
          {/* Kontaktinformationen */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                Kontaktdaten
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-lg">Lars Macario</span>
                  <span className="text-gray-400">No/Low-Code Developer</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <div>Klingenberg 11</div>
                      <div>25451 Quickborn</div>
                      <div>Deutschland</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 text-primary flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Steuernummer:</span>
                      <div>13/143/00291</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <a 
                      href="mailto:lars@macario.dev"
                      className="hover:text-primary transition-colors"
                    >
                      lars@macario.dev
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <a 
                      href="tel:+4917663404901"
                      className="hover:text-primary transition-colors"
                    >
                      +49 176 63404901
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Rechtliche Hinweise */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-xl font-bold text-white mb-4">Rechtliche Hinweise</h3>
              
              <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
                <div>
                  <h4 className="font-semibold text-white mb-2">Haftung für Inhalte</h4>
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                    unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                    Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Haftung für Links</h4>
                  <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                    Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
                    Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Urheberrecht</h4>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                    Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
                    Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </div>

            {/* EU-Streitschlichtung */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-xl font-bold text-white mb-4">EU-Streitschlichtung</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>

            {/* Verbraucherstreitbeilegung */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-xl font-bold text-white mb-4">Verbraucherstreitbeilegung</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-sm">
            <Link 
              href="/impressum" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Impressum
            </Link>
            <Link 
              href="/datenschutz" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Datenschutzerklärung
            </Link>
          </div>
        </motion.div>

      </div>

    </main>
  )
} 