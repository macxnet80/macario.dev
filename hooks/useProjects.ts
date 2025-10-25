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
      console.error('Fehler beim Laden der Projekte:', err)
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
      title: 'Fitness-Tracker App',
      description: 'Eine intuitive Mobile App für Personal Trainer und ihre Kunden. Trainingspläne, Fortschrittsverfolgung und Ernährungstipps - alles in einer App.',
      tools: ['Glide', 'Airtable', 'Stripe'],
      features: ['Personalisierte Trainingspläne', 'Progress Tracking', 'In-App Zahlungen'],
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
      description: 'Ein intelligenter Chatbot, der Kundenanfragen automatisch beantwortet und bei Bedarf an menschliche Mitarbeiter weiterleitet.',
      tools: ['OpenAI', 'Make.com', 'Slack'],
      features: ['24/7 Verfügbarkeit', 'Mehrsprachig', 'Nahtlose Übergabe'],
      color: 'from-purple-500 to-pink-500',
      image_url: null,
      order_index: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Vertriebs-Dashboard',
      description: 'Ein Echtzeit-Dashboard für Vertriebsteams mit automatisierten Reports und KPI-Tracking.',
      tools: ['Softr', 'Airtable', 'Zapier'],
      features: ['Live-Daten', 'Automatische Reports', 'Team-Performance'],
      color: 'from-green-500 to-emerald-500',
      image_url: null,
      order_index: 2,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      title: 'Automatisierte Buchhaltung',
      description: 'Ein Workflow-System, das Rechnungen automatisch verarbeitet, kategorisiert und in die Buchhaltung überträgt.',
      tools: ['Make.com', 'Google Sheets', 'Stripe'],
      features: ['OCR-Erkennung', 'Auto-Kategorisierung', 'Echtzeit-Sync'],
      color: 'from-orange-500 to-red-500',
      image_url: null,
      order_index: 3,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
} 