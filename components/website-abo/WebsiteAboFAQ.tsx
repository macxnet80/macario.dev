'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'

export default function WebsiteAboFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]) // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqs = [
    {
      question: 'Wie funktioniert das Abo-Modell genau?',
      answer: 'Sie zahlen einmalig die Einrichtungsgebühr für die Erstellung Ihrer Website und danach monatlich für Hosting, Wartung und Support. Im Gegensatz zu hohen Einmalkosten (3.000-8.000€) haben Sie planbare, niedrige monatliche Ausgaben. Sie können jederzeit monatlich kündigen.'
    },
    {
      question: 'Was passiert, wenn ich kündige?',
      answer: 'Bei einer Kündigung erhalten Sie alle Inhalte Ihrer Website (Texte, Bilder, etc.) zur freien Verfügung. Die Website selbst bleibt noch 30 Tage online, damit Sie genug Zeit haben, sie woanders zu hosten. Wir unterstützen Sie gerne beim Umzug.'
    },
    {
      question: 'Sind wirklich alle Kosten im Preis enthalten?',
      answer: 'Ja, absolut! Hosting, Domain (.de oder .com), SSL-Zertifikat, regelmäßige Backups, Updates, Sicherheitsüberwachung und Support sind komplett inklusive. Es gibt keine versteckten Kosten oder Zusatzgebühren.'
    },
    {
      question: 'Wie lange dauert es, bis meine Website online ist?',
      answer: 'In der Regel ist Ihre Website innerhalb von 7 Werktagen online. Bei komplexeren Projekten (Premium-Paket) kann es bis zu 14 Tage dauern. Sie erhalten regelmäßige Updates über den Fortschritt und können jederzeit Feedback geben.'
    },
    {
      question: 'Kann ich Änderungen an meiner Website vornehmen lassen?',
      answer: 'Ja! Kleinere Änderungen (Texte, Bilder, Kontaktdaten) sind im monatlichen Preis enthalten. Größere Änderungen oder neue Funktionen werden nach Aufwand berechnet. Wir besprechen das immer vorher mit Ihnen.'
    },
    {
      question: 'Bekomme ich auch eine E-Mail-Adresse mit meiner Domain?',
      answer: 'Ja, bei allen Paketen sind bis zu 5 E-Mail-Adressen mit Ihrer Domain inklusive (z.B. info@ihr-unternehmen.de). Diese können Sie mit jedem E-Mail-Programm oder über Webmail nutzen.'
    },
    {
      question: 'Ist meine Website für Google optimiert?',
      answer: 'Absolut! Alle Websites werden grundlegend für Suchmaschinen optimiert. Das Business- und Premium-Paket beinhalten erweiterte SEO-Maßnahmen und lokale Optimierung, damit Sie bei Google Maps und lokalen Suchanfragen gefunden werden.'
    },
    {
      question: 'Was ist, wenn ich technische Probleme habe?',
      answer: 'Wir kümmern uns um alle technischen Aspekte! Bei Problemen erreichen Sie uns per E-Mail oder Telefon. Business- und Premium-Kunden haben Prioritäts-Support. Die meisten Probleme lösen wir innerhalb weniger Stunden.'
    },
    {
      question: 'Kann ich meine bestehende Domain verwenden?',
      answer: 'Ja, gerne! Wenn Sie bereits eine Domain besitzen, können wir diese kostenlos zu uns umziehen oder einfach darauf verweisen. Der Umzug ist unkompliziert und wir helfen Ihnen dabei.'
    },
    {
      question: 'Ist das Abo-Modell wirklich günstiger?',
      answer: 'Definitiv! Eine vergleichbare Website kostet normalerweise 3.000-8.000€ einmalig plus 200-500€ jährlich für Hosting und Wartung. Mit unserem Abo-Modell sparen Sie die hohen Anfangskosten und haben nach 2-3 Jahren bereits Geld gespart.'
    }
  ]

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Häufige Fragen
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Alles was Sie
            <span className="block text-blue-600">wissen müssen</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Transparente Antworten auf die wichtigsten Fragen zum Website-Abo
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 sm:px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <Minus className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Noch Fragen?
            </h3>
            <p className="text-gray-600 mb-6">
              Wir beantworten gerne alle Ihre Fragen in einem kostenlosen Beratungsgespräch.
            </p>
            <button
              onClick={() => {
                const contactSection = document.querySelector('#contact-section')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300"
            >
              Kostenlose Beratung vereinbaren
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
