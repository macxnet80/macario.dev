export interface WizardSubmitPayload {
  projectType: string
  projectTypeLabel?: string
  budget: number
  timeline: string
  timelineLabel?: string
  priority: string
  priorityLabel?: string
  description: string
  features: string[]
  firstName: string
  lastName: string
  email: string
  company?: string
  phone?: string
  source: string
  sourceLabel?: string
  aiAnalysis?: string
  finalPrice?: number | null
  privacyAccepted?: boolean
  marketingAccepted?: boolean
}

export interface WizardOption {
  id: string
  title?: string
  label?: string
}

export function buildWizardSubmitPayload(
  data: {
    projectType: string
    budget: number
    timeline: string
    priority: string
    description: string
    features: string[]
    firstName: string
    lastName: string
    email: string
    company?: string
    phone?: string
    source: string
    privacyAccepted?: boolean
    marketingAccepted?: boolean
  },
  options: {
    projectTypes: WizardOption[]
    timelineOptions: WizardOption[]
    priorityOptions: WizardOption[]
    sourceOptions: WizardOption[]
    finalPrice: number | null
    aiAnalysis?: string
  }
): WizardSubmitPayload {
  const selectedType = options.projectTypes.find((t) => t.id === data.projectType)
  const timelineOption = options.timelineOptions.find((t) => t.id === data.timeline)
  const priorityOption = options.priorityOptions.find((p) => p.id === data.priority)
  const sourceOption = options.sourceOptions.find((s) => s.id === data.source)

  return {
    ...data,
    projectType: data.projectType,
    timeline: data.timeline,
    priority: data.priority,
    source: data.source,
    projectTypeLabel: selectedType?.title || data.projectType,
    timelineLabel: timelineOption?.label || data.timeline,
    priorityLabel: priorityOption?.label || data.priority,
    sourceLabel: sourceOption?.label || data.source,
    finalPrice: options.finalPrice,
    aiAnalysis: options.aiAnalysis || '',
    privacyAccepted: data.privacyAccepted ?? false,
    marketingAccepted: data.marketingAccepted ?? false,
  }
}

export async function submitProjectRequest(payload: WizardSubmitPayload): Promise<void> {
  const response = await fetch('/api/submit-project', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Fehler beim Senden der Anfrage')
  }
}
