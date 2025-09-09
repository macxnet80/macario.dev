'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Play, 
  Pause, 
  Square,
  X,
  Save,
  User,
  FolderOpen,
  CheckSquare,
  Building2
} from 'lucide-react'
import { timeEntriesApi, pmProjectsApi, tasksApi, companiesApi, PMProject, Task, Company, TimeEntry, isSupabaseConfigured } from '@/lib/supabase'

interface TimeTrackingModalProps {
  isOpen: boolean
  onClose: () => void
  preSelectedProject?: string
  preSelectedTask?: string
  onTimerUpdate?: (isRunning: boolean, entry?: TimeEntry) => void
}

const activityTypes = [
  { value: 'development', label: 'Entwicklung', color: 'bg-blue-500' },
  { value: 'design', label: 'Design', color: 'bg-purple-500' },
  { value: 'meeting', label: 'Meeting', color: 'bg-green-500' },
  { value: 'research', label: 'Recherche', color: 'bg-yellow-500' },
  { value: 'testing', label: 'Testing', color: 'bg-red-500' },
  { value: 'other', label: 'Sonstiges', color: 'bg-gray-500' }
]

export default function TimeTrackingModal({ 
  isOpen, 
  onClose, 
  preSelectedProject, 
  preSelectedTask,
  onTimerUpdate 
}: TimeTrackingModalProps) {
  const [projects, setProjects] = useState<(PMProject & { companies?: Company })[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(false)
  
  // Timer State
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentTimer, setCurrentTimer] = useState<TimeEntry | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  
  // Form State
  const [selectedProject, setSelectedProject] = useState<string>(preSelectedProject || '')
  const [selectedTask, setSelectedTask] = useState<string>(preSelectedTask || '')
  const [selectedActivity, setSelectedActivity] = useState<string>('development')
  const [description, setDescription] = useState<string>('')
  const [isBillable, setIsBillable] = useState<boolean>(true)
  const [hourlyRate, setHourlyRate] = useState<number>(75)

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isTimerRunning && startTime) {
      interval = setInterval(() => {
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000)
        setElapsedTime(elapsed)
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, startTime])

  // Daten laden
  const loadData = async () => {
    if (!isSupabaseConfigured()) return
    
    try {
      setLoading(true)
      const [projectsData, companiesData] = await Promise.all([
        pmProjectsApi.getAllProjects(),
        companiesApi.getAllCompanies()
      ])
      
      setProjects(projectsData)
      setCompanies(companiesData)
      
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error)
    } finally {
      setLoading(false)
    }
  }

  // Tasks für gewähltes Projekt laden
  const loadTasks = async (projectId: string) => {
    if (!projectId || !isSupabaseConfigured()) return
    
    try {
      const tasksData = await tasksApi.getTasksByProject(projectId)
      setTasks(tasksData)
    } catch (error) {
      console.error('Fehler beim Laden der Tasks:', error)
      setTasks([])
    }
  }

  // Projekt-Änderung
  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId)
    setSelectedTask('')
    
    // Stundensatz automatisch setzen
    const project = projects.find(p => p.id === projectId)
    if (project) {
      const rate = project.hourly_rate || project.companies?.hourly_rate || 75
      setHourlyRate(rate)
      
      // Tasks laden
      loadTasks(projectId)
    }
  }

  // Timer starten
  const startTimer = async () => {
    if (!selectedProject) {
      alert('Bitte wähle ein Projekt aus')
      return
    }

    try {
      const now = new Date()
      setStartTime(now)
      setElapsedTime(0)
      setIsTimerRunning(true)
      
      // Beschreibung generieren falls leer
      let timerDescription = description
      if (!timerDescription) {
        const project = projects.find(p => p.id === selectedProject)
        const task = tasks.find(t => t.id === selectedTask)
        
        if (task) {
          timerDescription = `Arbeit an: ${task.title}`
        } else {
          timerDescription = `Allgemeine Arbeit: ${project?.name || 'Projekt'}`
        }
        setDescription(timerDescription)
      }
      
      // Timer in Datenbank erstellen
      const timerEntry = await timeEntriesApi.startTimer(
        selectedProject,
        selectedTask || undefined,
        timerDescription
      )
      
      setCurrentTimer(timerEntry)
      onTimerUpdate?.(true, timerEntry)
      
    } catch (error) {
      console.error('Fehler beim Starten des Timers:', error)
      alert('Fehler beim Starten des Timers')
      setIsTimerRunning(false)
    }
  }

  // Timer stoppen
  const stopTimer = async () => {
    if (!currentTimer) return
    
    try {
      await timeEntriesApi.stopTimer(currentTimer.id)
      
      // Timer-State zurücksetzen
      setIsTimerRunning(false)
      setCurrentTimer(null)
      setStartTime(null)
      setElapsedTime(0)
      
      onTimerUpdate?.(false)
      
      // Modal schließen nach erfolgreichem Stoppen
      onClose()
      
    } catch (error) {
      console.error('Fehler beim Stoppen des Timers:', error)
      alert('Fehler beim Stoppen des Timers')
    }
  }

  // Zeit formatieren (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Aktiven Timer prüfen beim Öffnen
  useEffect(() => {
    if (isOpen) {
      loadData()
      
      // TODO: Hier könnten wir prüfen, ob bereits ein Timer läuft
      // und diesen laden
    }
  }, [isOpen])

  // Task-Änderung
  useEffect(() => {
    if (selectedProject && selectedProject !== preSelectedProject) {
      loadTasks(selectedProject)
    }
  }, [selectedProject])

  // Vorauswahl setzen
  useEffect(() => {
    if (preSelectedProject) {
      setSelectedProject(preSelectedProject)
      loadTasks(preSelectedProject)
    }
    if (preSelectedTask) {
      setSelectedTask(preSelectedTask)
    }
  }, [preSelectedProject, preSelectedTask])

  const selectedProjectData = projects.find(p => p.id === selectedProject)
  const selectedTaskData = tasks.find(t => t.id === selectedTask)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-purple-400 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Zeiterfassung</h2>
                    <p className="text-white/80 text-sm">Projekt-Timer</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Timer Display */}
            <div className="p-6 text-center border-b border-gray-100">
              <div className="text-4xl font-mono font-bold text-gray-800 mb-4">
                {formatTime(elapsedTime)}
              </div>
              
              {/* Timer Controls */}
              <div className="flex items-center justify-center gap-4">
                {!isTimerRunning ? (
                  <button
                    onClick={startTimer}
                    disabled={!selectedProject}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    <Play className="w-5 h-5" />
                    Timer starten
                  </button>
                ) : (
                  <button
                    onClick={stopTimer}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    <Square className="w-5 h-5" />
                    Timer stoppen
                  </button>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Projekt Auswahl */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kunde / Projekt *
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => handleProjectChange(e.target.value)}
                  disabled={isTimerRunning}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-white text-gray-800"
                >
                  <option value="">Projekt auswählen...</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.companies?.name ? `${project.companies.name} - ` : ''}{project.name}
                    </option>
                  ))}
                </select>
                
                {/* Projekt-Info */}
                {selectedProjectData && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {selectedProjectData.companies && (
                        <>
                          <Building2 className="w-4 h-4" />
                          <span>{selectedProjectData.companies.name}</span>
                          <span className="text-gray-400">•</span>
                        </>
                      )}
                      <FolderOpen className="w-4 h-4" />
                      <span>{selectedProjectData.name}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Aufgabe Auswahl */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Aufgabe (optional)
                </label>
                <select
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  disabled={isTimerRunning || !selectedProject}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-white text-gray-800"
                >
                  <option value="">Allgemeine Arbeit</option>
                  {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.title}
                    </option>
                  ))}
                </select>
                
                {/* Task-Info */}
                {selectedTaskData && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckSquare className="w-4 h-4" />
                      <span>{selectedTaskData.title}</span>
                      {selectedTaskData.category && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                            {selectedTaskData.category}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Aktivitätstyp */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Leistung
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {activityTypes.map((activity) => (
                    <button
                      key={activity.value}
                      onClick={() => setSelectedActivity(activity.value)}
                      disabled={isTimerRunning}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        selectedActivity === activity.value
                          ? `${activity.color} text-white`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {activity.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Beschreibung */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Beschreibung
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isTimerRunning}
                  placeholder="Was wird gemacht? (wird automatisch generiert wenn leer)"
                  rows={2}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-white text-gray-800 resize-none"
                />
              </div>

              {/* Abrechnung */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stundensatz (€)
                  </label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                    disabled={isTimerRunning}
                    min="0"
                    step="5"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-white text-gray-800"
                  />
                </div>
                
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBillable}
                      onChange={(e) => setIsBillable(e.target.checked)}
                      disabled={isTimerRunning}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Abrechenbar
                    </span>
                  </label>
                </div>
              </div>

              {/* Status */}
              {isTimerRunning && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Timer läuft...</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}


