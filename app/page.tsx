'use client'

import StructuredData from '@/components/StructuredData'
import Nav from '@/components/landing/Nav'
import Hero from '@/components/landing/Hero'
import StackStrip from '@/components/landing/StackStrip'
import ProblemSolution from '@/components/landing/ProblemSolution'
import Services from '@/components/landing/Services'
import Process from '@/components/landing/Process'
import Stack from '@/components/landing/Stack'
import ProjectShowcase from '@/components/ProjectShowcase'
import About from '@/components/landing/About'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]">
        <Nav />
        <main>
          <Hero />
          <StackStrip />
          <ProblemSolution />
          <Services />
          <Process />
          <Stack />
          <ProjectShowcase />
          <About />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
