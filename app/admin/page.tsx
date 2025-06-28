'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical, Save, X, Upload, ExternalLink, LogOut, Shield } from 'lucide-react'
import { useAllProjects } from '@/hooks/useProjects'
import { projectsApi, storageApi, Project } from '@/lib/supabase'
import { logout } from '@/lib/auth'
import Image from 'next/image'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import {
  CSS,
} from '@dnd-kit/utilities'
export default function AdminPage() {
  const { projects, loading, refetch } = useAllProjects()
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeId, setActiveId] = useState<string | number | null>(null)

  // Drag & Drop Sensoren
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Neues Projekt erstellen
  const handleCreateProject = () => {
    const newProject: Omit<Project, 'id' | 'created_at' | 'updated_at'> = {
      title: 'Neues Projekt',
      description: 'Beschreibung für das neue Projekt...',
      tools: ['Tool 1', 'Tool 2'],
      features: ['Feature 1', 'Feature 2'],
      color: 'from-blue-500 to-cyan-500',
      image_url: null,
      order_index: projects.length,
      is_active: true
    }
    setEditingProject(newProject as Project)
    setIsCreating(true)
  }

  // Projekt speichern
  const handleSaveProject = async (project: Project, imageFile?: File | null) => {
    try {
      setSaving(true)
      
      let finalProject = { ...project }
      
      // Bild hochladen falls vorhanden
      if (imageFile) {
        try {
          // Validiere Datei
          const maxSize = 5 * 1024 * 1024 // 5MB
          if (imageFile.size > maxSize) {
            throw new Error('Datei zu groß. Maximale Dateigröße ist 5MB.')
          }
          
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
          if (!allowedTypes.includes(imageFile.type)) {
            throw new Error('Dateityp nicht erlaubt. Bitte verwenden Sie JPG, PNG, WebP oder GIF.')
          }
          
          // Dateiname erstellen
          const fileExtension = imageFile.name.split('.').pop()?.toLowerCase()
          const fileName = `project-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`
          
          console.log('🔄 Uploading image during save...', { fileName, size: imageFile.size, type: imageFile.type })
          
          // Bild hochladen
          await storageApi.uploadImage(imageFile, fileName)
          
          // Öffentliche URL abrufen
          finalProject.image_url = storageApi.getPublicUrl(fileName)
          console.log('✅ Image uploaded, URL:', finalProject.image_url)
          
        } catch (uploadError: any) {
          console.error('❌ Image upload failed:', uploadError)
          throw new Error(`Bild-Upload fehlgeschlagen: ${uploadError.message}`)
        }
      }
      
      // Projekt speichern mit finaler Image-URL
      if (isCreating) {
        await projectsApi.createProject(finalProject)
      } else {
        await projectsApi.updateProject(finalProject.id, finalProject)
      }
      
      await refetch()
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
  const handleDeleteProject = async (id: number) => {
    if (!confirm('Projekt wirklich löschen?')) return
    
    try {
      await projectsApi.deleteProject(id)
      await refetch()
    } catch (error) {
      console.error('Fehler beim Löschen:', error)
      alert('Fehler beim Löschen des Projekts')
    }
  }

  // Projekt aktivieren/deaktivieren
  const toggleProjectActive = async (project: Project) => {
    try {
      await projectsApi.updateProject(project.id, { 
        is_active: !project.is_active 
      })
      await refetch()
    } catch (error) {
      console.error('Fehler beim Aktualisieren:', error)
    }
  }

  // Drag & Drop Handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (active.id !== over?.id) {
      const oldIndex = projects.findIndex((project) => project.id === active.id)
      const newIndex = projects.findIndex((project) => project.id === over?.id)

      const newProjects = arrayMove(projects, oldIndex, newIndex)

      // Update order_index für alle betroffenen Projekte
      try {
        for (let i = 0; i < newProjects.length; i++) {
          await projectsApi.updateProject(newProjects[i].id, { order_index: i })
        }
        await refetch()
      } catch (error) {
        console.error('Fehler beim Sortieren:', error)
        alert('Fehler beim Sortieren der Projekte')
      }
    }
  }

  // Finde das aktive Projekt für das Drag Overlay
  const activeProject = activeId ? projects.find(p => p.id === activeId) : null

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300">Admin-Panel wird geladen...</p>
          </div>
        </div>
      </div>
    )
  }

      return (
      <div className="min-h-screen bg-background">
        {/* Header */}
      <div className="border-b border-white/10 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-400 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
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
                  className="px-4 py-2 bg-primary/20 text-primary rounded-lg border border-primary/30 font-medium"
                >
                  Projekte
                </a>
                <a
                  href="/admin/crm"
                  className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg border border-white/20 hover:bg-white/20 transition-all font-medium"
                >
                  CRM
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
              <button
                onClick={logout}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all border border-red-500/20"
                title="Abmelden"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {/* Projekt-Liste */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projects.map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid gap-6">
              {projects.map((project) => (
                <SortableProjectCard
                  key={project.id}
                  project={project}
                  onToggleActive={toggleProjectActive}
                  onEdit={setEditingProject}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          </SortableContext>
          
          <DragOverlay>
            {activeProject ? (
              <div className="transform rotate-6 scale-105">
                <DragOverlayCard project={activeProject} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-2xl flex items-center justify-center">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Noch keine Projekte</h3>
            <p className="text-gray-400 mb-6">Erstelle dein erstes Projekt für die Showcase</p>
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
          isCreating={isCreating}
          saving={saving}
          onSave={handleSaveProject}
          onCancel={() => {
            setEditingProject(null)
            setIsCreating(false)
          }}
          onChange={setEditingProject}
        />
      )}
    </div>
  )
}

// Sortierbare Projekt-Karte Komponente
function SortableProjectCard({
  project,
  onToggleActive,
  onEdit,
  onDelete,
}: {
  project: Project
  onToggleActive: (project: Project) => void
  onEdit: (project: Project) => void
  onDelete: (id: number) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className={`glass rounded-2xl p-6 border border-white/10 ${
        isDragging ? 'ring-2 ring-primary/50' : ''
      }`}
    >
      <div className="flex items-start gap-6">
        {/* Drag Handle */}
        <div 
          className="flex flex-col items-center pt-2 cursor-move"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          <span className="text-xs text-gray-500 mt-1">{project.order_index}</span>
        </div>

        {/* Projekt Bild */}
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
          {project.image_url ? (
            <Image
              src={project.image_url}
              alt={project.title}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${project.color} opacity-60 flex items-center justify-center`}>
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        {/* Projekt Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => onToggleActive(project)}
                className={`p-2 rounded-lg transition-all ${
                  project.is_active 
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                    : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                }`}
                title={project.is_active ? 'Projekt deaktivieren' : 'Projekt aktivieren'}
              >
                {project.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => onEdit(project)}
                className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                title="Projekt bearbeiten"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                title="Projekt löschen"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex gap-1">
              {project.tools.slice(0, 3).map((tool) => (
                <span key={tool} className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                  {tool}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                  +{project.tools.length - 3}
                </span>
              )}
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{project.features.length} Features</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Drag Overlay Karte (ohne Interaktionen)
function DragOverlayCard({ project }: { project: Project }) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/10 shadow-2xl bg-gray-900/95">
      <div className="flex items-start gap-6">
        {/* Drag Handle */}
        <div className="flex flex-col items-center pt-2">
          <GripVertical className="w-5 h-5 text-primary" />
          <span className="text-xs text-gray-500 mt-1">{project.order_index}</span>
        </div>

        {/* Projekt Bild */}
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
          {project.image_url ? (
            <Image
              src={project.image_url}
              alt={project.title}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${project.color} opacity-60 flex items-center justify-center`}>
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        {/* Projekt Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex gap-1">
              {project.tools.slice(0, 3).map((tool) => (
                <span key={tool} className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                  {tool}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                  +{project.tools.length - 3}
                </span>
              )}
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{project.features.length} Features</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Projekt Edit Modal Komponente
function ProjectEditModal({
  project,
  isCreating,
  saving,
  onSave,
  onCancel,
  onChange
}: {
  project: Project
  isCreating: boolean
  saving: boolean
  onSave: (project: Project, imageFile?: File | null) => void
  onCancel: () => void
  onChange: (project: Project) => void
}) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Formular-Updates
  const updateProject = (updates: Partial<Project>) => {
    onChange({ ...project, ...updates })
  }

  // Array-Updates
  const updateArray = (field: 'tools' | 'features', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean)
    updateProject({ [field]: items })
  }

  // String-Werte für die Input-Felder
  const getArrayAsString = (arr: string[]) => arr.join(', ')

  // Handle file selection with preview
  const handleFileSelect = (file: File) => {
    setImageFile(file)
    
    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Handle save with image
  const handleSave = () => {
    onSave(project, imageFile)
  }

  // Verfügbare Farben
  const colorOptions = [
    { name: 'Blau-Cyan', value: 'from-blue-500 to-cyan-500' },
    { name: 'Lila-Pink', value: 'from-purple-500 to-pink-500' },
    { name: 'Grün-Emerald', value: 'from-green-500 to-emerald-500' },
    { name: 'Orange-Rot', value: 'from-orange-500 to-red-500' },
    { name: 'Indigo-Lila', value: 'from-indigo-500 to-purple-500' },
    { name: 'Teal-Blau', value: 'from-teal-500 to-blue-500' }
  ]

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
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Projekttitel
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateProject({ title: e.target.value })}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="Name des Projekts"
              />
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
                {colorOptions.map((color) => (
                  <option key={color.value} value={color.value} className="bg-gray-800">
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Beschreibung */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Beschreibung
            </label>
            <textarea
              value={project.description}
              onChange={(e) => updateProject({ description: e.target.value })}
              rows={4}
              className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none resize-none"
              placeholder="Detaillierte Beschreibung des Projekts..."
            />
          </div>

          {/* Tools und Features */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Eingesetzte Tools (kommagetrennt)
              </label>
              <input
                type="text"
                defaultValue={getArrayAsString(project.tools)}
                onChange={(e) => updateArray('tools', e.target.value)}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="z.B. React, Supabase, Vercel"
                key={`tools-${project.id}`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Key Features (kommagetrennt)
              </label>
              <input
                type="text"
                defaultValue={getArrayAsString(project.features)}
                onChange={(e) => updateArray('features', e.target.value)}
                className="w-full rounded-xl p-4 bg-white/10 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="z.B. Real-time Updates, Mobile-optimiert"
                key={`features-${project.id}`}
              />
            </div>
          </div>

          {/* Bild Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Projekt-Bild
            </label>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
              {/* Aktuelles Bild oder Vorschau */}
              {(imagePreview || project.image_url) && (
                <div className="space-y-4">
                  <div className="relative w-48 h-32 mx-auto rounded-xl overflow-hidden">
                    <Image
                      src={imagePreview || project.image_url || ''}
                      alt="Projekt Bild"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview(null)
                        updateProject({ image_url: null })
                      }}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Bild entfernen
                    </button>
                  </div>
                </div>
              )}
              
              {/* Upload-Bereich */}
              {!imagePreview && !project.image_url && (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-gray-400 text-sm">
                    Bild wird beim Speichern hochgeladen
                  </p>
                </div>
              )}
              
              {/* Datei-Auswahl */}
              <div className="mt-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileSelect(file)
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-primary/20 text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary/30 transition-all inline-block"
                >
                  {imagePreview || project.image_url ? 'Anderes Bild wählen' : 'Bild auswählen'}
                </label>
              </div>
              
              {/* Datei-Info */}
              {imageFile && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-primary text-sm font-medium">{imageFile.name}</p>
                  <p className="text-gray-400 text-xs">
                    {(imageFile.size / (1024 * 1024)).toFixed(2)} MB - Wird beim Speichern hochgeladen
                  </p>
                </div>
              )}
            </div>
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
              <span className="text-gray-300">Projekt aktiv (sichtbar in Showcase)</span>
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
              onClick={handleSave}
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