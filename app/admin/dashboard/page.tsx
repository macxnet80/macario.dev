'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Users, 
  Clock, 
  CheckCircle, 
  Settings,
  LogOut,
  FileText,
  Mail,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface OnboardingSession {
  id: string
  token: string
  customer_name: string
  customer_email: string
  company?: string
  project_scope: string
  status: 'created' | 'in_progress' | 'completed'
  created_at: string
  completed_at?: string
  customer_data?: any
}

export default function AdminDashboard() {
  const [sessions, setSessions] = useState<OnboardingSession[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const [selectedSession, setSelectedSession] = useState<OnboardingSession | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadSessions()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/me')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    }
  }

  const loadSessions = async () => {
    try {
      const response = await fetch('/api/admin/onboarding-sessions')
      if (response.ok) {
        const data = await response.json()
        setSessions(data.sessions || [])
      }
    } catch (error) {
      console.error('Fehler beim Laden der Sessions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created': return 'text-yellow-400 bg-yellow-400/10'
      case 'in_progress': return 'text-blue-400 bg-blue-400/10'
      case 'completed': return 'text-green-400 bg-green-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'created': return 'Erstellt'
      case 'in_progress': return 'In Bearbeitung'
      case 'completed': return 'Abgeschlossen'
      default: return status
    }
  }

  const copyLink = async (token: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const onboardingUrl = `${baseUrl}/onboarding/${token}`
    
    try {
      await navigator.clipboard.writeText(onboardingUrl)
      setCopiedToken(token)
      setTimeout(() => setCopiedToken(null), 2000)
    } catch (error) {
      console.error('Fehler beim Kopieren:', error)
      alert('Fehler beim Kopieren des Links')
    }
  }

  const openDetails = (session: OnboardingSession) => {
    setSelectedSession(session)
  }

  const closeDetails = () => {
    setSelectedSession(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Lädt...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-white">
                Onboarding Management
              </h1>
              <p className="text-sm text-gray-400">
                Willkommen, {user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push('/admin/create-onboarding')}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Neues Onboarding
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Abmelden
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiken */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-600">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Gesamt</p>
                  <p className="text-2xl font-bold text-white">{sessions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-600">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Offen</p>
                  <p className="text-2xl font-bold text-white">
                    {sessions.filter(s => s.status !== 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-600">
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Abgeschlossen</p>
                  <p className="text-2xl font-bold text-white">
                    {sessions.filter(s => s.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-600">
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Diese Woche</p>
                  <p className="text-2xl font-bold text-white">
                    {sessions.filter(s => {
                      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
                      return new Date(s.created_at).getTime() > weekAgo
                    }).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Liste */}
        <Card className="bg-gray-800/50 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white">Onboarding Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Noch keine Onboarding-Sessions
                </h3>
                <p className="text-gray-400 mb-6">
                  Erstellen Sie Ihre erste Onboarding-Session für einen Kunden.
                </p>
                <Button
                  onClick={() => router.push('/admin/create-onboarding')}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Erste Session erstellen
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-white">
                            {session.customer_name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                            {getStatusText(session.status)}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-400">
                          <p>{session.company && `${session.company} • `}{session.project_scope}</p>
                          <p className="flex items-center mt-1">
                            <Mail className="h-3 w-3 mr-1" />
                            {session.customer_email}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Erstellt: {new Date(session.created_at).toLocaleDateString('de-DE')}
                          {session.completed_at && (
                            <> • Abgeschlossen: {new Date(session.completed_at).toLocaleDateString('de-DE')}</>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          onClick={() => openDetails(session)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        {session.status !== 'completed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
                            onClick={() => copyLink(session.token)}
                          >
                            {copiedToken === session.token ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Kopiert!
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-2" />
                                Link kopieren
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Details Modal */}
      {selectedSession && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeDetails}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          >
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Session Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeDetails}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Kunde</h3>
                <p className="text-white">{selectedSession.customer_name}</p>
                <p className="text-gray-300 text-sm mt-1">{selectedSession.customer_email}</p>
                {selectedSession.company && (
                  <p className="text-gray-300 text-sm mt-1">{selectedSession.company}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Projekt</h3>
                <p className="text-white">{selectedSession.project_scope}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Status</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSession.status)}`}>
                  {getStatusText(selectedSession.status)}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Zeitstempel</h3>
                <p className="text-white text-sm">
                  Erstellt: {new Date(selectedSession.created_at).toLocaleString('de-DE')}
                </p>
                {selectedSession.completed_at && (
                  <p className="text-white text-sm mt-1">
                    Abgeschlossen: {new Date(selectedSession.completed_at).toLocaleString('de-DE')}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Onboarding Link</h3>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-900 text-gray-300 p-2 rounded text-sm break-all">
                    {typeof window !== 'undefined' ? `${window.location.origin}/onboarding/${selectedSession.token}` : ''}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyLink(selectedSession.token)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    {copiedToken === selectedSession.token ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const url = typeof window !== 'undefined' ? `${window.location.origin}/onboarding/${selectedSession.token}` : ''
                      window.open(url, '_blank')
                    }}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {selectedSession.customer_data && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Kundendaten</h3>
                  <pre className="bg-gray-900 text-gray-300 p-4 rounded text-xs overflow-auto max-h-64">
                    {JSON.stringify(selectedSession.customer_data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
