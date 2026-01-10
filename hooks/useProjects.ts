'use client'

import { useState, useEffect } from 'react'
import { supabase, projectsApi, Project } from '@/lib/supabase'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
    
    // Real-time Updates Setup (nur wenn Tabelle existiert)
    let subscription: any = null
    
    const setupRealtime = async () => {
      try {
        // Teste erst, ob die Tabelle existiert
        await projectsApi.getActiveProjects()
        
        subscription = supabase
          .channel('projects-changes')
          .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'projects'
          }, (payload) => {
            console.log('Real-time update:', payload)
            fetchProjects()
          })
          .subscribe()
      } catch (error) {
        console.log('Real-time setup übersprungen - Tabelle noch nicht vorhanden')
      }
    }
    
    setupRealtime()

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const fetchProjects = async () => {
    try {
      setError(null)
      const data = await projectsApi.getActiveProjects()
      setProjects(data)
    } catch (err) {
      // Bessere Fehlerbehandlung mit detailliertem Logging
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler'
      const errorDetails = err instanceof Error ? {
        message: err.message,
        name: err.name,
        stack: err.stack
      } : err
      
      console.error('Fehler beim Laden der Projekte:', {
        error: errorMessage,
        details: errorDetails,
        timestamp: new Date().toISOString()
      })
      
      setError('Projekte konnten nicht geladen werden')
      // Fallback auf lokale Daten wenn Supabase nicht verfügbar
      setProjects(getFallbackProjects())
    } finally {
      setLoading(false)
    }
  }

  return { projects, loading, error, refetch: fetchProjects }
}

// Admin Hook wurde entfernt, da der Admin-Bereich entfernt wurde

// Fallback-Daten falls Supabase nicht verfügbar ist
function getFallbackProjects(): Project[] {
  return [
    {
      id: 1,
      title: 'Unternehmens-Website',
      description: 'Moderne Corporate Website für ein KMU mit Portfolio, Leistungen und Kontaktformular. Responsive Design, SEO-optimiert und in 2 Wochen live.',
      tools: ['Next.js', 'Supabase', 'Tailwind CSS'],
      features: ['Moderne Designs', 'SEO-Optimierung', 'Mobile-First', 'CMS Integration'],
      color: 'from-blue-500 to-cyan-500',
      image_url: null,
      order_index: 0,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'KI-Kundenservice Bot',
      description: 'Ein intelligenter Chatbot für KMU, der Kundenanfragen automatisch beantwortet und bei Bedarf an menschliche Mitarbeiter weiterleitet.',
      tools: ['OpenAI', 'n8n', 'Supabase'],
      features: ['24/7 Verfügbarkeit', 'FAQ-Beantwortung', 'Lead-Qualifizierung', 'Smart Routing'],
      color: 'from-purple-500 to-pink-500',
      image_url: null,
      order_index: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Kunden-Portal',
      description: 'Ein Self-Service Portal für Kunden mit Dashboard, Dokumentenzugriff und Kommunikationsfunktionen.',
      tools: ['Next.js', 'Supabase', 'React'],
      features: ['Benutzer-Dashboard', 'Dokumenten-Management', 'Self-Service', 'Kommunikation'],
      color: 'from-green-500 to-emerald-500',
      image_url: null,
      order_index: 2,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      title: 'Automatisierte Workflows',
      description: 'Ein Workflow-System für KMU, das Rechnungen automatisch verarbeitet, E-Mails versendet und CRM-Daten synchronisiert.',
      tools: ['n8n', 'Supabase', 'Make.com'],
      features: ['E-Mail Automation', 'Rechnungsstellung', 'CRM-Integration', 'Workflow-Design'],
      color: 'from-orange-500 to-red-500',
      image_url: null,
      order_index: 3,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
} 