'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Euro, Wrench, Smartphone } from 'lucide-react'

export default function WebsiteAboProblem() {
  const problems = [
    {
      icon: Clock,
      title: 'Keine Zeit für Website-Erstellung',
      description: 'Als Handwerker oder Unternehmer haben Sie wichtigere Dinge zu tun, als sich wochenlang mit Website-Technik zu beschäftigen.',
      color: 'text-red-500'
    },
    {
      icon: Euro,
      title: 'Hohe Einmalkosten schrecken ab',
      description: '3.000€ - 8.000€ für eine professionelle Website? Das ist für viele kleine Unternehmen einfach nicht drin.',
      color: 'text-orange-500'
    },
    {
      icon: Wrench,
      title: 'Technische Komplexität',
      description: 'Hosting, Updates, Sicherheit, Backups – wer soll das alles verstehen und verwalten?',
      color: 'text-yellow-500'
    },
    {
      icon: Smartphone,
      title: 'Veraltete oder fehlende Online-Präsenz',
      description: 'Ihre Konkurrenz ist online sichtbar, während potentielle Kunden Sie nicht finden können.',
      color: 'text-blue-500'
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            Das Problem kennen Sie
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Warum haben Sie noch keine 
            <span className="block text-red-600">professionelle Website?</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sie wissen, dass eine Website wichtig ist. Aber irgendwas hält Sie zurück. 
            Kommt Ihnen das bekannt vor?
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-white shadow-sm ${problem.color}`}>
                  <problem.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emotional Impact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 sm:p-12 border border-red-100"
        >
          <div className="text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Das Ergebnis?
            </h3>
            
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <span className="font-semibold text-red-600">Ihre Konkurrenz</span> wird online gefunden, 
                während Sie unsichtbar bleiben.
              </p>
              <p>
                <span className="font-semibold text-red-600">Potentielle Kunden</span> suchen nach Ihren Dienstleistungen – 
                finden aber andere Anbieter.
              </p>
              <p>
                <span className="font-semibold text-red-600">Ihr Geschäft</span> wächst langsamer, 
                weil Sie nicht die Reichweite haben, die Sie verdienen.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-red-200 max-w-2xl mx-auto">
              <p className="text-xl font-bold text-red-700 mb-2">
                Die harte Wahrheit:
              </p>
              <p className="text-lg text-gray-800">
                Ohne professionelle Online-Präsenz verlieren Sie jeden Tag potentielle Kunden 
                an Mitbewerber, die digital besser aufgestellt sind.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Transition to Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-semibold">
            ✓ Aber es gibt eine einfache Lösung
          </div>
        </motion.div>
      </div>
    </section>
  )
}
