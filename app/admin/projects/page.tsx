'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Sparkles,
  GitBranch,
  Globe,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  ArrowLeft,
  Lock,
  Check,
  AlertTriangle,
  ImageIcon,
  Upload,
  X,
  Camera,
  Pencil,
  Save,
  type LucideIcon,
} from 'lucide-react'
import { supabase, Project } from '@/lib/supabase'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_IMAGE_SIZE = 5 * 1024 * 1024

const adminLabelClass =
  'block text-xs font-mono uppercase tracking-wider text-[var(--fg-mute)] mb-2'
const adminHelperClass = 'mt-2 text-xs leading-relaxed text-[var(--fg-mute)]'
const adminInputClass =
  'w-full rounded-xl border border-[var(--line)] bg-black/40 px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-dim)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 disabled:cursor-not-allowed disabled:opacity-50'
const adminTextareaClass = `${adminInputClass} resize-y min-h-[88px]`
const adminIconFieldClass =
  'flex items-stretch overflow-hidden rounded-xl border border-[var(--line)] bg-black/40 transition-colors focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)]/20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50'
const adminIconSlotClass =
  'flex w-11 shrink-0 items-center justify-center border-r border-[var(--line)] bg-black/20 text-[var(--fg-dim)]'
const adminIconInputClass =
  'min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-[var(--fg)] placeholder:text-[var(--fg-dim)] outline-none'

function AdminIconInput({
  id,
  label,
  helper,
  icon: Icon,
  disabled,
  ...inputProps
}: {
  id: string
  label: string
  helper?: string
  icon: LucideIcon
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className={adminLabelClass}>
        {label}
      </label>
      <div className={adminIconFieldClass}>
        <div className={adminIconSlotClass} aria-hidden="true">
          <Icon className="h-4 w-4 shrink-0" />
        </div>
        <input
          id={id}
          disabled={disabled}
          className={adminIconInputClass}
          {...inputProps}
        />
      </div>
      {helper ? <p className={adminHelperClass}>{helper}</p> : null}
    </div>
  )
}

const ALLOWED_GRADIENTS = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-teal-500 to-emerald-500',
  'from-pink-500 to-rose-500',
]

interface ProjectEditForm {
  title: string
  description: string
  toolsText: string
  featuresText: string
  color: string
  project_url: string
  git_url: string
  project_category: 'personal' | 'client'
  order_index: number
  is_active: boolean
  image_url: string | null
}

function projectToEditForm(project: Project): ProjectEditForm {
  const tools = Array.isArray(project.tools) ? project.tools : []
  const features = Array.isArray(project.features) ? project.features : []

  return {
    title: project.title || '',
    description: project.description || '',
    toolsText: tools.join('\n'),
    featuresText: features.join('\n'),
    color: project.color || ALLOWED_GRADIENTS[0],
    project_url: project.project_url || '',
    git_url: project.git_url || '',
    project_category: project.project_category || 'personal',
    order_index: project.order_index ?? 0,
    is_active: project.is_active ?? true,
    image_url: project.image_url,
  }
}

function parseListInput(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function AdminProjects() {
  const [adminSecret, setAdminSecret] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])

  // Form State
  const [gitUrl, setGitUrl] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [projectCategory, setProjectCategory] = useState<'personal' | 'client'>('personal')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [skipAiScreenshot, setSkipAiScreenshot] = useState(false)

  // Edit project state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<ProjectEditForm | null>(null)
  const [editUploadFile, setEditUploadFile] = useState<File | null>(null)
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null)
  const [editSaving, setEditSaving] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)
  const editPanelRef = useRef<HTMLDivElement>(null)

  const getAdminSecret = () =>
    (typeof window !== 'undefined' ? localStorage.getItem('macario_admin_secret') : null) ||
    adminSecret

  const handleUnauthorized = () => {
    localStorage.removeItem('macario_admin_secret')
    setIsAuthorized(false)
    setAdminSecret('')
    setProjects([])
    setEditingProjectId(null)
    setEditForm(null)
    setEditUploadFile(null)
    setEditPreviewUrl(null)
    if (editFileInputRef.current) editFileInputRef.current.value = ''
  }

  // UI Status
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [fetchingProjects, setFetchingProjects] = useState(true)

  useEffect(() => {
    const savedSecret = localStorage.getItem('macario_admin_secret')
    if (savedSecret) {
      setAdminSecret(savedSecret)
      setIsAuthorized(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthorized) {
      fetchProjects()
    }
  }, [isAuthorized])

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  useEffect(() => {
    if (!editUploadFile) {
      setEditPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(editUploadFile)
    setEditPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [editUploadFile])

  const fetchProjects = async () => {
    setFetchingProjects(true)
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (err: unknown) {
      console.error('Fehler beim Laden der Projekte:', err)
      setMessage({ type: 'error', text: 'Projekte konnten nicht geladen werden.' })
    } finally {
      setFetchingProjects(false)
    }
  }

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminSecret.trim()) {
      localStorage.setItem('macario_admin_secret', adminSecret)
      setIsAuthorized(true)
      setMessage(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('macario_admin_secret')
    setAdminSecret('')
    setIsAuthorized(false)
    setProjects([])
  }

  const validateImageFile = (file: File): string | null => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return 'Dateityp nicht erlaubt. Bitte JPG, PNG, WebP oder GIF verwenden.'
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return 'Datei zu groß. Maximale Dateigröße ist 5MB.'
    }
    return null
  }

  const handleFileSelect = (file: File | null) => {
    if (!file) return
    const error = validateImageFile(file)
    if (error) {
      setMessage({ type: 'error', text: error })
      return
    }
    setSelectedFile(file)
    setMessage(null)
  }

  const handleEditFileSelect = (file: File | null) => {
    if (!file) return
    const error = validateImageFile(file)
    if (error) {
      setMessage({ type: 'error', text: error })
      return
    }
    setEditUploadFile(file)
    setMessage(null)
  }

  const clearSelectedFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const uploadImageFile = async (file: File): Promise<string | null> => {
    const secret = getAdminSecret()
    if (!secret) {
      throw new Error('Nicht angemeldet. Bitte erneut anmelden.')
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('adminSecret', secret)

    const response = await fetch('/api/projects/upload-image', {
      method: 'POST',
      body: formData,
    })

    if (response.status === 401) {
      handleUnauthorized()
      throw new Error('Session abgelaufen. Bitte erneut anmelden.')
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || 'Upload fehlgeschlagen.')
    }

    return data.imageUrl
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const secret = getAdminSecret()
    if (!secret) {
      throw new Error('Nicht angemeldet. Bitte erneut anmelden.')
    }

    const response = await fetch('/api/projects/manage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        updates,
        adminSecret: secret,
      }),
    })

    if (response.status === 401) {
      handleUnauthorized()
      throw new Error('Session abgelaufen. Bitte erneut anmelden.')
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || 'Update fehlgeschlagen.')
    }

    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data.project } : p))
    )
    return data.project as Project
  }

  const handleGenerateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gitUrl && !projectUrl) {
      setMessage({ type: 'error', text: 'Bitte gib eine Git-URL oder eine Live-URL an.' })
      return
    }

    setIsLoading(true)
    setLoadingStep(1)
    setMessage(null)

    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < 4 ? prev + 1 : prev))
    }, 2500)

    try {
      let uploadedImageUrl: string | null = null

      if (selectedFile) {
        setLoadingStep(1)
        uploadedImageUrl = await uploadImageFile(selectedFile)
      }

      const response = await fetch('/api/projects/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gitUrl: gitUrl.trim(),
          projectUrl: projectUrl.trim(),
          projectCategory,
          adminSecret: getAdminSecret(),
          imageUrl: uploadedImageUrl,
          skipAiScreenshot,
        }),
      })

      const data = await response.json()
      clearInterval(interval)

      if (data.success) {
        setLoadingStep(5)
        setTimeout(() => {
          setMessage({ type: 'success', text: `Projekt "${data.project.title}" wurde erfolgreich erstellt!` })
          setGitUrl('')
          setProjectUrl('')
          clearSelectedFile()
          setSkipAiScreenshot(false)
          setIsLoading(false)
          setLoadingStep(0)
          fetchProjects()
        }, 1000)
      } else {
        setMessage({ type: 'error', text: data.message || 'Generierung fehlgeschlagen.' })
        setIsLoading(false)
        setLoadingStep(0)
      }
    } catch (error: unknown) {
      clearInterval(interval)
      const text = error instanceof Error ? error.message : 'Ein Netzwerkfehler ist aufgetreten.'
      setMessage({ type: 'error', text })
      setIsLoading(false)
      setLoadingStep(0)
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateProject(id, { is_active: !currentStatus })
      setMessage({ type: 'success', text: 'Status erfolgreich aktualisiert.' })
    } catch (error) {
      console.error(error)
      const text = error instanceof Error ? error.message : 'Fehler beim Aktualisieren des Status.'
      setMessage({ type: 'error', text })
    }
  }

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Möchtest du das Projekt "${title}" wirklich unwiderruflich löschen?`)) {
      return
    }

    try {
      const secret = getAdminSecret()
      if (!secret) {
        throw new Error('Nicht angemeldet. Bitte erneut anmelden.')
      }

      const response = await fetch('/api/projects/manage', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, adminSecret: secret }),
      })

      if (response.status === 401) {
        handleUnauthorized()
        throw new Error('Session abgelaufen. Bitte erneut anmelden.')
      }

      const data = await response.json()
      if (data.success) {
        if (editingProjectId === id) closeProjectEditor()
        setProjects((prev) => prev.filter((p) => p.id !== id))
        setMessage({ type: 'success', text: 'Projekt erfolgreich gelöscht.' })
      } else {
        setMessage({ type: 'error', text: data.message || 'Löschen fehlgeschlagen.' })
      }
    } catch (error) {
      console.error(error)
      const text = error instanceof Error ? error.message : 'Fehler beim Löschen des Projekts.'
      setMessage({ type: 'error', text })
    }
  }

  const openProjectEditor = (project: Project) => {
    setEditingProjectId(String(project.id))
    setEditForm(projectToEditForm(project))
    setEditUploadFile(null)
    setEditPreviewUrl(null)
    if (editFileInputRef.current) editFileInputRef.current.value = ''

    requestAnimationFrame(() => {
      editPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const closeProjectEditor = () => {
    setEditingProjectId(null)
    setEditForm(null)
    setEditUploadFile(null)
    setEditPreviewUrl(null)
    if (editFileInputRef.current) editFileInputRef.current.value = ''
  }

  const updateEditForm = <K extends keyof ProjectEditForm>(key: K, value: ProjectEditForm[K]) => {
    setEditForm((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const handleRegenerateScreenshotInEditor = async () => {
    if (!editForm?.project_url.trim()) {
      setMessage({ type: 'error', text: 'Bitte zuerst eine Live-URL eintragen.' })
      return
    }

    setEditSaving(true)
    try {
      const response = await fetch('/api/projects/capture-screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectUrl: editForm.project_url.trim(),
          adminSecret: getAdminSecret(),
        }),
      })

      if (response.status === 401) {
        handleUnauthorized()
        throw new Error('Session abgelaufen. Bitte erneut anmelden.')
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || 'Screenshot konnte nicht erstellt werden.')
      }

      updateEditForm('image_url', data.imageUrl)
      setEditUploadFile(null)
      setEditPreviewUrl(null)
      if (editFileInputRef.current) editFileInputRef.current.value = ''
      setMessage({ type: 'success', text: 'Screenshot erstellt. Speichern nicht vergessen.' })
    } catch (error: unknown) {
      const text = error instanceof Error ? error.message : 'Screenshot-Generierung fehlgeschlagen.'
      setMessage({ type: 'error', text })
    } finally {
      setEditSaving(false)
    }
  }

  const handleSaveProjectEdit = async () => {
    if (!editingProjectId || !editForm) return

    if (!editForm.title.trim() || !editForm.description.trim()) {
      setMessage({ type: 'error', text: 'Titel und Beschreibung sind Pflichtfelder.' })
      return
    }

    setEditSaving(true)
    try {
      let imageUrl = editForm.image_url

      if (editUploadFile) {
        imageUrl = await uploadImageFile(editUploadFile)
      }

      await updateProject(editingProjectId, {
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        tools: parseListInput(editForm.toolsText),
        features: parseListInput(editForm.featuresText),
        color: ALLOWED_GRADIENTS.includes(editForm.color) ? editForm.color : ALLOWED_GRADIENTS[0],
        project_url: editForm.project_url.trim() || null,
        git_url: editForm.git_url.trim() || null,
        project_category: editForm.project_category,
        order_index: editForm.order_index,
        is_active: editForm.is_active,
        image_url: imageUrl,
      })

      setMessage({ type: 'success', text: 'Projekt erfolgreich gespeichert.' })
      closeProjectEditor()
    } catch (error: unknown) {
      const text = error instanceof Error ? error.message : 'Speichern fehlgeschlagen.'
      setMessage({ type: 'error', text })
    } finally {
      setEditSaving(false)
    }
  }

  const getStepText = () => {
    switch (loadingStep) {
      case 1:
        return 'Analysiere Datenquellen (Webseite und Git Repo)...'
      case 2:
        return 'Lese README und Meta-Tags aus...'
      case 3:
        return 'Erstelle Screenshot aus Live-URL...'
      case 4:
        return 'KI generiert Texte, Features und Design-Farben...'
      case 5:
        return 'Projekt erfolgreich in der Datenbank gespeichert!'
      default:
        return 'Projekt wird generiert...'
    }
  }

  const stepProgress = Math.min(loadingStep * 20, 100)

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-[var(--bg-card)] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />

          <div className="flex flex-col items-center mb-8">
            <div className="h-14 w-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] mb-4">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin-Bereich</h1>
            <p className="text-sm text-[var(--fg-mute)] text-center mt-1">
              Bitte gib dein Administrator-Passwort ein, um fortzufahren.
            </p>
          </div>

          <form onSubmit={handleAuthorize} className="space-y-4">
            <div>
              <label className={adminLabelClass}>
                Passwort / Secret
              </label>
              <input
                type="password"
                required
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                placeholder="••••••••••••"
                className={`${adminInputClass} text-center font-mono`}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--accent)] hover:bg-[var(--accent)]/95 text-[var(--accent-ink)] py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[var(--accent-soft)]"
            >
              Anmelden
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="/" className="text-xs text-[var(--fg-mute)] hover:text-[var(--fg)] inline-flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="h-3 w-3" /> Zurück zur Website
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] p-6 md:p-12 lg:p-16">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--line)] pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Sparkles className="h-7 w-7 text-[var(--accent)]" /> Projekt-Manager
            </h1>
            <p className="text-[var(--fg-mute)] text-sm mt-1">
              Erstelle neue Portfolio-Projekte mithilfe von künstlicher Intelligenz.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm font-medium border border-[var(--line)] px-4 py-2 rounded-xl hover:bg-[var(--bg-alt)] transition-all">
              Zur Website
            </a>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-[var(--danger)] border border-[var(--danger)]/20 px-4 py-2 rounded-xl hover:bg-[var(--danger)]/5 transition-all"
            >
              Abmelden
            </button>
          </div>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                message.type === 'success'
                  ? 'bg-[var(--accent-soft)] border-[var(--accent)]/30 text-[var(--accent)]'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {message.type === 'success' ? <Check className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-medium">{message.text}</p>
              </div>
              <button
                onClick={() => setMessage(null)}
                className="ml-auto text-xs opacity-60 hover:opacity-100 font-bold"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="rounded-3xl border border-[var(--line)] bg-[var(--bg-card)] p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30" />

          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Plus className="h-5 w-5 text-[var(--accent)]" /> Neues Projekt mit KI generieren
          </h2>

          <form onSubmit={handleGenerateProject} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminIconInput
                id="project-url"
                label="Live Website-URL (für Text-Scraping)"
                icon={Globe}
                type="url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://mein-kundenprojekt.de"
                disabled={isLoading}
                helper="Die KI liest die Website aus und kann optional einen Screenshot erstellen."
              />

              <AdminIconInput
                id="git-url"
                label="GitHub Repository URL (für Tech-Stack-Analyse)"
                icon={GitBranch}
                type="url"
                value={gitUrl}
                onChange={(e) => setGitUrl(e.target.value)}
                placeholder="https://github.com/username/repo-name"
                disabled={isLoading}
                helper="Die KI analysiert die README, um eingesetzte Tools & Features zu erkennen."
              />
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-black/20 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-[var(--accent)]" />
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-mute)]">
                  Projekt-Screenshot
                </label>
              </div>

              <div
                className="relative rounded-xl border border-dashed border-[var(--line)] bg-black/30 p-6 text-center hover:border-[var(--accent)]/40 transition-colors cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const file = e.dataTransfer.files?.[0]
                  if (file) handleFileSelect(file)
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  disabled={isLoading}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileSelect(file)
                  }}
                />

                {previewUrl ? (
                  <div className="space-y-3">
                    <div className="relative mx-auto w-full max-w-md aspect-video rounded-lg overflow-hidden border border-[var(--line)]">
                      <Image src={previewUrl} alt="Screenshot Vorschau" fill className="object-cover" unoptimized />
                    </div>
                    <p className="text-sm text-[var(--fg-mute)]">{selectedFile?.name}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        clearSelectedFile()
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300"
                    >
                      <X className="h-3.5 w-3.5" /> Bild entfernen
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-[var(--fg-dim)]" />
                    <p className="text-sm text-[var(--fg-mute)]">Bild hierher ziehen oder klicken zum Hochladen</p>
                    <p className={`${adminHelperClass} text-center`}>JPG, PNG, WebP oder GIF · max. 5MB</p>
                  </div>
                )}
              </div>

              <p className={adminHelperClass}>
                {selectedFile
                  ? 'Manuelles Bild wird verwendet. KI-Screenshot wird übersprungen.'
                  : projectUrl && !skipAiScreenshot
                    ? 'Ohne Upload wird automatisch ein Screenshot aus der Live-URL erstellt.'
                    : 'Optional: Live-URL angeben für automatischen KI-Screenshot.'}
              </p>

              {projectUrl && !selectedFile && (
                <label className="flex items-center gap-2 text-sm text-[var(--fg-mute)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={skipAiScreenshot}
                    onChange={(e) => setSkipAiScreenshot(e.target.checked)}
                    disabled={isLoading}
                    className="rounded border-[var(--line)]"
                  />
                  KI-Screenshot überspringen
                </label>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[var(--line)]">
              <div>
                <label className={adminLabelClass}>
                  Projekt-Kategorie
                </label>
                <div className="flex gap-2 bg-black/40 p-1.5 rounded-xl border border-[var(--line)]">
                  <button
                    type="button"
                    onClick={() => setProjectCategory('personal')}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                      projectCategory === 'personal'
                        ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                        : 'text-[var(--fg-mute)] hover:text-[var(--fg)]'
                    }`}
                    disabled={isLoading}
                  >
                    Eigenes Projekt
                  </button>
                  <button
                    type="button"
                    onClick={() => setProjectCategory('client')}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                      projectCategory === 'client'
                        ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                        : 'text-[var(--fg-mute)] hover:text-[var(--fg)]'
                    }`}
                    disabled={isLoading}
                  >
                    Kundenprojekt
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 disabled:opacity-50 text-[var(--accent-ink)] px-6 py-3.5 rounded-xl font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5 shadow-md"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Projekt wird generiert...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" /> Projekt mit KI erstellen
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-black/60 rounded-2xl border border-[var(--line)] p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{getStepText()}</span>
                    <span className="text-xs font-mono text-[var(--accent)]">{stepProgress}%</span>
                  </div>
                  <div className="w-full bg-[var(--line)] h-2 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-[var(--accent)] h-full rounded-full"
                      animate={{ width: `${stepProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-mono text-[var(--fg-mute)]">
                    <div className={loadingStep >= 1 ? 'text-[var(--accent)]' : ''}>Auslesen</div>
                    <div className={loadingStep >= 2 ? 'text-[var(--accent)]' : ''}>Analysieren</div>
                    <div className={loadingStep >= 3 ? 'text-[var(--accent)]' : ''}>Screenshot</div>
                    <div className={loadingStep >= 4 ? 'text-[var(--accent)]' : ''}>Generieren</div>
                    <div className={loadingStep >= 5 ? 'text-[var(--accent)]' : ''}>Speichern</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Bestehende Portfolio-Projekte</h2>

          {fetchingProjects ? (
            <div className="flex flex-col items-center justify-center py-20 border border-[var(--line)] bg-[var(--bg-card)] rounded-3xl">
              <Loader2 className="h-10 w-10 animate-spin text-[var(--fg-mute)] mb-4" />
              <p className="text-sm text-[var(--fg-mute)]">Portfolio wird ausgelesen...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 border border-[var(--line)] bg-[var(--bg-card)] rounded-3xl">
              <Globe className="h-10 w-10 mx-auto text-[var(--fg-dim)] mb-3" />
              <p className="text-[var(--fg-mute)]">Bisher keine Projekte in der Datenbank vorhanden.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`rounded-2xl border border-[var(--line)] bg-[var(--bg-card)] p-5 transition-all ${
                    !project.is_active ? 'opacity-60 grayscale' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex gap-4 max-w-2xl">
                      <div className="relative w-24 h-16 shrink-0 rounded-lg overflow-hidden border border-[var(--line)] bg-black/30">
                        {project.image_url ? (
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-[var(--fg-dim)]" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          <span
                            className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${
                              project.project_category === 'client'
                                ? 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/10'
                                : 'bg-white/10 text-white border border-white/5'
                            }`}
                          >
                            {project.project_category === 'client' ? 'Kundenprojekt' : 'Eigenes Projekt'}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--fg-mute)] line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(project.tools ?? []).map((tool) => (
                            <span
                              key={tool}
                              className="text-xs bg-black/40 border border-[var(--line)] px-2 py-0.5 rounded-md text-[var(--fg-mute)]"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const projectId = String(project.id)
                          if (editingProjectId === projectId) {
                            closeProjectEditor()
                          } else {
                            openProjectEditor(project)
                          }
                        }}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          editingProjectId === String(project.id)
                            ? 'border-[var(--accent)]/20 bg-[var(--accent-soft)] text-[var(--accent)]'
                            : 'border-[var(--line)] hover:bg-white/5 text-[var(--fg-mute)] hover:text-[var(--fg)]'
                        }`}
                        title="Projekt bearbeiten"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleActive(String(project.id), project.is_active)}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          project.is_active
                            ? 'border-[var(--accent)]/20 hover:bg-[var(--accent-soft)] text-[var(--accent)]'
                            : 'border-[var(--line)] hover:bg-white/5 text-[var(--fg-dim)]'
                        }`}
                        title={project.is_active ? 'Projekt verbergen' : 'Projekt anzeigen'}
                      >
                        {project.is_active ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(String(project.id), project.title)}
                        className="p-2.5 rounded-xl border border-red-500/20 hover:bg-red-500/5 text-red-400 transition-colors"
                        title="Projekt löschen"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {editingProjectId === String(project.id) && editForm && (
                      <div
                        ref={editPanelRef}
                        className="mt-4 pt-4 border-t border-[var(--line)] space-y-5"
                      >
                        <p className="text-sm font-medium">Projekt bearbeiten</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className={adminLabelClass}>
                              Titel
                            </label>
                            <input
                              type="text"
                              value={editForm.title}
                              onChange={(e) => updateEditForm('title', e.target.value)}
                              className={adminInputClass}
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className={adminLabelClass}>
                              Beschreibung
                            </label>
                            <textarea
                              value={editForm.description}
                              onChange={(e) => updateEditForm('description', e.target.value)}
                              rows={3}
                              className={adminTextareaClass}
                            />
                          </div>

                          <AdminIconInput
                            id={`edit-project-url-${project.id}`}
                            label="Live-URL"
                            icon={Globe}
                            type="url"
                            value={editForm.project_url}
                            onChange={(e) => updateEditForm('project_url', e.target.value)}
                            placeholder="https://mein-projekt.de"
                          />

                          <AdminIconInput
                            id={`edit-git-url-${project.id}`}
                            label="Git-URL"
                            icon={GitBranch}
                            type="url"
                            value={editForm.git_url}
                            onChange={(e) => updateEditForm('git_url', e.target.value)}
                            placeholder="https://github.com/username/repo"
                          />

                          <div>
                            <label className={adminLabelClass}>
                              Tools (eine pro Zeile)
                            </label>
                            <textarea
                              value={editForm.toolsText}
                              onChange={(e) => updateEditForm('toolsText', e.target.value)}
                              rows={4}
                              className={`${adminTextareaClass} font-mono`}
                            />
                          </div>

                          <div>
                            <label className={adminLabelClass}>
                              Features (eine pro Zeile)
                            </label>
                            <textarea
                              value={editForm.featuresText}
                              onChange={(e) => updateEditForm('featuresText', e.target.value)}
                              rows={4}
                              className={adminTextareaClass}
                            />
                          </div>

                          <div>
                            <label className={adminLabelClass}>
                              Farbverlauf
                            </label>
                            <select
                              value={editForm.color}
                              onChange={(e) => updateEditForm('color', e.target.value)}
                              className={adminInputClass}
                            >
                              {ALLOWED_GRADIENTS.map((gradient) => (
                                <option key={gradient} value={gradient}>
                                  {gradient}
                                </option>
                              ))}
                            </select>
                            <div className={`mt-2 h-8 rounded-lg bg-gradient-to-r ${editForm.color}`} />
                          </div>

                          <div>
                            <label className={adminLabelClass}>
                              Reihenfolge
                            </label>
                            <input
                              type="number"
                              min={0}
                              value={editForm.order_index}
                              onChange={(e) => updateEditForm('order_index', Number(e.target.value) || 0)}
                              className={adminInputClass}
                            />
                          </div>

                          <div>
                            <label className={adminLabelClass}>
                              Kategorie
                            </label>
                            <div className="flex gap-2 bg-black/40 p-1.5 rounded-xl border border-[var(--line)]">
                              <button
                                type="button"
                                onClick={() => updateEditForm('project_category', 'personal')}
                                className={`flex-1 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                                  editForm.project_category === 'personal'
                                    ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                                    : 'text-[var(--fg-mute)] hover:text-[var(--fg)]'
                                }`}
                              >
                                Eigenes Projekt
                              </button>
                              <button
                                type="button"
                                onClick={() => updateEditForm('project_category', 'client')}
                                className={`flex-1 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                                  editForm.project_category === 'client'
                                    ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                                    : 'text-[var(--fg-mute)] hover:text-[var(--fg)]'
                                }`}
                              >
                                Kundenprojekt
                              </button>
                            </div>
                          </div>

                          <div className="flex items-end">
                            <label className="flex items-center gap-2 text-sm text-[var(--fg-mute)] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={editForm.is_active}
                                onChange={(e) => updateEditForm('is_active', e.target.checked)}
                                className="rounded border-[var(--line)]"
                              />
                              Projekt im Showcase anzeigen
                            </label>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-[var(--line)] bg-black/20 p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-[var(--accent)]" />
                            <p className="text-xs font-mono uppercase tracking-wider text-[var(--fg-mute)]">
                              Screenshot
                            </p>
                          </div>

                          <div
                            className="rounded-xl border border-dashed border-[var(--line)] bg-black/20 p-4 text-center cursor-pointer hover:border-[var(--accent)]/40 transition-colors"
                            onClick={() => editFileInputRef.current?.click()}
                          >
                            <input
                              ref={editFileInputRef}
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleEditFileSelect(file)
                              }}
                            />

                            {editPreviewUrl ? (
                              <div className="relative mx-auto w-full max-w-sm aspect-video rounded-lg overflow-hidden border border-[var(--line)]">
                                <Image src={editPreviewUrl} alt="Neue Vorschau" fill className="object-cover" unoptimized />
                              </div>
                            ) : editForm.image_url ? (
                              <div className="relative mx-auto w-full max-w-sm aspect-video rounded-lg overflow-hidden border border-[var(--line)]">
                                <Image src={editForm.image_url} alt="Aktueller Screenshot" fill className="object-cover" sizes="384px" />
                              </div>
                            ) : (
                              <div className="py-6 text-[var(--fg-dim)] text-sm">Bild auswählen oder Screenshot generieren</div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {editForm.project_url.trim() && (
                              <button
                                type="button"
                                onClick={handleRegenerateScreenshotInEditor}
                                disabled={editSaving}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border border-[var(--line)] hover:bg-white/5 disabled:opacity-50"
                              >
                                {editSaving ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Camera className="h-3.5 w-3.5" />
                                )}
                                Aus Live-URL generieren
                              </button>
                            )}

                            {editForm.image_url && (
                              <button
                                type="button"
                                onClick={() => {
                                  updateEditForm('image_url', null)
                                  setEditUploadFile(null)
                                  setEditPreviewUrl(null)
                                  if (editFileInputRef.current) editFileInputRef.current.value = ''
                                }}
                                disabled={editSaving}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border border-red-500/20 text-red-400 hover:bg-red-500/5 disabled:opacity-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Screenshot entfernen
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <button
                            type="button"
                            onClick={handleSaveProjectEdit}
                            disabled={editSaving}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-[var(--accent-ink)] disabled:opacity-50"
                          >
                            {editSaving ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Save className="h-4 w-4" />
                            )}
                            Änderungen speichern
                          </button>

                          <button
                            type="button"
                            onClick={closeProjectEditor}
                            disabled={editSaving}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-[var(--line)] hover:bg-white/5 disabled:opacity-50"
                          >
                            Abbrechen
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
