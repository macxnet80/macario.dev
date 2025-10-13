'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import EmotionalStory from '@/components/EmotionalStory'
import SkillsSection from '@/components/SkillsSection'
import ProjectShowcase, { KIAutomatisierungSection } from '@/components/ProjectShowcase'
import CTA from '@/components/CTA'
import StructuredData from '@/components/StructuredData'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Emotional Story Section */}
      <EmotionalStory />

      {/* Skills Section */}
      <SkillsSection />

      {/* Project Showcase */}
      <ProjectShowcase />

      {/* KI & Automatisierung Section */}
      <KIAutomatisierungSection />

      {/* Call to Action */}
      <CTA />



      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-500/30 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-pink-500/30 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-40 right-1/4 w-4 h-4 bg-primary/20 rounded-full animate-pulse delay-1000" />
      </div>
    </main>

    {/* Footer */}
    <Footer />
    </>
  )
} 