'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  MessageSquare
} from 'lucide-react'

interface BookingData {
  name?: string
  email?: string
  phone?: string
  date?: string
  time?: string
  duration?: string
  meetingType?: string
  schedulingPageName?: string
  eventStartTime?: string
  eventEndTime?: string
  inviteeTimezone?: string
  assignedTo?: string
  inviteeUuid?: string
  answer1?: string
}

export default function TerminBestaetigung() {
  const [bookingData, setBookingData] = useState<BookingData>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Parse URL parameters to get booking details
    const urlParams = new URLSearchParams(window.location.search)
    const data: BookingData = {}
    
    // Zeeg specific parameters
    if (urlParams.get('invitee_full_name')) data.name = decodeURIComponent(urlParams.get('invitee_full_name')!)
    if (urlParams.get('invitee_email')) data.email = decodeURIComponent(urlParams.get('invitee_email')!)
    if (urlParams.get('scheduling_page_name')) data.schedulingPageName = decodeURIComponent(urlParams.get('scheduling_page_name')!)
    if (urlParams.get('event_start_time')) data.eventStartTime = urlParams.get('event_start_time')!
    if (urlParams.get('event_end_time')) data.eventEndTime = urlParams.get('event_end_time')!
    if (urlParams.get('invitee_timezone')) data.inviteeTimezone = decodeURIComponent(urlParams.get('invitee_timezone')!)
    if (urlParams.get('assigned_to')) data.assignedTo = decodeURIComponent(urlParams.get('assigned_to')!)
    if (urlParams.get('invitee_uuid')) data.inviteeUuid = urlParams.get('invitee_uuid')!
    if (urlParams.get('answer_1')) data.answer1 = decodeURIComponent(urlParams.get('answer_1')!)
    
    // Parse date and time from event_start_time
    if (data.eventStartTime) {
      try {
        const startDate = new Date(data.eventStartTime)
        data.date = startDate.toISOString().split('T')[0]
        data.time = startDate.toTimeString().split(' ')[0].substring(0, 5)
      } catch (error) {
        console.error('Error parsing date:', error)
      }
    }
    
    setBookingData(data)
    setIsLoading(false)
  }, [])

  const formatDate = (dateString?: string) => {
    if (!dateString && !bookingData.eventStartTime) return 'Termin wird bestätigt'
    try {
      const date = bookingData.eventStartTime ? new Date(bookingData.eventStartTime) : new Date(dateString!)
      return date.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString || 'Termin wird bestätigt'
    }
  }

  const formatTime = (timeString?: string) => {
    if (!timeString && !bookingData.eventStartTime) return 'Zeit wird bestätigt'
    try {
      if (bookingData.eventStartTime) {
        const date = new Date(bookingData.eventStartTime)
        return date.toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      const [hours, minutes] = timeString!.split(':')
      return `${hours}:${minutes} Uhr`
    } catch {
      return timeString || 'Zeit wird bestätigt'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Lade Bestätigungsdetails...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Termin erfolgreich gebucht! 🎉</h1>
            <p className="text-xl text-gray-300">
              Vielen Dank für deine Buchung. Ich freue mich auf unser Gespräch!
            </p>
          </motion.div>

          {/* Booking Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Termindetails
            </h2>
            
            <div className="space-y-4">
              {bookingData.name && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Name:</span>
                  <span className="font-medium">{bookingData.name}</span>
                </div>
              )}
              
              {bookingData.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">E-Mail:</span>
                  <span className="font-medium">{bookingData.email}</span>
                </div>
              )}
              
              {bookingData.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Telefon:</span>
                  <span className="font-medium">{bookingData.phone}</span>
                </div>
              )}
              
              {bookingData.answer1 && (
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Nachricht:</span>
                  <span className="font-medium">{bookingData.answer1}</span>
                </div>
              )}
              
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">Datum:</span>
                  <span className="font-medium">{formatDate(bookingData.date)}</span>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">Uhrzeit:</span>
                  <span className="font-medium">{formatTime(bookingData.time)}</span>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">Format:</span>
                  <span className="font-medium">Online-Meeting (30 Minuten)</span>
                </div>
                
                {bookingData.inviteeTimezone && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-gray-300">Zeitzone:</span>
                    <span className="font-medium">{bookingData.inviteeTimezone}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 p-8 mb-8"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Was passiert als nächstes?
            </h3>
            
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-400">1</span>
                </div>
                <p>Du erhältst eine Bestätigungs-E-Mail mit allen Details und dem Meeting-Link</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-400">2</span>
                </div>
                <p>24 Stunden vor dem Termin erhältst du eine Erinnerung</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-400">3</span>
                </div>
                <p>Wir treffen uns online und besprechen dein Projekt in Ruhe</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-2 gap-4"
          >
            <a
              href="/"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-all"
            >
              <ArrowRight className="w-5 h-5" />
              Zurück zur Startseite
            </a>
            
            <a
              href="https://t.me/larsmacario"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-xl p-4 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Bei Fragen: Telegram
            </a>
          </motion.div>

          {/* Debug Info - Remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mt-8"
            >
              <h4 className="text-yellow-400 font-semibold mb-2">Debug Info (Development only):</h4>
              <pre className="text-xs text-gray-300 overflow-auto">
                {JSON.stringify(bookingData, null, 2)}
              </pre>
            </motion.div>
          )}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8 text-gray-400"
          >
            <p>
              Hast du Fragen? Schreib mir gerne eine E-Mail an{' '}
              <a href="mailto:lars.macario@gmail.com" className="text-primary hover:underline">
                lars.macario@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
