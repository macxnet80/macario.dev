'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Eye, 
  Mail, 
  Phone, 
  Euro, 
  Clock, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Building2,
  ArrowUpDown,
  ChevronDown,
  Bot,
  Sparkles,
  FileText,
  Edit3,
  Save,
  X,
  MapPin,
  Calendar,
  Target,
  Zap,
  Copy,
  RefreshCw
} from 'lucide-react'
import { projectRequestsApi, ProjectRequest, isSupabaseConfigured } from '@/lib/supabase'
import CRMTabs from '@/components/CRMTabs'

const statusConfig = {
  new: { 
    label: 'Neu', 
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: AlertCircle 
  },
  contacted: { 
    label: 'Kontaktiert', 
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    icon: Mail 
  },
  in_progress: { 
    label: 'In Bearbeitung', 
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    icon: Clock 
  },
  completed: { 
    label: 'Abgeschlossen', 
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: CheckCircle 
  },
  cancelled: { 
    label: 'Abgebrochen', 
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    icon: AlertCircle 
  }
}

const projectTypeConfig = {
  website: { label: 'Website', color: 'text-blue-400' },
  webapp: { label: 'Web-App', color: 'text-purple-400' },
  ecommerce: { label: 'E-Commerce', color: 'text-green-400' },
  automation: { label: 'Automatisierung', color: 'text-orange-400' },
  ai: { label: 'KI-Integration', color: 'text-indigo-400' }
}

export default function CRMPage() {
  const [requests, setRequests] = useState<ProjectRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null)
  const [sortBy, setSortBy] = useState<'created_at' | 'budget' | 'name'>('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Daten laden
  const loadRequests = async () => {
    try {
      setLoading(true)
      if (!isSupabaseConfigured()) {
        console.warn('Supabase nicht konfiguriert')
        return
      }
      
      const data = await projectRequestsApi.getAllProjectRequests()
      setRequests(data)
    } catch (error) {
      console.error('Fehler beim Laden der Anfragen:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  // Status aktualisieren
  const updateStatus = async (id: number, status: ProjectRequest['status']) => {
    try {
      await projectRequestsApi.updateProjectRequestStatus(id, status)
      await loadRequests()
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Status:', error)
    }
  }

  // Gefilterte und sortierte Anfragen
  const filteredRequests = requests
    .filter(request => {
      const matchesSearch = 
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.company && request.company.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortBy) {
        case 'created_at':
          aValue = new Date(a.created_at).getTime()
          bValue = new Date(b.created_at).getTime()
          break
        case 'budget':
          aValue = a.budget
          bValue = b.budget
          break
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        default:
          return 0
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(budget)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300">CRM wird geladen...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-400 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                  <p className="text-gray-400 mt-1">Verwalte deine Website</p>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="flex items-center gap-2">
                <a
                  href="/admin"
                  className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg border border-white/20 hover:bg-white/20 transition-all font-medium"
                >
                  Portfolio
                </a>
                <a
                  href="/admin/crm"
                  className="px-4 py-2 bg-primary/20 text-primary rounded-lg border border-primary/30 font-medium"
                >
                  CRM
                </a>
                <a
                  href="/admin/projects"
                  className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg border border-white/20 hover:bg-white/20 transition-all font-medium"
                >
                  Projekte
                </a>
              </nav>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">Projektanfragen CRM</h2>
            <p className="text-gray-400">Verwalte alle eingehenden Projektanfragen</p>
          </div>
        </div>

        {/* Dashboard - Kompaktes Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Hauptzeile mit allen wichtigen Infos */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Gesamt-Übersicht */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-400 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{requests.length}</div>
                    <div className="text-sm text-gray-400">Projektanfragen</div>
                  </div>
                </div>
              </div>

              {/* Status-Übersicht als horizontale Liste */}
              <div className="lg:col-span-6">
                <div className="flex items-center justify-between gap-4">
                  {Object.entries(statusConfig).map(([status, config], index) => {
                    const count = requests.filter(r => r.status === status).length
                    const IconComponent = config.icon
                    const percentage = requests.length > 0 ? Math.round((count / requests.length) * 100) : 0
                    
                    return (
                      <motion.div
                        key={status}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                      >
                        <div className={`p-2 rounded-lg ${config.color} group-hover:scale-110 transition-all`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{count}</div>
                          <div className="text-xs text-gray-400">{config.label}</div>
                          <div className="text-xs text-gray-500">{percentage}%</div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="lg:col-span-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">Ø Budget</span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {requests.length > 0 
                        ? new Intl.NumberFormat('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                            minimumFractionDigits: 0
                          }).format(requests.reduce((sum, r) => sum + r.budget, 0) / requests.length)
                        : '0€'
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400">Heute</span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {requests.filter(r => 
                        new Date(r.created_at).toDateString() === new Date().toDateString()
                      ).length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">7 Tage</span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {requests.filter(r => {
                        const requestDate = new Date(r.created_at)
                        const weekAgo = new Date()
                        weekAgo.setDate(weekAgo.getDate() - 7)
                        return requestDate >= weekAgo
                      }).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter und Suche */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Suchfeld */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Suche nach Name, E-Mail, Firma oder Beschreibung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-primary"
              >
                <option value="all">Alle Status</option>
                {Object.entries(statusConfig).map(([status, config]) => (
                  <option key={status} value={status}>{config.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Sortierung */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-primary"
              >
                <option value="created_at">Datum</option>
                <option value="budget">Budget</option>
                <option value="name">Name</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all"
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabelle */}
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left p-4 font-medium">Kontakt</th>
                  <th className="text-left p-4 font-medium">Projekt</th>
                  <th className="text-left p-4 font-medium">Budget</th>
                  <th className="text-left p-4 font-medium">Timeline</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Datum</th>
                  <th className="text-left p-4 font-medium">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request, index) => {
                  const statusInfo = statusConfig[request.status]
                  const projectTypeInfo = projectTypeConfig[request.project_type as keyof typeof projectTypeConfig]
                  
                  return (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-all"
                    >
                      {/* Kontakt */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{request.name}</div>
                            <div className="text-sm text-gray-400">{request.email}</div>
                            {request.company && (
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {request.company}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Projekt */}
                      <td className="p-4">
                        <div>
                          <div className={`font-medium ${projectTypeInfo?.color || 'text-white'}`}>
                            {projectTypeInfo?.label || request.project_type}
                          </div>
                          <div className="text-sm text-gray-400 max-w-xs truncate">
                            {request.description}
                          </div>
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="p-4">
                        <div className="font-medium text-green-400">
                          {formatBudget(request.budget)}
                        </div>
                      </td>

                      {/* Timeline */}
                      <td className="p-4">
                        <div className="text-sm">{request.timeline}</div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <div className="relative">
                          <select
                            value={request.status}
                            onChange={(e) => updateStatus(request.id, e.target.value as any)}
                            className={`appearance-none text-xs px-3 py-1 rounded-full border ${statusInfo.color} bg-transparent cursor-pointer`}
                          >
                            {Object.entries(statusConfig).map(([status, config]) => (
                              <option key={status} value={status} className="bg-background text-white">
                                {config.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      {/* Datum */}
                      <td className="p-4">
                        <div className="text-sm text-gray-400">
                          {formatDate(request.created_at)}
                        </div>
                      </td>

                      {/* Aktionen */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                            title="Details anzeigen"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {request.email && (
                            <a
                              href={`mailto:${request.email}`}
                              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                              title="E-Mail senden"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
                          {request.phone && (
                            <a
                              href={`tel:${request.phone}`}
                              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                              title="Anrufen"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Keine Projektanfragen gefunden</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedRequest && (
          <RequestDetailModal 
            request={selectedRequest} 
            onClose={() => setSelectedRequest(null)}
            onStatusUpdate={(id, status) => {
              updateStatus(id, status)
              setSelectedRequest(prev => prev ? { ...prev, status } : null)
            }}
          />
        )}
      </div>
    </div>
  )
}

// Detail Modal Komponente
function RequestDetailModal({ 
  request, 
  onClose, 
  onStatusUpdate 
}: { 
  request: ProjectRequest
  onClose: () => void
  onStatusUpdate: (id: number, status: ProjectRequest['status']) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(request)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'crm' | 'offer'>('overview')
  const statusInfo = statusConfig[request.status]
  const projectTypeInfo = projectTypeConfig[request.project_type as keyof typeof projectTypeConfig]

  // CRM-Daten speichern
  const saveCRMData = async () => {
    try {
      await projectRequestsApi.updateCRMFields(request.id, editData)
      setIsEditing(false)
      // Daten neu laden
      window.location.reload()
    } catch (error) {
      console.error('Fehler beim Speichern:', error)
      alert('Fehler beim Speichern der Daten')
    }
  }

  // Angebotsbeschreibung optimieren
  const optimizeOffer = async () => {
    if (!editData.offer_description) {
      alert('Bitte erst eine Beschreibung eingeben')
      return
    }

    setIsOptimizing(true)
    try {
      const response = await fetch('/api/optimize-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: editData.offer_description,
          projectType: request.project_type,
          budget: request.budget,
          features: request.features
        })
      })

      const data = await response.json()
      if (data.success) {
        setEditData(prev => ({
          ...prev,
          offer_description_optimized: data.optimizedDescription
        }))
      } else {
        alert('Fehler bei der Optimierung')
      }
    } catch (error) {
      console.error('Optimierung fehlgeschlagen:', error)
      alert('Fehler bei der KI-Optimierung')
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background border border-white/20 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-400 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Projektanfrage Details</h2>
              <p className="text-gray-400">ID: {request.id} • {request.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isEditing && (
              <>
                <button
                  onClick={saveCRMData}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Speichern
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setEditData(request)
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <X className="w-4 h-4" />
                  Abbrechen
                </button>
              </>
            )}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-all"
              >
                <Edit3 className="w-4 h-4" />
                Bearbeiten
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10">
          {[
            { id: 'overview', label: 'Übersicht', icon: Eye },
            { id: 'crm', label: 'CRM-Daten', icon: User },
            { id: 'offer', label: 'Angebot', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <CRMTabs
            request={request}
            editData={editData}
            setEditData={setEditData}
            isEditing={isEditing}
            activeTab={activeTab}
            optimizeOffer={optimizeOffer}
            isOptimizing={isOptimizing}
            statusConfig={statusConfig}
            projectTypeConfig={projectTypeConfig}
            onStatusUpdate={onStatusUpdate}
          />
        </div>
      </motion.div>
    </motion.div>
  )
} 