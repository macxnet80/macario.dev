'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, Play, Square } from 'lucide-react'
import TimeTrackingModal from './TimeTrackingModal'
import { timeEntriesApi, TimeEntry, isSupabaseConfigured } from '@/lib/supabase'

export default function GlobalTimerButton() {
  const [showModal, setShowModal] = useState(false)
  const [activeTimer, setActiveTimer] = useState<TimeEntry | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  // Aktiven Timer laden beim Start
  useEffect(() => {
    checkActiveTimer()
  }, [])

  // Timer-Update Intervall
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (activeTimer && !activeTimer.end_time) {
      interval = setInterval(() => {
        const startTime = new Date(activeTimer.start_time)
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000)
        setElapsedTime(elapsed)
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [activeTimer])

  // Aktiven Timer prüfen
  const checkActiveTimer = async () => {
    if (!isSupabaseConfigured()) return
    
    try {
      // Hier würden wir normalerweise alle laufenden Timer abfragen
      // Für jetzt vereinfacht
    } catch (error) {
      console.error('Fehler beim Prüfen des aktiven Timers:', error)
    }
  }

  // Timer-Status Update vom Modal
  const handleTimerUpdate = (isRunning: boolean, entry?: TimeEntry) => {
    if (isRunning && entry) {
      setActiveTimer(entry)
      setElapsedTime(0)
    } else {
      setActiveTimer(null)
      setElapsedTime(0)
    }
  }

  // Timer stoppen
  const stopTimer = async () => {
    if (!activeTimer) return
    
    try {
      await timeEntriesApi.stopTimer(activeTimer.id)
      setActiveTimer(null)
      setElapsedTime(0)
    } catch (error) {
      console.error('Fehler beim Stoppen des Timers:', error)
    }
  }

  // Zeit formatieren
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {activeTimer ? (
            // Laufender Timer
            <motion.div
              key="running"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-2xl border border-green-400/30 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center gap-3">
                  {/* Timer Display */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Timer läuft</span>
                    </div>
                    <div className="font-mono text-xl font-bold">
                      {formatTime(elapsedTime)}
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowModal(true)}
                      className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all"
                      title="Timer bearbeiten"
                    >
                      <Timer className="w-5 h-5" />
                    </button>
                    <button
                      onClick={stopTimer}
                      className="p-3 rounded-xl bg-red-500/80 hover:bg-red-500 transition-all"
                      title="Timer stoppen"
                    >
                      <Square className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Timer starten Button
            <motion.button
              key="start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-primary to-purple-400 text-white p-4 rounded-2xl shadow-2xl border border-primary/30 backdrop-blur-sm hover:shadow-3xl hover:scale-105 transition-all duration-300"
              title="Timer starten"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Timer</div>
                  <div className="text-sm opacity-90">Zeit erfassen</div>
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Time Tracking Modal */}
      <TimeTrackingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onTimerUpdate={handleTimerUpdate}
      />
    </>
  )
}


