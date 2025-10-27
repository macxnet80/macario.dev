'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import SkillsSection from '@/components/SkillsSection'
import AboutSection from '@/components/AboutSection'
import ProjectShowcase from '@/components/ProjectShowcase'
import CollaborationProcessSection from '@/components/CollaborationProcessSection'
import CTA from '@/components/CTA'
import StructuredData from '@/components/StructuredData'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <section id="hero" aria-label="Willkommen bei Lars Macario - No/Low-Code Developer">
          <Hero />
        </section>

        {/* Problem Section */}
        <section id="problem" aria-label="Probleme mit traditioneller Web-Entwicklung">
          <ProblemSection />
        </section>

        {/* Skills Section */}
        <section id="skills" aria-label="Technologien und Fähigkeiten">
          <SkillsSection />
        </section>

        {/* About Section */}
        <section id="about" aria-label="Über Lars Macario">
          <AboutSection />
        </section>

        {/* Project Showcase */}
        <section id="projects" aria-label="Projekt-Portfolio und Referenzen">
          <ProjectShowcase />
        </section>

        {/* Collaboration Process Section */}
        <section id="process" aria-label="Zusammenarbeit und Projektablauf">
          <CollaborationProcessSection />
        </section>

        {/* Call to Action */}
        <section id="contact" aria-label="Kontakt und Projektanfrage">
          <CTA />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
} 