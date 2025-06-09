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
      'GPT-4 & GPT-3.5',
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
  const [tab, setTab] = useState<'tools' | 'skills'>('tools')

  const activeData = tab === 'tools' ? tools : skillsTab

  return (
    <section id="skills-section" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-foreground">
            Meine Werkzeugkiste
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mit diesen modernen Entwicklungstools verwandle ich deine Ideen in professionelle Websites und Web-Anwendungen
          </p>
        </motion.div>
        <div className="flex justify-center gap-4 mb-12">
          <button
            className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-all border border-white/10 focus:outline-none ${tab === 'tools' ? 'bg-primary text-white shadow-lg scale-105' : 'bg-background text-primary-foreground hover:bg-primary/10'}`}
            onClick={() => setTab('tools')}
          >
            Tools & Plattformen
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-all border border-white/10 focus:outline-none ${tab === 'skills' ? 'bg-primary text-white shadow-lg scale-105' : 'bg-background text-primary-foreground hover:bg-primary/10'}`}
            onClick={() => setTab('skills')}
          >
            Fähigkeiten
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeData.map((item, index) => (
            <motion.div 
              key={item.title} 
              className="rounded-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass rounded-2xl p-8 border border-white/10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} p-3 mb-6 flex items-center justify-center`}>
                  <item.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300 mb-4 min-h-[48px]">{item.description}</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-primary-foreground">
                  {item.features.map((f) => (
                    <li key={f} className="text-primary-foreground/90">{f}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* CTA Section */}
      <div className="max-w-5xl mx-auto mt-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-teal-500 shadow-xl p-10 md:p-14 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Bereit für dein Web-Projekt?</h3>
          <p className="text-base md:text-lg font-medium">
            Egal ob einfache Website oder komplexe Web-Anwendung – lass uns gemeinsam herausfinden, welche Lösung für dich am besten geeignet ist.
          </p>
        </div>
      </div>
    </section>
  )
} 