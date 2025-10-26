'use client'

import { motion } from 'framer-motion'
import { 
  Smartphone, 
  Globe, 
  Zap, 
  Layers, 
  Brain, 
  Palette,
  Triangle,
  Code2,
  Workflow
} from 'lucide-react'
import { useState } from 'react'


const tools = [
  {
    icon: Code2,
    title: 'Cursor',
    description: 'KI-gestützter Code Editor für schnelle Entwicklung',
    features: [
      'AI Code Generation',
      'Smart Autocomplete',
      'Code Refactoring',
      'Multi-language Support',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Supabase',
    description: 'Backend-as-a-Service mit PostgreSQL',
    features: [
      'Real-time Database',
      'Authentication',
      'Storage',
      'Edge Functions',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Smartphone,
    title: 'n8n',
    description: 'Open-Source Workflow Automatisierung',
    features: [
      'Self-hosted Workflows',
      'Custom Nodes',
      'Advanced Logic',
      'Data Transformation',
    ],
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: Triangle,
    title: 'Vercel',
    description: 'Deployment & API-Hosting Plattform',
    features: [
      'Serverless Functions',
      'Edge Network',
      'Git Integration',
      'Analytics',
    ],
    color: 'from-gray-700 to-gray-900',
  },
  {
    icon: Brain,
    title: 'React/Next.js',
    description: 'Moderne Frontend-Frameworks',
    features: [
      'Component Architecture',
      'Server-Side Rendering',
      'TypeScript Support',
      'Performance Optimized',
    ],
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Palette,
    title: 'OpenAI API',
    description: 'KI-Integration für smarte Anwendungen',
    features: [
      'Aktuelle GPT-Modelle',
      'Text & Chatbots',
      'Automatisierte Analysen',
      'Individuelle KI-Lösungen',
    ],
    color: 'from-purple-500 to-pink-500',
  },
]

const skillsTab = [
  {
    icon: Globe,
    title: 'Moderne Websites',
    description: 'Responsive Websites mit professionellem Design und Performance',
    features: [
      'Corporate Websites',
      'Landing Pages',
      'Portfolio Sites',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'Web-Anwendungen',
    description: 'Vollwertige Web-Apps mit komplexer Funktionalität',
    features: [
      'E-Commerce Plattformen',
      'SaaS Anwendungen',
      'Community Portale',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Workflow,
    title: 'Workflow Automatisierung',
    description: 'Repetitive Aufgaben automatisieren und Zeit sparen',
    features: [
      'Email Marketing',
      'Data Sync',
      'Report Generation',
    ],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Backend & Datenbank',
    description: 'Skalierbare Backend-Lösungen mit modernen Datenbanken',
    features: [
      'Supabase Integration',
      'Real-time Updates',
      'User Authentication',
    ],
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Palette,
    title: 'Cloud Deployment',
    description: 'Professionelle Hosting-Lösungen mit globaler Verfügbarkeit',
    features: [
      'Vercel Deployment',
      'CDN Integration',
      'SSL Zertifikate',
    ],
    color: 'from-gray-700 to-gray-900',
  },
  {
    icon: Code2,
    title: 'Custom Development',
    description: 'Maßgeschneiderte Lösungen mit KI-unterstützter Entwicklung',
    features: [
      'KI-Integration',
      'API Entwicklung',
      'Spezielle Features',
    ],
    color: 'from-blue-500 to-indigo-500',
  },
]

export default function SkillsSection() {
  const [tab, setTab] = useState<'tools' | 'skills'>('skills')

  const activeData = tab === 'tools' ? tools : skillsTab

  return (
    <section id="skills-section" className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-foreground">
            Meine Fähigkeiten
          </h2>
          <p className="text-xl text-[#e7e7e7] max-w-3xl mx-auto">
            Von modernen Websites bis hin zu komplexen Web-Anwendungen – hier ist was ich für dich umsetzen kann
          </p>
        </motion.div>
        <div className="flex justify-center gap-4 mb-12">
          <button
            className={`px-8 py-3 rounded-2xl font-semibold shadow-lg transition-all border border-white/10 focus:outline-none ${tab === 'skills' ? 'bg-[#d1d1d1] text-black shadow-xl scale-105' : 'bg-[#121212] text-white hover:bg-[#1a1a1a] hover:scale-105'}`}
            onClick={() => setTab('skills')}
          >
            Fähigkeiten
          </button>
          <button
            className={`px-8 py-3 rounded-2xl font-semibold shadow-lg transition-all border border-white/10 focus:outline-none ${tab === 'tools' ? 'bg-[#d1d1d1] text-black shadow-xl scale-105' : 'bg-[#121212] text-white hover:bg-[#1a1a1a] hover:scale-105'}`}
            onClick={() => setTab('tools')}
          >
            Tools & Plattformen
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeData.map((item, index) => (
            <motion.div 
              key={item.title} 
              className="rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.03,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="rounded-3xl p-8 border border-white/20 bg-[#121212] hover:bg-[#1a1a1a] transition-all duration-300 shadow-xl">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} p-4 mb-6 flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#f6f6f6] drop-shadow-sm">{item.title}</h3>
                <p className="text-[#e7e7e7] mb-6 min-h-[48px] leading-relaxed drop-shadow-sm">{item.description}</p>
                <div className="space-y-3">
                  {item.features.map((f, featureIndex) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + (featureIndex * 0.1) }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#b0b0b0] flex-shrink-0 shadow-sm" />
                      <span className="text-[#e7e7e7] text-sm font-medium drop-shadow-sm">{f}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* CTA Section */}
      <div className="max-w-5xl mx-auto mt-20">
        <motion.div 
          className="rounded-3xl border border-white/10 bg-[#121212] p-10 md:p-14 text-center text-white shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Bereit für dein Web-Projekt?</h3>
          <p className="text-base md:text-lg font-medium text-[#e7e7e7] leading-relaxed">
            Egal ob einfache Website oder komplexe Web-Anwendung – lass uns gemeinsam herausfinden, welche Lösung für dich am besten geeignet ist.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 