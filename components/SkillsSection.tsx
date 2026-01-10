'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Smartphone, 
  Globe, 
  Zap, 
  Layers, 
  Brain, 
  Palette,
  Triangle,
  Code2,
  Workflow,
  Calendar,
  Users,
  Building,
  Bot,
  LucideIcon
} from 'lucide-react'
import { useState } from 'react'

// Type definitions
type ToolItem = {
  logo: string
  title: string
  description: string
  features: string[]
  color: string
  bgColor: string
}

type SkillItem = {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  color: string
  bgColor: string
}

type CombinedItem = ToolItem | SkillItem

// Type guard functions
const isToolItem = (item: CombinedItem): item is ToolItem => {
  return 'logo' in item
}

const tools: ToolItem[] = [
  {
    logo: '/Logos/cursor_logo.png',
    title: 'Cursor',
    description: 'KI-gestützter Code Editor für schnelle Entwicklung',
    features: [
      'AI Code Generation',
      'Smart Autocomplete',
      'Code Refactoring',
      'Multi-language Support',
    ],
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-500/20',
  },
  {
    logo: '/Logos/supabase_logo.png',
    title: 'Supabase',
    description: 'Backend-as-a-Service mit PostgreSQL',
    features: [
      'Real-time Database',
      'Authentication',
      'Storage',
      'Edge Functions',
    ],
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-500/20',
  },
  {
    logo: '/Logos/n8n-color_logo.png',
    title: 'n8n',
    description: 'Open-Source Workflow Automatisierung',
    features: [
      'Self-hosted Workflows',
      'Custom Nodes',
      'Advanced Logic',
      'Data Transformation',
    ],
    color: 'from-pink-400 to-purple-600',
    bgColor: 'bg-pink-500/20',
  },
  {
    logo: '/Logos/logo-vercel.svg',
    title: 'Vercel',
    description: 'Deployment & API-Hosting Plattform',
    features: [
      'Serverless Functions',
      'Edge Network',
      'Git Integration',
      'Analytics',
    ],
    color: 'from-gray-600 to-gray-800',
    bgColor: 'bg-gray-600/20',
  },
  {
    logo: '/Logos/React-icon.png',
    title: 'React/Next.js',
    description: 'Moderne Frontend-Frameworks',
    features: [
      'Component Architecture',
      'Server-Side Rendering',
      'TypeScript Support',
      'Performance Optimized',
    ],
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-400/20',
  },
  {
    logo: '/Logos/openai.svg',
    title: 'OpenAI API',
    description: 'KI-Integration für smarte Anwendungen',
    features: [
      'Aktuelle GPT-Modelle',
      'Text & Chatbots',
      'Automatisierte Analysen',
      'Individuelle KI-Lösungen',
    ],
    color: 'from-green-400 to-teal-500',
    bgColor: 'bg-green-400/20',
  },
]

const skillsTab: SkillItem[] = [
  {
    icon: Globe,
    title: 'Unternehmens-Websites',
    description: 'Portfolio, Landing Pages und professionelle Firmenpräsenz',
    features: [
      'Moderne Designs',
      'SEO-Optimierung',
      'Mobile-First',
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/20',
  },
  {
    icon: Users,
    title: 'Kunden-Portale',
    description: 'Dashboard, Self-Service und Dokumentenzugriff für Kunden',
    features: [
      'Benutzer-Dashboard',
      'Dokumenten-Management',
      'Self-Service',
    ],
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/20',
  },
  {
    icon: Calendar,
    title: 'Buchungs- & Terminsysteme',
    description: 'Online-Terminbuchung für Dienstleister aller Art',
    features: [
      'Kalender-Integration',
      'Automatische Erinnerungen',
      'Zahlungsabwicklung',
    ],
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/20',
  },
  {
    icon: Building,
    title: 'Interne Tools',
    description: 'Workflows, Datenbanken und Reporting für deine Prozesse',
    features: [
      'Prozess-Automatisierung',
      'Datenbank-Lösungen',
      'Reporting & Analytics',
    ],
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/20',
  },
  {
    icon: Bot,
    title: 'KI-Assistenten',
    description: 'Chatbots, FAQ und Lead-Qualifizierung rund um die Uhr',
    features: [
      '24/7 Erreichbarkeit',
      'FAQ-Beantwortung',
      'Lead-Qualifizierung',
    ],
    color: 'from-gray-700 to-gray-900',
    bgColor: 'bg-gray-700/20',
  },
  {
    icon: Zap,
    title: 'Automatisierungen',
    description: 'Workflows die dir Zeit zurückgeben',
    features: [
      'E-Mail Automation',
      'Rechnungsstellung',
      'CRM-Integration',
    ],
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/20',
  },
]

export default function SkillsSection() {
  const [tab, setTab] = useState<'tools' | 'skills'>('skills')

  const activeData: CombinedItem[] = tab === 'tools' ? tools : skillsTab

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Meine Fähigkeiten
          </h2>
          <p className="text-xl text-[#e7e7e7] max-w-3xl mx-auto">
            Digitale Lösungen für kleine und mittelständische Unternehmen – schnell, pragmatisch und bezahlbar
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
            Tech Stack
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
                <div className={`w-16 h-16 rounded-2xl ${item.bgColor || `bg-gradient-to-r ${item.color}`} p-3 mb-6 flex items-center justify-center shadow-lg`}>
                  {isToolItem(item) ? (
                    <Image
                      src={item.logo}
                      alt={`${item.title} Logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <item.icon className="w-8 h-8 text-white" />
                  )}
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
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Bereit, dein Unternehmen zu digitalisieren?</h3>
          <p className="text-base md:text-lg font-medium text-[#e7e7e7] leading-relaxed">
            Egal ob Unternehmens-Website, Kunden-Portal oder Automatisierung – lass uns gemeinsam herausfinden, welche Lösung für dich am besten geeignet ist.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 