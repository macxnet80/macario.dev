'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Play, 
  Square, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Search,
  Save,
  X,
  ArrowLeft,
  FolderOpen,
  Timer,
  Building2
} from 'lucide-react'
import { timeEntriesApi, pmProjectsApi, tasksApi, TimeEntry, PMProject, Company, Task, isSupabaseConfigured } from '@/lib/supabase'

const activityTypeConfig = {
  development: { label: 'Entwicklung', color: 'bg-blue-500/20 text-blue-400' },
  design: { label: 'Design', color: 'bg-purple-500/20 text-purple-400' },
  meeting: { label: 'Meeting', color: 'bg-green-500/20 text-green-400' },
  research: { label: 'Recherche', color: 'bg-yellow-500/20 text-yellow-400' },
  testing: { label: 'Testing', color: 'bg-red-500/20 text-red-400' },
  other: { label: 'Sonstiges', color: 'bg-gray-500/20 text-gray-400' }
}

export default function TimeTrackingPage() {
  const [timeEntries, setTimeEntries] = useState<(TimeEntry & { tasks?: Task })[]>([])
  const [project, setProject] = useState<PMProject & { companies?: Company } | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('today')
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeTimer, setActiveTimer] = useState<TimeEntry | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [projectId, setProjectId] = useState<string>('')

  // Timer für Live-Update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

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
      
      const [timeEntriesData, projectData, tasksData] = await Promise.all([
        timeEntriesApi.getTimeEntriesByProject(projectId),
        pmProjectsApi.getProject(projectId),
        tasksApi.getTasksByProject(projectId)
      ])
      
      setTimeEntries(timeEntriesData)
      setProject(projectData)
      setTasks(tasksData)

      // Aktiven Timer finden
      const runningTimer = timeEntriesData.find(entry => !entry.end_time)
      setActiveTimer(runningTimer || null)
      
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

  // Timer starten
  const startTimer = async (taskId?: string, description?: string) => {
    if (!projectId) return
    
    try {
      // Aktiven Timer stoppen falls vorhanden
      if (activeTimer) {
        await timeEntriesApi.stopTimer(activeTimer.id)
      }
      
      const newTimer = await timeEntriesApi.startTimer(projectId, taskId, description)
      setActiveTimer(newTimer)
      await loadData()
    } catch (error) {
      console.error('Fehler beim Starten des Timers:', error)
      alert('Fehler beim Starten des Timers')
    }
  }

  // Timer stoppen
  const stopTimer = async () => {
    if (!activeTimer) return
    
    try {
      await timeEntriesApi.stopTimer(activeTimer.id)
      setActiveTimer(null)
      await loadData()
    } catch (error) {
      console.error('Fehler beim Stoppen des Timers:', error)
      alert('Fehler beim Stoppen des Timers')
    }
  }

  // Manuelle Zeit-Eingabe
  const handleCreateTimeEntry = () => {
    if (!projectId) return
    
    const newEntry: Omit<TimeEntry, 'id' | 'created_at' | 'updated_at'> = {
      project_id: projectId,
      task_id: null,
      start_time: new Date().toISOString(),
      end_time: null,
      duration_minutes: 60,
      description: null,
      activity_type: 'development',
      is_billable: true,
      hourly_rate: project?.hourly_rate || project?.companies?.hourly_rate || null,
      user_name: 'Admin'
    }
    setEditingEntry(newEntry as TimeEntry)
    setIsCreating(true)
  }

  // Zeit-Eintrag speichern
  const handleSaveTimeEntry = async (entry: TimeEntry) => {
    try {
      setSaving(true)
      
      if (isCreating) {
        await timeEntriesApi.createTimeEntry(entry)
      } else {
        await timeEntriesApi.updateTimeEntry(entry.id, entry)
      }
      
      await loadData()
      setEditingEntry(null)
      setIsCreating(false)
      
    } catch (error: any) {
      console.error('Fehler beim Speichern:', error)
      alert(`Fehler beim Speichern des Zeit-Eintrags: ${error.message || error}`)
    } finally {
      setSaving(false)
    }
  }

  // Zeit-Eintrag löschen
  const handleDeleteTimeEntry = async (id: string) => {
    if (!confirm('Zeit-Eintrag wirklich löschen?')) return
    
    try {
      await timeEntriesApi.deleteTimeEntry(id)
      await loadData()
    } catch (error) {
      console.error('Fehler beim Löschen:', error)
      alert('Fehler beim Löschen des Zeit-Eintrags')
    }
  }

  // Datum-Filter berechnen
  const getDateRange = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    switch (dateFilter) {
      case 'today':
        return {
          start: today.toISOString(),
          end: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()
        }
      case 'week':
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay() + 1)
        const endOfWeek = new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000)
        return {
          start: startOfWeek.toISOString(),
          end: endOfWeek.toISOString()
        }
      case 'month':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
        return {
          start: startOfMonth.toISOString(),
          end: endOfMonth.toISOString()
        }
      default:
        return null
    }
  }

  // Gefilterte Zeit-Einträge
  const filteredTimeEntries = timeEntries.filter(entry => {
    const matchesSearch = 
      (entry.description && entry.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (entry.tasks?.title && entry.tasks.title.toLowerCase().includes(searchTerm.toLowerCase()))
    
    // Datum-Filter
    const dateRange = getDateRange()
    const matchesDate = !dateRange || (
      new Date(entry.start_time) >= new Date(dateRange.start) &&
      new Date(entry.start_time) < new Date(dateRange.end)
    )
    
    return (searchTerm === '' || matchesSearch) && matchesDate
  })

  // Timer-Dauer berechnen
  const getTimerDuration = (entry: TimeEntry) => {
    if (entry.duration_minutes) {
      return entry.duration_minutes
    }
    
    if (entry.end_time) {
      const start = new Date(entry.start_time)
      const end = new Date(entry.end_time)
      return Math.round((end.getTime() - start.getTime()) / (1000 * 60))
    }
    
    // Laufender Timer
    const start = new Date(entry.start_time)
    return Math.round((currentTime.getTime() - start.getTime()) / (1000 * 60))
  }

  // Zeit formatieren
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}:${mins.toString().padStart(2, '0')}`
  }

  // Statistiken berechnen
  const stats = {
    totalHours: filteredTimeEntries.reduce((sum, entry) => sum + getTimerDuration(entry), 0) / 60,
    billableHours: filteredTimeEntries.filter(entry => entry.is_billable).reduce((sum, entry) => sum + getTimerDuration(entry), 0) / 60,
    totalEntries: filteredTimeEntries.length,
    totalRevenue: filteredTimeEntries.filter(entry => entry.is_billable && entry.hourly_rate).reduce((sum, entry) => {
      return sum + (getTimerDuration(entry) / 60) * (entry.hourly_rate || 0)
    }, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="w-[95vw] mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300">Zeittracking wird geladen...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!projectId || !project) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="w-[95vw] mx-auto">
          <div className="text-center py-20">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Kein Projekt ausgewählt</h3>
            <p className="text-gray-400 mb-6">Bitte wähle ein Projekt aus, um Zeit zu erfassen</p>
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
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <a
                  href={`/admin/tasks?project=${projectId}`}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                  title="Zurück zu Aufgaben"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </a>
                <div className={`w-10 h-10 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center`}>
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Zeittracking</h1>
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
                  Zeittracking
                </span>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              {/* Aktiver Timer */}
              {activeTimer && (
                <div className="flex items-center gap-3 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <Timer className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium">
                      {formatDuration(getTimerDuration(activeTimer))}
                    </span>
                  </div>
                  <button
                    onClick={stopTimer}
                    className="p-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                    title="Timer stoppen"
                  >
                    <Square className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              <button
                onClick={handleCreateTimeEntry}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all"
              >
                <Plus className="w-5 h-5" />
                Zeit hinzufügen
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Gesamt-Stunden */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-400 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {stats.totalHours.toFixed(1)}h
                  </div>
                  <div className="text-sm text-gray-400">Gesamt-Stunden</div>
                </div>
              </div>

              {/* Abrechenbare Stunden */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center">
                  <Timer className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {stats.billableHours.toFixed(1)}h
                  </div>
                  <div className="text-sm text-gray-400">Abrechenbar</div>
                </div>
              </div>

              {/* Anzahl Einträge */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.totalEntries}</div>
                  <div className="text-sm text-gray-400">Einträge</div>
                </div>
              </div>

              {/* Umsatz */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-xl flex items-center justify-center">
                  <div className="text-lg font-bold text-white">€</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {new Intl.NumberFormat('de-DE', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 0
                    }).format(stats.totalRevenue)}
                  </div>
                  <div className="text-sm text-gray-400">Umsatz</div>
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
                placeholder="Suche nach Aufgabe oder Beschreibung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-400"
              />
            </div>

            {/* Datum Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-primary text-white"
            >
              <option value="today" className="bg-gray-900">Heute</option>
              <option value="week" className="bg-gray-900">Diese Woche</option>
              <option value="month" className="bg-gray-900">Dieser Monat</option>
              <option value="all" className="bg-gray-900">Alle</option>
            </select>
          </div>
        </div>

        {/* Quick Timer für Aufgaben */}
        {tasks.length > 0 && (
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Timer für Aufgaben</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {tasks.filter(t => t.status !== 'completed').slice(0, 6).map((task) => (
                <button
                  key={task.id}
                  onClick={() => startTimer(task.id, `Arbeit an: ${task.title}`)}
                  disabled={!!activeTimer}
                  className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Play className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm line-clamp-1">
                        {task.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        {task.category || 'Aufgabe'}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              
              {/* Allgemeiner Timer */}
              <button
                onClick={() => startTimer(undefined, `Allgemeine Arbeit an ${project.name}`)}
                disabled={!!activeTimer}
                className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${project.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Timer className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">
                      Allgemeine Arbeit
                    </div>
                    <div className="text-xs text-gray-400">
                      Projekt: {project.name}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Zeit-Einträge Liste */}
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left p-4 font-medium">Datum</th>
                  <th className="text-left p-4 font-medium">Aufgabe</th>
                  <th className="text-left p-4 font-medium">Aktivität</th>
                  <th className="text-left p-4 font-medium">Dauer</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredTimeEntries.map((entry, index) => {
                  const activityInfo = activityTypeConfig[entry.activity_type || 'other']
                  const duration = getTimerDuration(entry)
                  const isRunning = !entry.end_time
                  
                  return (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-all"
                    >
                      {/* Datum */}
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="text-white">
                            {new Date(entry.start_time).toLocaleDateString('de-DE')}
                          </div>
                          <div className="text-gray-400">
                            {new Date(entry.start_time).toLocaleTimeString('de-DE', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                            {entry.end_time && (
                              <>
                                {' - '}
                                {new Date(entry.end_time).toLocaleTimeString('de-DE', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Aufgabe */}
                      <td className="p-4">
                        <div>
                          <div className="text-white text-sm">
                            {entry.tasks?.title || 'Allgemeine Arbeit'}
                          </div>
                          {entry.description && (
                            <div className="text-xs text-gray-400 max-w-xs truncate">
                              {entry.description}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Aktivität */}
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${activityInfo.color}`}>
                          {activityInfo.label}
                        </span>
                      </td>

                      {/* Dauer */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {isRunning && (
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          )}
                          <span className={`font-medium ${isRunning ? 'text-green-400' : 'text-white'}`}>
                            {formatDuration(duration)}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            entry.is_billable 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {entry.is_billable ? 'Abrechenbar' : 'Intern'}
                          </span>
                          {entry.hourly_rate && (
                            <span className="text-xs text-gray-400">
                              {entry.hourly_rate}€/h
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Aktionen */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {isRunning ? (
                            <button
                              onClick={() => stopTimer()}
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                              title="Timer stoppen"
                            >
                              <Square className="w-4 h-4" />
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => setEditingEntry(entry)}
                                className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
                                title="Bearbeiten"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteTimeEntry(entry.id)}
                                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                                title="Löschen"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredTimeEntries.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Keine Zeit-Einträge gefunden</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingEntry && (
        <TimeEntryEditModal
          entry={editingEntry}
          project={project}
          tasks={tasks}
          isCreating={isCreating}
          saving={saving}
          onSave={handleSaveTimeEntry}
          onCancel={() => {
            setEditingEntry(null)
            setIsCreating(false)
          }}
          onChange={setEditingEntry}
        />
      )}
    </div>
  )
}

// Simplified Time Entry Edit Modal
function TimeEntryEditModal({
  entry,
  project,
  tasks,
  isCreating,
  saving,
  onSave,
  onCancel,
  onChange
}: {
  entry: TimeEntry
  project: PMProject & { companies?: Company }
  tasks: Task[]
  isCreating: boolean
  saving: boolean
  onSave: (entry: TimeEntry) => void
  onCancel: () => void
  onChange: (entry: TimeEntry) => void
}) {
  // Formular-Updates
  const updateEntry = (updates: Partial<TimeEntry>) => {
    onChange({ ...entry, ...updates })
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
              {isCreating ? 'Zeit-Eintrag erstellen' : 'Zeit-Eintrag bearbeiten'}
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
          {/* Aufgabe */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Aufgabe (optional)
            </label>
            <select
              value={entry.task_id || ''}
              onChange={(e) => updateEntry({ task_id: e.target.value || null })}
              className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
            >
              <option value="" className="bg-gray-800">Allgemeine Arbeit</option>
              {tasks.map((task) => (
                <option key={task.id} value={task.id} className="bg-gray-800">
                  {task.title}
                </option>
              ))}
            </select>
          </div>

          {/* Zeitangaben */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Startzeit *
              </label>
              <input
                type="datetime-local"
                value={formatDateTime(entry.start_time)}
                onChange={(e) => updateEntry({ start_time: new Date(e.target.value).toISOString() })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Endzeit
              </label>
              <input
                type="datetime-local"
                value={formatDateTime(entry.end_time)}
                onChange={(e) => updateEntry({ end_time: e.target.value ? new Date(e.target.value).toISOString() : null })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Dauer (Minuten)
              </label>
              <input
                type="number"
                value={entry.duration_minutes || ''}
                onChange={(e) => updateEntry({ duration_minutes: parseInt(e.target.value) || null })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="60"
                min="1"
              />
            </div>
          </div>

          {/* Aktivität und Abrechnung */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Aktivität
              </label>
              <select
                value={entry.activity_type || 'other'}
                onChange={(e) => updateEntry({ activity_type: e.target.value as TimeEntry['activity_type'] })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-primary/40 outline-none"
              >
                {Object.entries(activityTypeConfig).map(([type, config]) => (
                  <option key={type} value={type} className="bg-gray-800">
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Stundensatz (€)
              </label>
              <input
                type="number"
                value={entry.hourly_rate || ''}
                onChange={(e) => updateEntry({ hourly_rate: parseFloat(e.target.value) || null })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder={project.hourly_rate?.toString() || project.companies?.hourly_rate?.toString() || "75"}
                min="0"
                step="5"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={entry.is_billable}
                  onChange={(e) => updateEntry({ is_billable: e.target.checked })}
                  className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-gray-300">Abrechenbar</span>
              </label>
            </div>
          </div>

          {/* Beschreibung */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Beschreibung
            </label>
            <textarea
              value={entry.description || ''}
              onChange={(e) => updateEntry({ description: e.target.value || null })}
              rows={3}
              className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none resize-none"
              placeholder="Was wurde gemacht?"
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
              onClick={() => onSave(entry)}
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
