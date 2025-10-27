'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, FileText } from 'lucide-react'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects - gleich wie Hero-Bereich */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Breadcrumb items={[{ label: 'Datenschutzerklärung' }]} />
        </motion.div>

        {/* Navigation zurück */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Zurück zur Startseite
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Datenschutzerklärung
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Informationen zum Umgang mit Ihren personenbezogenen Daten
          </p>
        </motion.div>

        {/* Datenschutz Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Überblick */}
          <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              Überblick
            </h2>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Der Schutz Ihrer persönlichen Daten ist mir ein besonderes Anliegen. In dieser Datenschutzerklärung 
                informiere ich Sie über die Verarbeitung personenbezogener Daten bei der Nutzung dieser Website.
              </p>
              <p>
                Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>
          </div>

          {/* Verantwortlicher */}
          <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              Verantwortlicher
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <div>
                <p className="font-semibold text-white">Lars Macario</p>
                <p>Klingenberg 11</p>
                <p>25451 Quickborn</p>
                <p>Deutschland</p>
                <p className="mt-2">
                  E-Mail: <a href="mailto:lars.macario@gmail.com" className="text-primary hover:underline">lars.macario@gmail.com</a>
                </p>
                <p>
                  Telefon: <a href="tel:+4917663404901" className="text-primary hover:underline">+49 176 63404901</a>
                </p>
              </div>
            </div>
          </div>

          {/* Datenerfassung */}
          <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                <Eye className="w-5 h-5 text-blue-400" />
              </div>
              Datenerfassung auf dieser Website
            </h2>
            
            <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-white mb-3">Server-Log-Dateien</h3>
                <p className="mb-3">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in Server-Log-Dateien, 
                  die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="mt-3">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. 
                  Die Daten werden nach einer statistischen Auswertung gelöscht.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Projektanfrage-Formular</h3>
                <p className="mb-3">
                  Wenn Sie über unser Projektanfrage-Formular eine Anfrage stellen, werden folgende Daten erfasst und verarbeitet:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Name und E-Mail-Adresse (erforderlich)</li>
                  <li>Unternehmen und Telefonnummer (optional)</li>
                  <li>Projektbeschreibung und gewünschte Features</li>
                  <li>Budget und Timeline-Angaben</li>
                  <li>Prioritäten und Projekttyp</li>
                </ul>
                <p>
                  Diese Daten werden zur Bearbeitung Ihrer Projektanfrage und für den Fall von Anschlussfragen 
                  bei uns gespeichert. Die Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>
            </div>
          </div>

          {/* Hosting */}
          <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              Hosting und Content Delivery Networks (CDN)
            </h2>
            
            <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-white mb-3">Vercel</h3>
                <p className="mb-3">
                  Diese Website wird auf Servern von Vercel gehostet. Anbieter ist die Vercel Inc., 
                  340 S Lemon Ave #4133, Walnut, CA 91789, USA.
                </p>
                <p className="mb-3">
                  Vercel erfasst in sog. Logfiles folgende Daten, die Ihr Browser übermittelt:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>IP-Adresse</li>
                  <li>Referrer URL</li>
                  <li>Datum und Uhrzeit der Anfrage</li>
                  <li>Zeitzonendifferenz zur Greenwich Mean Time</li>
                  <li>Inhalt der Anforderung</li>
                  <li>HTTP-Statuscode</li>
                  <li>Übertragene Datenmenge</li>
                  <li>Website, von der die Anforderung kommt</li>
                  <li>Informationen zu Browser und Betriebssystem</li>
                </ul>
                <p>
                  Das ist erforderlich, um unsere Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten. 
                  Dies entspricht unserem berechtigten Interesse im Sinne des Art. 6 Abs. 1 lit. f DSGVO.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Supabase (Datenbank)</h3>
                <p className="mb-3">
                  Für die Speicherung Ihrer Projektanfragen nutzen wir Supabase. Anbieter ist Supabase Inc., 
                  San Francisco, USA. Supabase verarbeitet Daten in unserem Auftrag und hat sich 
                  verpflichtet, angemessene Datenschutzmaßnahmen zu implementieren.
                </p>
                <p>
                  Ihre Projektanfrage-Daten werden in der Supabase-Datenbank gespeichert und sind nur für 
                  die Bearbeitung Ihrer Anfrage zugänglich.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Notion (Projektmanagement)</h3>
                <p className="mb-3">
                  Für das Projektmanagement und die Verwaltung von Kundenanfragen nutzen wir Notion. 
                  Anbieter ist Notion Labs, Inc., San Francisco, USA.
                </p>
                <p>
                  Ihre Projektanfrage-Daten werden auch in Notion gespeichert, um den Projektworkflow 
                  zu verwalten und Sie optimal betreuen zu können.
                </p>
              </div>
            </div>
          </div>

          {/* Ihre Rechte */}
          <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Ihre Rechte</h2>
            
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>Sie haben folgende Rechte:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Auskunft:</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
                <li><strong>Berichtigung:</strong> Sie haben ein Recht auf Berichtigung unrichtiger oder unvollständiger Daten.</li>
                <li><strong>Löschung:</strong> Sie können die Löschung Ihrer personenbezogenen Daten verlangen.</li>
                <li><strong>Einschränkung:</strong> Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</li>
                <li><strong>Widerspruch:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
                <li><strong>Datenübertragbarkeit:</strong> Sie können eine Übertragung Ihrer Daten an sich oder einen Dritten verlangen.</li>
                <li><strong>Beschwerde:</strong> Sie können sich bei einer Aufsichtsbehörde beschweren.</li>
              </ul>
            </div>
          </div>

          {/* SSL Verschlüsselung */}
          <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">SSL- bzw. TLS-Verschlüsselung</h2>
            
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, 
                wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine 
                SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die 
                Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in 
                Ihrer Browserzeile.
              </p>
              <p>
                Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns 
                übermitteln, nicht von Dritten mitgelesen werden.
              </p>
            </div>
          </div>

          {/* Änderungen */}
          <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Änderungen der Datenschutzerklärung</h2>
            
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen 
                rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der 
                Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten 
                Besuch gilt dann die neue Datenschutzerklärung.
              </p>
              <p className="text-gray-400">
                <strong>Stand:</strong> {new Date().toLocaleDateString('de-DE')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to top / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-medium transition-all glow"
          >
            Zurück zur Startseite
          </Link>
        </motion.div>
      </div>

    </main>
  )
} 