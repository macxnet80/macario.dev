'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectShowcase, { KIAutomatisierungSection } from '@/components/ProjectShowcase'
import CTA from '@/components/CTA'
import StructuredData from '@/components/StructuredData'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <Hero />

      {/* Problem Section */}
      <ProblemSection />

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