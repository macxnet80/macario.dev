'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function TestimonialsSection() {
    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-5xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                        <Quote className="absolute top-6 left-6 w-8 h-8 text-blue-400 opacity-50" />
                        
                        <blockquote className="relative">
                            <p className="text-lg font-medium sm:text-xl md:text-2xl text-[#f6f6f6] leading-relaxed mb-8">
                                "Lars hat einen grandiosen Job gemacht... Seine Arbeit übertrifft was sein Profil verspricht. Die Kommunikation läuft einwandfrei. Wir standen fast täglich in Kontakt, um Kleinigkeiten zu erörtern und trafen uns regelmäßig in einem Online-Meeting, um uns auszutauschen. Er setzt Wünsche umgehend um und hat viele interessante Ideen, die das Ganze letztendlich rund werden ließen."
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                    TP
                                </div>
                                <div className="space-y-1">
                                    <cite className="font-semibold text-[#f6f6f6] not-italic">Tamara Pfaff</cite>
                                    <span className="text-[#e7e7e7] block text-sm">Geschäftsführerin, tierisch gut betreut UG</span>
                                </div>
                            </div>
                        </blockquote>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
