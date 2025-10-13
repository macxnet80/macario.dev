'use client'

import { motion } from 'framer-motion'

export default function EmotionalStory() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-lg text-gray-300"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
            Kennst du das Gefühl?
          </h2>
          
          <p>Du hast eine Idee. Eine richtig gute Idee.</p>
          
          <p>Eine Idee, die dir nachts keine Ruhe lässt, weil du <span className="text-primary font-semibold">GENAU</span> weißt – das könnte funktionieren.</p>
          
          <p>Eine App, die dein Business automatisiert. Ein Tool, das anderen das Leben leichter macht. Ein MVP, das dein Sprungbrett in die Selbstständigkeit sein könnte.</p>
          
          <p className="text-gray-400">Aber irgendetwas hält dich zurück...</p>
          
          <p>Vielleicht ist es die Angst vor dem Unbekannten. Oder der Gedanke: "Ich bin doch kein Entwickler – wie soll ich das umsetzen?"</p>
          
          <p>Vielleicht wartest du auf den "perfekten Moment". Oder darauf, dass du endlich Zeit findest, dich in Programmierung einzuarbeiten.</p>
          
          <p>Und während du wartest... vergeht Zeit. Andere bringen ihre Ideen auf den Markt. Die Konkurrenz wird stärker. Dein Traum rückt in weite Ferne.</p>
          
          <p className="text-primary font-semibold text-xl">Hier ist die harte Wahrheit: Warten macht es nicht einfacher.</p>
          
          <p>Der Markt bewegt sich schnell. Ideen ohne Umsetzung sind wertlos.</p>
          
          <p>Die Gewinner? Sie warten nicht. Sie handeln. Sie bauen.</p>
          
          <p>Und in nur <span className="text-primary font-bold text-xl">2 Wochen</span> könnte deine Idee live sein.</p>
          
          <p>Nicht nur ein Konzept. Nicht nur ein Traum.</p>
          
          <p>Ein echtes Produkt. Mit echten Nutzern.</p>
          
          <p className="text-primary font-bold text-2xl">Das ist dein Moment.</p>
          
          <p>Deine Chance, aufzuhören zu überdenken, anzufangen zu bauen und die Kontrolle über deine Zukunft zu übernehmen.</p>
          
          <p className="text-primary font-semibold">Denn wenn du nicht jetzt handelst... wer dann?</p>
        </motion.div>
      </div>
    </section>
  )
}
