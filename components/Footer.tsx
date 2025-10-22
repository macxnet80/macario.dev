import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Links */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link 
                href="/impressum"
                className="text-[#e7e7e7] hover:text-primary transition-colors text-sm"
              >
                Impressum
              </Link>
              <Link 
                href="/datenschutz"
                className="text-[#e7e7e7] hover:text-primary transition-colors text-sm"
              >
                Datenschutz
              </Link>
            </motion.div>
          </div>

          {/* Mitte - Logo/Name */}
          <div className="lg:col-span-1 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold text-[#f6f6f6] mb-2">Lars Macario</h3>
              <p className="text-[#e7e7e7] text-sm">No/Low-Code Developer</p>
            </motion.div>
          </div>

          {/* Rechts - Copyright */}
          <div className="lg:col-span-1 lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-[#e7e7e7] text-sm">
                © {new Date().getFullYear()} Lars Macario. Alle Rechte vorbehalten.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Trennlinie */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-t border-white/10 mt-8 pt-8"
        >
          <div className="text-center">
            <p className="text-[#e7e7e7] text-xs">
              Erstellt mit ❤️ und modernen No/Low-Code Tools
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 