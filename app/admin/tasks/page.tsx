'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  User,
  Search,
  Calendar,
  Play,
  Save,
  X,
  ArrowLeft,
  FolderOpen,
  Timer,
  Building2
} from 'lucide-react'
import TimeTrackingModal from '@/components/TimeTrackingModal'
import GlobalTimerButton from '@/components/GlobalTimerButton'
import { tasksApi, pmProjectsApi, timeEntriesApi, Task, PMProject, Company, isSupabaseConfigured } from '@/lib/supabase'

const statusConfig = {
  todo: { 
    label: 'Zu erledigen', 
    color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    icon: CheckSquare 
  },
  in_progress: { 
    label: 'In Bearbeitung', 
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: Play 
  },
  review: { 
    label: 'Review', 
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    icon: Clock 
  },
  completed: { 
    label: 'Abgeschlossen', 
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: CheckSquare 
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

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [project, setProject] = useState<PMProject & { companies?: Company } | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [projectId, setProjectId] = useState<string>('')
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [selectedTaskForTimer, setSelectedTaskForTimer] = useState<string>('')

  // URL Parameter für Project-Filter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const projectIdParam = urlParams.get('project')
    if (projectIdParam) {
      setProjectId(projectIdParam)
    }
  }, [])

  // Daten laden
  const loadData = async () => {
    try {
      setLoading(true)
      if (!isSupabaseConfigured() || !projectId) {
        console.warn('Supabase nicht konfiguriert oder keine Projekt-ID')
        return
      }
      
      const [tasksData, projectData] = await Promise.all([
        tasksApi.getTasksByProject(projectId),
        pmProjectsApi.getProject(projectId)
      ])
      
      setTasks(tasksData)
      setProject(projectData)
      
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (projectId) {
      loadData()
    }
  }, [projectId])

  // Neue Aufgabe erstellen
  const handleCreateTask = () => {
    if (!projectId) return
    
    const newTask: Omit<Task, 'id' | 'created_at' | 'updated_at'> = {
      project_id: projectId,
      parent_task_id: null,
      title: 'Neue Aufgabe',
      description: null,
      status: 'todo',
      priority: 'medium',
      estimated_hours: null,
      due_date: null,
      completed_at: null,
      assigned_to: 'Admin',
      order_index: tasks.length,
      category: null,
      tags: null,
      notes: null
    }
    setEditingTask(newTask as Task)
    setIsCreating(true)
  }

  // Aufgabe speichern
  const handleSaveTask = async (task: Task) => {
    try {
      setSaving(true)
      
      if (isCreating) {
        await tasksApi.createTask(task)
      } else {
        await tasksApi.updateTask(task.id, task)
      }
      
      await loadData()
      setEditingTask(null)
      setIsCreating(false)
      
    } catch (error: any) {
      console.error('Fehler beim Speichern:', error)
      alert(`Fehler beim Speichern der Aufgabe: ${error.message || error}`)
    } finally {
      setSaving(false)
    }
  }

  // Aufgabe löschen
  const handleDeleteTask = async (id: string) => {
    if (!confirm('Aufgabe wirklich löschen?')) return
    
    try {
      await tasksApi.deleteTask(id)
      await loadData()
    } catch (error) {
      console.error('Fehler beim Löschen:', error)
      alert('Fehler beim Löschen der Aufgabe')
    }
  }

  // Aufgaben-Status aktualisieren
  const updateTaskStatus = async (id: string, status: Task['status']) => {
    try {
      await tasksApi.updateTaskStatus(id, status)
      await loadData()
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Status:', error)
    }
  }

  // Timer öffnen
  const openTimerModal = (taskId?: string) => {
    setSelectedTaskForTimer(taskId || '')
    setShowTimeModal(true)
  }

  // Gefilterte Aufgaben
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.assigned_to && task.assigned_to.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Gruppierung nach Status
  const tasksByStatus = Object.keys(statusConfig).reduce((acc, status) => {
    acc[status as Task['status']] = filteredTasks.filter(task => task.status === status)
    return acc
  }, {} as Record<Task['status'], typeof filteredTasks>)

  // Statistiken berechnen
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300">Aufgaben werden geladen...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!projectId || !project) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Kein Projekt ausgewählt</h3>
            <p className="text-gray-400 mb-6">Bitte wähle ein Projekt aus, um Aufgaben zu verwalten</p>
            <a
              href="/admin/projects"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zu Projekten
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/10 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="w-[95vw] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <a
                  href="/admin/projects"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                  title="Zurück zu Projekten"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </a>
                <div className={`w-10 h-10 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center`}>
                  <CheckSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Aufgaben</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400">{project.name}</span>
                    {project.companies && (
                      <>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-sm">{project.companies.name}</span>
                      </>
                    )}
                  </div>
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
                  className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg border border-white/20 hover:bg-white/20 transition-all font-medium"
                >
                  Projekte
                </a>
                <span className="px-4 py-2 bg-primary/20 text-primary rounded-lg border border-primary/30 font-medium">
                  Aufgaben
                </span>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`/admin/timetracking?project=${projectId}`}
                className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg border border-white/20 hover:bg-white/20 transition-all font-medium flex items-center gap-2"
              >
                <Timer className="w-4 h-4" />
                Zeittracking
              </a>
              <button
                onClick={handleCreateTask}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all"
              >
                <Plus className="w-5 h-5" />
                Neue Aufgabe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[95vw] mx-auto p-8">
        {/* Projekt-Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              
              {/* Projekt-Status */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center`}>
                    <FolderOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {project.companies && (
                        <div className="flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-400">{project.companies.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Aufgaben-Statistiken */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-400 rounded-xl flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.total}</div>
                  <div className="text-sm text-gray-400">Aufgaben</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.inProgress}</div>
                  <div className="text-sm text-gray-400">In Bearbeitung</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.completed}</div>
                  <div className="text-sm text-gray-400">Abgeschlossen</div>
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
                placeholder="Suche nach Aufgabe, Beschreibung oder Zugewiesen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-400"
              />
            </div>

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

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {Object.entries(statusConfig).map(([status, config]) => {
            const statusTasks = tasksByStatus[status as Task['status']] || []
            const IconComponent = config.icon
            
            return (
              <div
                key={status}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                {/* Column Header */}
                <div className={`p-4 border-b border-white/10 ${config.color.replace('text-', 'bg-').replace('/20', '/10')}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
                      <h3 className="font-semibold">{config.label}</h3>
                    </div>
                    <span className="text-sm font-medium">
                      {statusTasks.length}
                    </span>
                  </div>
                </div>

                {/* Tasks */}
                <div className="p-4 space-y-3 min-h-[500px]">
                  {statusTasks.map((task, index) => {
                    const priorityInfo = priorityConfig[task.priority]
                    
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                        onClick={() => setEditingTask(task)}
                      >
                        {/* Task Header */}
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-white line-clamp-2 text-sm">
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-1 ml-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteTask(task.id)
                              }}
                              className="p-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                              title="Löschen"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Task Description */}
                        {task.description && (
                          <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        {/* Task Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${priorityInfo.color}`}>
                              {priorityInfo.label}
                            </span>
                            {task.estimated_hours && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-400">
                                  {task.estimated_hours}h
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Status Change */}
                          <select
                            value={task.status}
                            onChange={(e) => {
                              e.stopPropagation()
                              updateTaskStatus(task.id, e.target.value as Task['status'])
                            }}
                            className="text-xs px-1 py-1 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:border-primary"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {Object.entries(statusConfig).map(([statusKey, statusConf]) => (
                              <option key={statusKey} value={statusKey} className="bg-gray-800">
                                {statusConf.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Due Date */}
                        {task.due_date && (
                          <div className="flex items-center gap-1 mt-2">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-400">
                              {new Date(task.due_date).toLocaleDateString('de-DE')}
                            </span>
                          </div>
                        )}

                        {/* Assigned To */}
                        {task.assigned_to && (
                          <div className="flex items-center gap-1 mt-1">
                            <User className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-400">
                              {task.assigned_to}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}


                  
                  {/* Add Task Button */}
                  <button
                    onClick={handleCreateTask}
                    className="w-full p-3 border-2 border-dashed border-white/20 rounded-lg text-gray-400 hover:text-white hover:border-white/40 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Aufgabe hinzufügen
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-2xl flex items-center justify-center">
              <CheckSquare className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Noch keine Aufgaben</h3>
            <p className="text-gray-400 mb-6">Erstelle die erste Aufgabe für dieses Projekt</p>
            <button
              onClick={handleCreateTask}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Erste Aufgabe erstellen
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingTask && (
        <TaskEditModal
          task={editingTask}
          project={project}
          isCreating={isCreating}
          saving={saving}
          onSave={handleSaveTask}
          onCancel={() => {
            setEditingTask(null)
            setIsCreating(false)
          }}
          onChange={setEditingTask}
        />
      )}

      {/* Time Tracking Modal */}
      <TimeTrackingModal
        isOpen={showTimeModal}
        onClose={() => setShowTimeModal(false)}
        preSelectedProject={projectId}
        preSelectedTask={selectedTaskForTimer}
        onTimerUpdate={(isRunning, entry) => {
          console.log('Timer Update:', isRunning, entry)
        }}
      />

      {/* Global Timer Button */}
      <GlobalTimerButton />
    </div>
  )
}

// Simplified Task Edit Modal
function TaskEditModal({
  task,
  project,
  isCreating,
  saving,
  onSave,
  onCancel,
  onChange
}: {
  task: Task
  project: PMProject & { companies?: Company }
  isCreating: boolean
  saving: boolean
  onSave: (task: Task) => void
  onCancel: () => void
  onChange: (task: Task) => void
}) {
  // Formular-Updates
  const updateTask = (updates: Partial<Task>) => {
    onChange({ ...task, ...updates })
  }

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).toISOString().slice(0, 16)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {isCreating ? 'Neue Aufgabe erstellen' : 'Aufgabe bearbeiten'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          {/* Projekt-Info */}
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
            <FolderOpen className="w-4 h-4" />
            <span>{project.name}</span>
            {project.companies && (
              <>
                <span>•</span>
                <span>{project.companies.name}</span>
              </>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Titel */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Aufgaben-Titel *
            </label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => updateTask({ title: e.target.value })}
              className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="Titel der Aufgabe"
            />
          </div>

          {/* Beschreibung */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Beschreibung
            </label>
            <textarea
              value={task.description || ''}
              onChange={(e) => updateTask({ description: e.target.value || null })}
              rows={3}
              className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none resize-none"
              placeholder="Detaillierte Beschreibung der Aufgabe..."
            />
          </div>

          {/* Status und Priorität */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Status
              </label>
              <select
                value={task.status}
                onChange={(e) => updateTask({ status: e.target.value as Task['status'] })}
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
                value={task.priority}
                onChange={(e) => updateTask({ priority: e.target.value as Task['priority'] })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
              >
                {Object.entries(priorityConfig).map(([priority, config]) => (
                  <option key={priority} value={priority} className="bg-gray-800">
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Kategorie
              </label>
              <input
                type="text"
                value={task.category || ''}
                onChange={(e) => updateTask({ category: e.target.value || null })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="z.B. Frontend, Backend"
              />
            </div>
          </div>

          {/* Zeitplanung */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Geschätzte Stunden
              </label>
              <input
                type="number"
                value={task.estimated_hours || ''}
                onChange={(e) => updateTask({ estimated_hours: parseFloat(e.target.value) || null })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="2.5"
                min="0"
                step="0.5"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Fälligkeitsdatum
              </label>
              <input
                type="datetime-local"
                value={formatDateTime(task.due_date)}
                onChange={(e) => updateTask({ due_date: e.target.value ? new Date(e.target.value).toISOString() : null })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
              />
            </div>
          </div>

          {/* Zugewiesen an */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Zugewiesen an
            </label>
            <input
              type="text"
              value={task.assigned_to || ''}
              onChange={(e) => updateTask({ assigned_to: e.target.value || null })}
              className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
              placeholder="Benutzername oder Name"
            />
          </div>

          {/* Notizen */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Interne Notizen
            </label>
            <textarea
              value={task.notes || ''}
              onChange={(e) => updateTask({ notes: e.target.value || null })}
              rows={3}
              className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none resize-none"
              placeholder="Interne Notizen zur Aufgabe..."
            />
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
              onClick={() => onSave(task)}
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
