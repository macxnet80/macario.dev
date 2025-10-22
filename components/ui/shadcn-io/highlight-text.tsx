'use client'

import { useEffect, useState } from 'react'

interface HighlightTextProps {
  text: string
  className?: string
}

export default function HighlightText({ text, className = '' }: HighlightTextProps) {
  const [highlightWidth, setHighlightWidth] = useState('0%')

  useEffect(() => {
    // Startet nach 500ms
    const startTimer = setTimeout(() => {
      // Animation über 10 Sekunden
      const startTime = Date.now()
      const duration = 1000 // 1 Sekunde
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const currentWidth = progress * 100
        
        setHighlightWidth(`${currentWidth}%`)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }, 500)

    return () => clearTimeout(startTimer)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-30"
        style={{
          width: highlightWidth,
          transform: 'skew(-12deg)',
          transformOrigin: 'left',
          zIndex: 1
        }}
      />
    </span>
  )
}