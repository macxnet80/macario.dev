'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FolderOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Building2, 
  Calendar,
  Search,
  Filter,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Target,
  Euro,
  BarChart3,
  Save,
  X,
  ArrowRight,
  Users,
  Timer
} from 'lucide-react'
import { pmProjectsApi, companiesApi, tasksApi, PMProject, Company, Task, isSupabaseConfigured } from '@/lib/supabase'

const statusConfig = {
  planning: { 
    label: 'Planung', 
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: Target 
  },
  active: { 
    label: 'Aktiv', 
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: Play 
  },
  on_hold: { 
    label: 'Pausiert', 
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    icon: Pause 
  },
  completed: { 
    label: 'Abgeschlossen', 
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    icon: CheckCircle 
  },
  cancelled: { 
    label: 'Abgebrochen', 
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    icon: X 
  }
}

const priorityConfig = {
  low: { label: 'Niedrig', color: 'bg-gray-500/20 text-gray-400' },
  medium: { label: 'Mittel', color: 'bg-yellow-500/20 text-yellow-400' },
  high: { label: 'Hoch', color: 'bg-orange-500/20 text-orange-400' },
  urgent: { label: 'Dringend', color: 'bg-red-500/20 text-red-400' }
}

const projectTypeConfig = {
  website: { label: 'Website', color: 'text-blue-400' },
  webapp: { label: 'Web-App', color: 'text-purple-400' },
  ecommerce: { label: 'E-Commerce', color: 'text-green-400' },
  automation: { label: 'Automatisierung', color: 'text-orange-400' },
  ai: { label: 'KI-Integration', color: 'text-indigo-400' },
  custom: { label: 'Individuell', color: 'text-pink-400' }
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<(PMProject & { companies?: Company })[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [tasks, setTasks] = useState<Record<string, Task[]>>({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [editingProject, setEditingProject] = useState<PMProject | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)

  // Daten laden
  const loadData = async () => {
    try {
      setLoading(true)
      if (!isSupabaseConfigured()) {
        console.warn('Supabase nicht konfiguriert')
        return
      }
      
      const [projectsData, companiesData] = await Promise.all([
        pmProjectsApi.getAllProjects(),
        companiesApi.getAllCompanies()
      ])
      
      setProjects(projectsData)
      setCompanies(companiesData)

      // Tasks für jedes Projekt laden
      const tasksData: Record<string, Task[]> = {}
      for (const project of projectsData) {
        try {
          const projectTasks = await tasksApi.getTasksByProject(project.id)
          tasksData[project.id] = projectTasks
        } catch (error) {
          console.error(`Fehler beim Laden der Tasks für ${project.name}:`, error)
          tasksData[project.id] = []
        }
      }
      setTasks(tasksData)
      
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Neues Projekt erstellen
  const handleCreateProject = () => {
    const newProject: Omit<PMProject, 'id' | 'created_at' | 'updated_at'> = {
      company_id: null,
      name: 'Neues Projekt',
      description: null,
      project_type: 'website',
      status: 'planning',
      priority: 'medium',
      start_date: null,
      end_date: null,
      estimated_hours: null,
      budget: null,
      hourly_rate: null,
      fixed_price: null,
      billing_type: 'hourly',
      progress_percentage: 0,
      tags: null,
      color: 'from-blue-500 to-cyan-500',
      notes: null,
      is_active: true
    }
    setEditingProject(newProject as PMProject)
    setIsCreating(true)
  }

  // Projekt speichern
  const handleSaveProject = async (project: PMProject) => {
    try {
      setSaving(true)
      
      if (isCreating) {
        await pmProjectsApi.createProject(project)
      } else {
        await pmProjectsApi.updateProject(project.id, project)
      }
      
      await loadData()
      setEditingProject(null)
      setIsCreating(false)
      
    } catch (error: any) {
      console.error('Fehler beim Speichern:', error)
      alert(`Fehler beim Speichern des Projekts: ${error.message || error}`)
    } finally {
      setSaving(false)
    }
  }

  // Projekt löschen
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Projekt wirklich löschen? Alle zugehörigen Aufgaben und Zeiteinträge werden ebenfalls gelöscht.')) return
    
    try {
      await pmProjectsApi.deleteProject(id)
      await loadData()
    } catch (error) {
      console.error('Fehler beim Löschen:', error)
      alert('Fehler beim Löschen des Projekts')
    }
  }

  // Projekt-Status aktualisieren
  const updateProjectStatus = async (id: string, status: PMProject['status']) => {
    try {
      await pmProjectsApi.updateProject(id, { status })
      await loadData()
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Status:', error)
    }
  }

  // Gefilterte Projekte
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.companies?.name && project.companies.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Statistiken berechnen
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
    totalTasks: Object.values(tasks).reduce((sum, taskList) => sum + taskList.length, 0),
    completedTasks: Object.values(tasks).reduce((sum, taskList) => sum + taskList.filter(t => t.status === 'completed').length, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300">Projekte werden geladen...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/10 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-400 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Projektmanagement</h1>
                  <p className="text-gray-400 mt-1">Projekte verwalten und organisieren</p>
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
                  className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg border border-white/20 hover:bg-white/20 transition-all font-medium"
                >
                  CRM
                </a>
                <a
                  href="/admin/projects"
                  className="px-4 py-2 bg-primary/20 text-primary rounded-lg border border-primary/30 font-medium"
                >
                  Projekte
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCreateProject}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all"
              >
                <Plus className="w-5 h-5" />
                Neues Projekt
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              
              {/* Gesamt-Projekte */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-400 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.total}</div>
                  <div className="text-sm text-gray-400">Projekte</div>
                </div>
              </div>

              {/* Aktive Projekte */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.active}</div>
                  <div className="text-sm text-gray-400">Aktiv</div>
                </div>
              </div>

              {/* Abgeschlossene Projekte */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.completed}</div>
                  <div className="text-sm text-gray-400">Abgeschlossen</div>
                </div>
              </div>

              {/* Gesamt-Aufgaben */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.totalTasks}</div>
                  <div className="text-sm text-gray-400">Aufgaben</div>
                </div>
              </div>

              {/* Erledigte Aufgaben */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-400 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.completedTasks}</div>
                  <div className="text-sm text-gray-400">Erledigt</div>
                </div>
              </div>

              {/* Gesamt-Budget */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-xl flex items-center justify-center">
                  <Euro className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {new Intl.NumberFormat('de-DE', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(stats.totalBudget)}
                  </div>
                  <div className="text-sm text-gray-400">Budget</div>
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
                placeholder="Suche nach Projekt, Unternehmen oder Beschreibung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-400"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-4">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-primary text-white"
              >
                <option value="all" className="bg-gray-900">Alle Status</option>
                {Object.entries(statusConfig).map(([status, config]) => (
                  <option key={status} value={status} className="bg-gray-900">{config.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projekte-Grid */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => {
            const statusInfo = statusConfig[project.status]
            const priorityInfo = priorityConfig[project.priority]
            const projectTypeInfo = projectTypeConfig[project.project_type || 'custom']
            const projectTasks = tasks[project.id] || []
            const completedTasks = projectTasks.filter(t => t.status === 'completed').length
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center`}>
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white line-clamp-1">{project.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.color}`}>
                          {priorityInfo.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                      title="Bearbeiten"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                      title="Löschen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Unternehmen */}
                {project.companies && (
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{project.companies.name}</span>
                  </div>
                )}

                {/* Projekttyp */}
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm font-medium ${projectTypeInfo.color}`}>
                    {projectTypeInfo.label}
                  </span>
                </div>

                {/* Beschreibung */}
                {project.description && (
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                )}

                {/* Fortschritt */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Fortschritt</span>
                    <span className="text-sm font-medium text-white">
                      {project.progress_percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-purple-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress_percentage}%` }}
                    />
                  </div>
                  {projectTasks.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {completedTasks} von {projectTasks.length} Aufgaben abgeschlossen
                    </div>
                  )}
                </div>

                {/* Zeitrahmen */}
                {(project.start_date || project.end_date) && (
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">
                      {project.start_date && new Date(project.start_date).toLocaleDateString('de-DE')}
                      {project.start_date && project.end_date && ' - '}
                      {project.end_date && new Date(project.end_date).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-sm">
                    <div className="text-gray-400">Budget</div>
                    <div className="font-semibold text-green-400">
                      {project.budget 
                        ? new Intl.NumberFormat('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                            minimumFractionDigits: 0
                          }).format(project.budget)
                        : 'Nicht festgelegt'
                      }
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Status ändern */}
                    <select
                      value={project.status}
                      onChange={(e) => updateProjectStatus(project.id, e.target.value as PMProject['status'])}
                      className="text-xs px-2 py-1 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:border-primary"
                    >
                      {Object.entries(statusConfig).map(([status, config]) => (
                        <option key={status} value={status} className="bg-gray-800">
                          {config.label}
                        </option>
                      ))}
                    </select>
                    
                    {/* Zu Aufgaben */}
                    <a
                      href={`/admin/tasks?project=${project.id}`}
                      className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all"
                      title="Aufgaben verwalten"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-2xl flex items-center justify-center">
              <FolderOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Noch keine Projekte</h3>
            <p className="text-gray-400 mb-6">Erstelle dein erstes Projekt und füge ein Unternehmen hinzu</p>
            <button
              onClick={handleCreateProject}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Erstes Projekt erstellen
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <ProjectEditModal
          project={editingProject}
          companies={companies}
          isCreating={isCreating}
          saving={saving}
          onSave={handleSaveProject}
          onCancel={() => {
            setEditingProject(null)
            setIsCreating(false)
          }}
          onChange={setEditingProject}
          onCompanySaved={loadData}
        />
      )}
    </div>
  )
}

// Enhanced Project Edit Modal with Company Creation
function ProjectEditModal({
  project,
  companies,
  isCreating,
  saving,
  onSave,
  onCancel,
  onChange,
  onCompanySaved
}: {
  project: PMProject
  companies: Company[]
  isCreating: boolean
  saving: boolean
  onSave: (project: PMProject) => void
  onCancel: () => void
  onChange: (project: PMProject) => void
  onCompanySaved: () => void
}) {
  const [showCompanyForm, setShowCompanyForm] = useState(false)
  const [newCompany, setNewCompany] = useState<Omit<Company, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    description: null,
    email: null,
    phone: null,
    website: null,
    street: null,
    postal_code: null,
    city: null,
    country: 'Deutschland',
    industry: null,
    company_size: 'medium',
    status: 'active',
    hourly_rate: 75,
    currency: 'EUR',
    notes: null,
    tags: null,
    is_active: true
  })
  const [savingCompany, setSavingCompany] = useState(false)

  // Formular-Updates
  const updateProject = (updates: Partial<PMProject>) => {
    onChange({ ...project, ...updates })
  }

  const updateCompany = (updates: Partial<typeof newCompany>) => {
    setNewCompany({ ...newCompany, ...updates })
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).toISOString().split('T')[0]
  }

  // Neues Unternehmen speichern
  const handleSaveCompany = async () => {
    if (!newCompany.name.trim()) {
      alert('Bitte geben Sie einen Unternehmensnamen ein')
      return
    }

    try {
      setSavingCompany(true)
      const savedCompany = await companiesApi.createCompany(newCompany)
      
      // Projekt mit neuem Unternehmen verknüpfen
      updateProject({ company_id: savedCompany.id })
      
      // Modal schließen und Daten neu laden
      setShowCompanyForm(false)
      await onCompanySaved()
      
    } catch (error: any) {
      console.error('Fehler beim Speichern des Unternehmens:', error)
      alert(`Fehler beim Speichern: ${error.message || error}`)
    } finally {
      setSavingCompany(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {isCreating ? 'Neues Projekt erstellen' : 'Projekt bearbeiten'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Grunddaten */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Projektname *
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject({ name: e.target.value })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="Name des Projekts"
              />
            </div>

            {/* Unternehmen Auswahl mit "Neu hinzufügen" Option */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-400">
                  Unternehmen
                </label>
                <button
                  onClick={() => setShowCompanyForm(true)}
                  className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Neues Unternehmen
                </button>
              </div>
              <select
                value={project.company_id || ''}
                onChange={(e) => updateProject({ company_id: e.target.value || null })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
              >
                <option value="" className="bg-gray-800">Kein Unternehmen</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id} className="bg-gray-800">
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Neues Unternehmen Formular */}
          {showCompanyForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Neues Unternehmen anlegen</h3>
                <button
                  onClick={() => setShowCompanyForm(false)}
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Unternehmensname *
                  </label>
                  <input
                    type="text"
                    value={newCompany.name}
                    onChange={(e) => updateCompany({ name: e.target.value })}
                    className="w-full rounded-lg p-3 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                    placeholder="Musterfirma GmbH"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={newCompany.email || ''}
                    onChange={(e) => updateCompany({ email: e.target.value || null })}
                    className="w-full rounded-lg p-3 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                    placeholder="kontakt@musterfirma.de"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={newCompany.phone || ''}
                    onChange={(e) => updateCompany({ phone: e.target.value || null })}
                    className="w-full rounded-lg p-3 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                    placeholder="+49 123 456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Stundensatz (€)
                  </label>
                  <input
                    type="number"
                    value={newCompany.hourly_rate || 75}
                    onChange={(e) => updateCompany({ hourly_rate: parseFloat(e.target.value) || 75 })}
                    className="w-full rounded-lg p-3 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                    placeholder="75"
                    min="0"
                    step="5"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveCompany}
                  disabled={savingCompany || !newCompany.name.trim()}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {savingCompany ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Speichern...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Unternehmen speichern
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowCompanyForm(false)}
                  className="px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  Abbrechen
                </button>
              </div>
            </motion.div>
          )}

          {/* Beschreibung */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Beschreibung
            </label>
            <textarea
              value={project.description || ''}
              onChange={(e) => updateProject({ description: e.target.value || null })}
              rows={3}
              className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none resize-none"
              placeholder="Beschreibung des Projekts..."
            />
          </div>

          {/* Projektdetails */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Projekttyp
              </label>
              <select
                value={project.project_type || 'custom'}
                onChange={(e) => updateProject({ project_type: e.target.value as PMProject['project_type'] })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
              >
                {Object.entries(projectTypeConfig).map(([type, config]) => (
                  <option key={type} value={type} className="bg-gray-800">
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Status
              </label>
              <select
                value={project.status}
                onChange={(e) => updateProject({ status: e.target.value as PMProject['status'] })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
              >
                {Object.entries(statusConfig).map(([status, config]) => (
                  <option key={status} value={status} className="bg-gray-800">
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Priorität
              </label>
              <select
                value={project.priority}
                onChange={(e) => updateProject({ priority: e.target.value as PMProject['priority'] })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
              >
                {Object.entries(priorityConfig).map(([priority, config]) => (
                  <option key={priority} value={priority} className="bg-gray-800">
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Zeitplanung */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Zeitplanung</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Startdatum
                </label>
                <input
                  type="date"
                  value={formatDate(project.start_date)}
                  onChange={(e) => updateProject({ start_date: e.target.value || null })}
                  className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Enddatum
                </label>
                <input
                  type="date"
                  value={formatDate(project.end_date)}
                  onChange={(e) => updateProject({ end_date: e.target.value || null })}
                  className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Geschätzte Stunden
                </label>
                <input
                  type="number"
                  value={project.estimated_hours || ''}
                  onChange={(e) => updateProject({ estimated_hours: parseInt(e.target.value) || null })}
                  className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                  placeholder="40"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Finanzen */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Finanzplanung</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Abrechnungsart
                </label>
                <select
                  value={project.billing_type}
                  onChange={(e) => updateProject({ billing_type: e.target.value as PMProject['billing_type'] })}
                  className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
                >
                  <option value="hourly" className="bg-gray-800">Stündlich</option>
                  <option value="fixed" className="bg-gray-800">Festpreis</option>
                  <option value="milestone" className="bg-gray-800">Meilensteine</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Budget (€)
                </label>
                <input
                  type="number"
                  value={project.budget || ''}
                  onChange={(e) => updateProject({ budget: parseFloat(e.target.value) || null })}
                  className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                  placeholder="5000"
                  min="0"
                  step="100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Stundensatz (€)
                </label>
                <input
                  type="number"
                  value={project.hourly_rate || ''}
                  onChange={(e) => updateProject({ hourly_rate: parseFloat(e.target.value) || null })}
                  className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                  placeholder="75"
                  min="0"
                  step="5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Festpreis (€)
                </label>
                <input
                  type="number"
                  value={project.fixed_price || ''}
                  onChange={(e) => updateProject({ fixed_price: parseFloat(e.target.value) || null })}
                  className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                  placeholder="5000"
                  min="0"
                  step="100"
                />
              </div>
            </div>
          </div>

          {/* Fortschritt & Notizen */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Fortschritt (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={project.progress_percentage}
                onChange={(e) => updateProject({ progress_percentage: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>0%</span>
                <span className="text-primary font-medium">{project.progress_percentage}%</span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Farbschema
              </label>
              <select
                value={project.color}
                onChange={(e) => updateProject({ color: e.target.value })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
              >
                <option value="from-blue-500 to-cyan-500" className="bg-gray-800">Blau-Cyan</option>
                <option value="from-purple-500 to-pink-500" className="bg-gray-800">Lila-Pink</option>
                <option value="from-green-500 to-emerald-500" className="bg-gray-800">Grün-Emerald</option>
                <option value="from-orange-500 to-red-500" className="bg-gray-800">Orange-Rot</option>
                <option value="from-indigo-500 to-purple-500" className="bg-gray-800">Indigo-Lila</option>
                <option value="from-teal-500 to-blue-500" className="bg-gray-800">Teal-Blau</option>
              </select>
            </div>
          </div>

          {/* Notizen */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Interne Notizen
            </label>
            <textarea
              value={project.notes || ''}
              onChange={(e) => updateProject({ notes: e.target.value || null })}
              rows={4}
              className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none resize-none"
              placeholder="Interne Notizen, Besonderheiten, etc..."
            />
          </div>

          {/* Einstellungen */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={project.is_active}
                onChange={(e) => updateProject({ is_active: e.target.checked })}
                className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-gray-300">Projekt aktiv</span>
            </label>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-white/10 p-6">
          <div className="flex gap-4 justify-end">
            <button
              onClick={onCancel}
              className="px-6 py-3 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Abbrechen
            </button>
            <button
              onClick={() => onSave(project)}
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Speichern...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isCreating ? 'Erstellen' : 'Speichern'}
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
