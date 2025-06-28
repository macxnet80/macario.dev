'use client'

import { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Euro, 
  Clock, 
  Star, 
  Sparkles,
  Bot,
  Calendar,
  Target,
  Zap,
  Copy,
  RefreshCw,
  FileText
} from 'lucide-react'
import { ProjectRequest } from '@/lib/supabase'

interface CRMTabsProps {
  request: ProjectRequest
  editData: ProjectRequest
  setEditData: (data: ProjectRequest) => void
  isEditing: boolean
  activeTab: 'overview' | 'crm' | 'offer'
  optimizeOffer: () => void
  isOptimizing: boolean
  statusConfig: any
  projectTypeConfig: any
  onStatusUpdate: (id: number, status: ProjectRequest['status']) => void
}

export default function CRMTabs({
  request,
  editData,
  setEditData,
  isEditing,
  activeTab,
  optimizeOffer,
  isOptimizing,
  statusConfig,
  projectTypeConfig,
  onStatusUpdate
}: CRMTabsProps) {
  const statusInfo = statusConfig[request.status]
  const projectTypeInfo = projectTypeConfig[request.project_type as keyof typeof projectTypeConfig]

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).toISOString().split('T')[0]
  }

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        {/* Kontakt-Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Kontaktinformationen</h3>
            
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">{request.name}</div>
                <div className="text-sm text-gray-400">Name</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <a href={`mailto:${request.email}`} className="font-medium hover:text-primary">
                  {request.email}
                </a>
                <div className="text-sm text-gray-400">E-Mail</div>
              </div>
            </div>

            {request.company && (
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">{request.company}</div>
                  <div className="text-sm text-gray-400">Firma</div>
                </div>
              </div>
            )}

            {request.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <a href={`tel:${request.phone}`} className="font-medium hover:text-primary">
                    {request.phone}
                  </a>
                  <div className="text-sm text-gray-400">Telefon</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Projekt-Details</h3>
            
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-gray-400" />
              <div>
                <div className={`font-medium ${projectTypeInfo?.color || 'text-white'}`}>
                  {projectTypeInfo?.label || request.project_type}
                </div>
                <div className="text-sm text-gray-400">Projekttyp</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Euro className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-green-400">
                  {new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0
                  }).format(request.budget)}
                </div>
                <div className="text-sm text-gray-400">Budget</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">{request.timeline}</div>
                <div className="text-sm text-gray-400">Timeline</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">{request.priority}</div>
                <div className="text-sm text-gray-400">Priorität</div>
              </div>
            </div>
          </div>
        </div>

        {/* Beschreibung */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Projektbeschreibung</h3>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {request.description}
            </p>
          </div>
        </div>

        {/* Features */}
        {request.features && request.features.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Gewünschte Features</h3>
            <div className="flex flex-wrap gap-2">
              {request.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* KI-Analyse */}
        {request.ai_analysis && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              KI-Analyse von Sam
            </h3>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {request.ai_analysis}
              </div>
            </div>
          </div>
        )}

        {/* Status und Aktionen */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">Status</div>
              <select
                value={request.status}
                onChange={(e) => onStatusUpdate(request.id, e.target.value as any)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-white placeholder-gray-400"
              >
                {Object.entries(statusConfig).map(([status, config]) => (
                  <option key={status} value={status} className="bg-gray-900 text-white">
                    {(config as any).label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-1">Eingegangen</div>
              <div className="text-sm">
                {new Date(request.created_at).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {request.email && (
              <a
                href={`mailto:${request.email}?subject=Re: Projektanfrage - ${projectTypeInfo?.label}&body=Hallo ${request.name},%0D%0A%0D%0Avielen Dank für Ihre Projektanfrage...`}
                className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-all"
              >
                <Mail className="w-4 h-4" />
                E-Mail senden
              </a>
            )}
            {request.phone && (
              <a
                href={`tel:${request.phone}`}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-all"
              >
                <Phone className="w-4 h-4" />
                Anrufen
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (activeTab === 'crm') {
    return (
      <div className="space-y-6">
        {/* Adresse */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            Adresse
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Straße</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.street || ''}
                  onChange={(e) => setEditData({...editData, street: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-white placeholder-gray-400"
                  placeholder="Musterstraße 123"
                />
              ) : (
                <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                  {request.street || 'Nicht angegeben'}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">PLZ</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.postal_code || ''}
                    onChange={(e) => setEditData({...editData, postal_code: e.target.value})}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-white placeholder-gray-400"
                    placeholder="12345"
                  />
                ) : (
                  <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                    {request.postal_code || '-'}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Stadt</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.city || ''}
                    onChange={(e) => setEditData({...editData, city: e.target.value})}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-white placeholder-gray-400"
                    placeholder="Musterstadt"
                  />
                ) : (
                  <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                    {request.city || '-'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Business-Daten */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Business-Daten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Lead-Quelle</label>
              {isEditing ? (
                <select
                  value={editData.lead_source || 'website'}
                  onChange={(e) => setEditData({...editData, lead_source: e.target.value as any})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-white placeholder-gray-400"
                >
                  <option value="website" className="bg-gray-900 text-white">Website</option>
                  <option value="referral" className="bg-gray-900 text-white">Empfehlung</option>
                  <option value="social_media" className="bg-gray-900 text-white">Social Media</option>
                  <option value="direct" className="bg-gray-900 text-white">Direkt</option>
                  <option value="other" className="bg-gray-900 text-white">Sonstiges</option>
                </select>
              ) : (
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${
                  request.lead_source === 'website' || !request.lead_source ? 'bg-blue-500/20 text-blue-400' :
                  request.lead_source === 'referral' ? 'bg-green-500/20 text-green-400' :
                  request.lead_source === 'social_media' ? 'bg-purple-500/20 text-purple-400' :
                  request.lead_source === 'direct' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {request.lead_source === 'website' || !request.lead_source ? '🌐 Website' :
                   request.lead_source === 'referral' ? '👥 Empfehlung' :
                   request.lead_source === 'social_media' ? '📱 Social Media' :
                   request.lead_source === 'direct' ? '📞 Direkt' :
                   '📝 Sonstiges'}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Prioritätslevel</label>
              {isEditing ? (
                                  <select
                    value={editData.priority_level || 'medium'}
                    onChange={(e) => setEditData({...editData, priority_level: e.target.value as any})}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-white placeholder-gray-400"
                  >
                    <option value="low" className="bg-gray-900 text-white">Niedrig</option>
                    <option value="medium" className="bg-gray-900 text-white">Mittel</option>
                    <option value="high" className="bg-gray-900 text-white">Hoch</option>
                    <option value="urgent" className="bg-gray-900 text-white">Dringend</option>
                  </select>
              ) : (
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${
                  request.priority_level === 'low' ? 'bg-gray-500/20 text-gray-400' :
                  request.priority_level === 'medium' || !request.priority_level ? 'bg-yellow-500/20 text-yellow-400' :
                  request.priority_level === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  request.priority_level === 'urgent' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {request.priority_level === 'low' ? '🔵 Niedrig' :
                   request.priority_level === 'medium' || !request.priority_level ? '🟡 Mittel' :
                   request.priority_level === 'high' ? '🟠 Hoch' :
                   request.priority_level === 'urgent' ? '🔴 Dringend' :
                   '🟡 Mittel'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Projekt-Tracking */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-400" />
            Projekt-Tracking
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Nächster Follow-up</label>
              {isEditing ? (
                <input
                  type="date"
                  value={formatDate(editData.next_followup)}
                  onChange={(e) => setEditData({...editData, next_followup: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-white placeholder-gray-400"
                />
              ) : (
                <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                  {request.next_followup ? new Date(request.next_followup).toLocaleDateString('de-DE') : 'Nicht geplant'}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Projektstart (geplant)</label>
              {isEditing ? (
                <input
                  type="date"
                  value={formatDate(editData.project_start_date)}
                  onChange={(e) => setEditData({...editData, project_start_date: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-white placeholder-gray-400"
                />
              ) : (
                <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                  {request.project_start_date ? new Date(request.project_start_date).toLocaleDateString('de-DE') : 'Nicht geplant'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Kalkulation */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Euro className="w-5 h-5 text-yellow-400" />
            Kalkulation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Geschätzte Stunden</label>
              {isEditing ? (
                <input
                  type="number"
                  value={editData.estimated_hours || ''}
                  onChange={(e) => setEditData({...editData, estimated_hours: parseInt(e.target.value) || null})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="40"
                />
              ) : (
                <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                  {request.estimated_hours ? `${request.estimated_hours}h` : 'Nicht geschätzt'}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Stundensatz (€)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={editData.hourly_rate || 75}
                  onChange={(e) => setEditData({...editData, hourly_rate: parseInt(e.target.value) || 75})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="75"
                />
              ) : (
                <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                  {request.hourly_rate || 75}€/h
                </div>
              )}
            </div>
          </div>
          
          {/* Kalkulations-Anzeige */}
          {((editData.estimated_hours && editData.hourly_rate) || (request.estimated_hours && request.hourly_rate)) && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-green-400 flex items-center gap-2">
                  <Euro className="w-4 h-4" />
                  Kalkulierter Gesamtpreis
                </div>
                <div className="text-xs text-gray-400">
                  {(editData.estimated_hours || request.estimated_hours)}h × {(editData.hourly_rate || request.hourly_rate)}€
                </div>
              </div>
              <div className="text-2xl font-bold text-green-300">
                {new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0
                }).format(((editData.estimated_hours || request.estimated_hours) || 0) * ((editData.hourly_rate || request.hourly_rate) || 75))}
              </div>
              
              {/* Vergleich mit Kundenbudget */}
              {request.budget && (
                <div className="mt-3 pt-3 border-t border-green-500/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Kundenbudget:</span>
                    <span className="text-gray-300">
                      {new Intl.NumberFormat('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 0
                      }).format(request.budget)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-400">Differenz:</span>
                    <span className={`font-medium ${
                      ((editData.estimated_hours || request.estimated_hours) || 0) * ((editData.hourly_rate || request.hourly_rate) || 75) <= request.budget 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {((editData.estimated_hours || request.estimated_hours) || 0) * ((editData.hourly_rate || request.hourly_rate) || 75) <= request.budget ? '✅' : '⚠️'} 
                      {' '}
                      {new Intl.NumberFormat('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 0,
                        signDisplay: 'always'
                      }).format(request.budget - (((editData.estimated_hours || request.estimated_hours) || 0) * ((editData.hourly_rate || request.hourly_rate) || 75)))}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notizen */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Interne Notizen</h3>
          {isEditing ? (
            <textarea
              value={editData.notes || ''}
              onChange={(e) => setEditData({...editData, notes: e.target.value})}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none h-32 resize-none"
              placeholder="Interne Notizen, Gesprächsnotizen, etc..."
            />
          ) : (
            <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 min-h-[100px] whitespace-pre-wrap">
              {request.notes || 'Keine Notizen vorhanden'}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (activeTab === 'offer') {
    return (
      <div className="space-y-6">
        {/* Angebots-Status */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-400" />
            Angebots-Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Angebotspreis (€)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={editData.offer_amount || ''}
                  onChange={(e) => setEditData({...editData, offer_amount: parseInt(e.target.value) || null})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder={request.budget.toString()}
                />
              ) : (
                <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                  {request.offer_amount ? new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0
                  }).format(request.offer_amount) : 'Noch nicht erstellt'}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Angebotsdatum</label>
              {isEditing ? (
                <input
                  type="date"
                  value={formatDate(editData.offer_date)}
                  onChange={(e) => setEditData({...editData, offer_date: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                />
              ) : (
                <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                  {request.offer_date ? new Date(request.offer_date).toLocaleDateString('de-DE') : 'Nicht gesetzt'}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Angebotsstatus</label>
              {isEditing ? (
                <div className="space-y-2">
                  <select
                    value={editData.offer_status || 'pending'}
                    onChange={(e) => setEditData({...editData, offer_status: e.target.value as any})}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-white placeholder-gray-400"
                  >
                    <option value="pending" className="bg-gray-900 text-white">Ausstehend</option>
                    <option value="sent" className="bg-gray-900 text-white">Gesendet</option>
                    <option value="accepted" className="bg-gray-900 text-white">Angenommen</option>
                    <option value="rejected" className="bg-gray-900 text-white">Abgelehnt</option>
                  </select>
                  
                  {/* Status-Beschreibung */}
                  <div className="text-xs text-gray-400">
                    {editData.offer_status === 'pending' && 'Angebot wird vorbereitet'}
                    {editData.offer_status === 'sent' && 'Angebot wurde versendet'}
                    {editData.offer_status === 'accepted' && 'Kunde hat zugestimmt'}
                    {editData.offer_status === 'rejected' && 'Angebot wurde abgelehnt'}
                  </div>
                </div>
              ) : (
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${
                  request.offer_status === 'pending' || !request.offer_status ? 'bg-orange-500/20 text-orange-400' :
                  request.offer_status === 'sent' ? 'bg-blue-500/20 text-blue-400' :
                  request.offer_status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                  request.offer_status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {request.offer_status === 'pending' || !request.offer_status ? '⏳ Ausstehend' :
                   request.offer_status === 'sent' ? '📤 Gesendet' :
                   request.offer_status === 'accepted' ? '✅ Angenommen' :
                   request.offer_status === 'rejected' ? '❌ Abgelehnt' :
                   '⏳ Ausstehend'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leistungsbeschreibung */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            Leistungsbeschreibung
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-400">Interne Beschreibung</label>
                {isEditing && editData.offer_description && (
                  <button
                    onClick={optimizeOffer}
                    disabled={isOptimizing}
                    className="flex items-center gap-2 px-3 py-1 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all text-sm disabled:opacity-50"
                  >
                    {isOptimizing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    {isOptimizing ? 'Optimiere...' : 'KI optimieren'}
                  </button>
                )}
              </div>
              {isEditing ? (
                <textarea
                  value={editData.offer_description || ''}
                  onChange={(e) => setEditData({...editData, offer_description: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none h-32 resize-none"
                  placeholder="Beschreibe hier die Leistungen für das Angebot..."
                />
              ) : (
                <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 min-h-[100px] whitespace-pre-wrap">
                  {request.offer_description || 'Noch keine Beschreibung erstellt'}
                </div>
              )}
            </div>

            {/* KI-optimierte Version */}
            {(editData.offer_description_optimized || request.offer_description_optimized) && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-400" />
                    KI-optimierte Version
                  </label>
                  <button
                    onClick={() => {
                      const text = editData.offer_description_optimized || request.offer_description_optimized || ''
                      navigator.clipboard.writeText(text)
                      alert('In Zwischenablage kopiert!')
                    }}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-600 rounded-lg hover:bg-gray-700 transition-all text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Kopieren
                  </button>
                </div>
                <div className="px-3 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg text-gray-300 min-h-[100px] whitespace-pre-wrap">
                  {editData.offer_description_optimized || request.offer_description_optimized}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vertragsstatus */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Vertragsstatus
          </h3>
          
          {isEditing ? (
            <div className="space-y-3">
              <select
                value={editData.contract_status || 'none'}
                onChange={(e) => setEditData({...editData, contract_status: e.target.value as any})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none text-white placeholder-gray-400"
              >
                                                    <option value="none" className="bg-gray-900 text-white">Kein Vertrag</option>
                    <option value="draft" className="bg-gray-900 text-white">Entwurf</option>
                    <option value="sent" className="bg-gray-900 text-white">Gesendet</option>
                    <option value="signed" className="bg-gray-900 text-white">Unterschrieben</option>
                    <option value="completed" className="bg-gray-900 text-white">Abgeschlossen</option>
              </select>
              
              {/* Status-Beschreibung */}
              <div className="text-sm text-gray-400">
                {editData.contract_status === 'none' && 'Noch kein Vertrag erstellt'}
                {editData.contract_status === 'draft' && 'Vertrag wird vorbereitet'}
                {editData.contract_status === 'sent' && 'Vertrag wurde an Kunden gesendet'}
                {editData.contract_status === 'signed' && 'Vertrag wurde unterschrieben'}
                {editData.contract_status === 'completed' && 'Projekt abgeschlossen'}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Visueller Status-Indikator */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                request.contract_status === 'none' ? 'bg-gray-500/20 text-gray-400' :
                request.contract_status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                request.contract_status === 'sent' ? 'bg-blue-500/20 text-blue-400' :
                request.contract_status === 'signed' ? 'bg-green-500/20 text-green-400' :
                request.contract_status === 'completed' ? 'bg-purple-500/20 text-purple-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {request.contract_status === 'none' && '📄 Kein Vertrag'}
                {request.contract_status === 'draft' && '✏️ Entwurf'}
                {request.contract_status === 'sent' && '📤 Gesendet'}
                {request.contract_status === 'signed' && '✅ Unterschrieben'}
                {request.contract_status === 'completed' && '🎉 Abgeschlossen'}
                {!request.contract_status && '📄 Kein Vertrag'}
              </div>
              
              {/* Status-Beschreibung */}
              <div className="text-sm text-gray-400">
                {(request.contract_status === 'none' || !request.contract_status) && 'Noch kein Vertrag erstellt'}
                {request.contract_status === 'draft' && 'Vertrag wird vorbereitet'}
                {request.contract_status === 'sent' && 'Vertrag wurde an Kunden gesendet'}
                {request.contract_status === 'signed' && 'Vertrag wurde unterschrieben - Projekt kann starten'}
                {request.contract_status === 'completed' && 'Projekt wurde erfolgreich abgeschlossen'}
              </div>
              
              {/* Fortschrittsbalken */}
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    request.contract_status === 'none' || !request.contract_status ? 'w-0 bg-gray-500' :
                    request.contract_status === 'draft' ? 'w-1/4 bg-yellow-500' :
                    request.contract_status === 'sent' ? 'w-2/4 bg-blue-500' :
                    request.contract_status === 'signed' ? 'w-3/4 bg-green-500' :
                    request.contract_status === 'completed' ? 'w-full bg-purple-500' :
                    'w-0 bg-gray-500'
                  }`}
                />
              </div>
              
              {/* Status-Schritte */}
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span className={request.contract_status && request.contract_status !== 'none' ? 'text-yellow-400' : ''}>
                  Entwurf
                </span>
                <span className={request.contract_status === 'sent' || request.contract_status === 'signed' || request.contract_status === 'completed' ? 'text-blue-400' : ''}>
                  Gesendet
                </span>
                <span className={request.contract_status === 'signed' || request.contract_status === 'completed' ? 'text-green-400' : ''}>
                  Unterschrieben
                </span>
                <span className={request.contract_status === 'completed' ? 'text-purple-400' : ''}>
                  Abgeschlossen
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
} 