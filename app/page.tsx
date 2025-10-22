'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
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


      {/* Skills Section */}
      <SkillsSection />

      {/* Project Showcase */}
      <ProjectShowcase />

      {/* KI & Automatisierung Section */}
      <KIAutomatisierungSection />

      {/* Call to Action */}
      <CTA />



    </main>

    {/* Footer */}
    <Footer />
    </>
  )
} 