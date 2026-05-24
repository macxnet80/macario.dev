'use client'

import { useState } from 'react'
import ProjectWizard from '@/components/ProjectWizard'
import { CTAButton, MonoLabel } from './shared'

export default function FinalCTA() {
  const [showWizard, setShowWizard] = useState(false)

  return (
    <>
      <section className="border-b border-[var(--line)]">
        <div className="landing-container py-24 text-center md:py-[120px]">
          <MonoLabel className="mb-6 block">↳ Letzter Schritt</MonoLabel>
          <h2
            className="mx-auto mt-0 max-w-[1100px] text-balance leading-[0.95] tracking-[var(--head-tracking)]"
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 'var(--head-weight)' as unknown as number,
              fontSize: 'clamp(48px, 7vw, 110px)',
            }}
          >
            Bereit, dein Unternehmen zu&nbsp;
            <span
              className="italic text-[var(--accent)]"
              style={{ fontFamily: 'var(--font-head)' }}
            >
              digitalisieren
            </span>
            ?
          </h2>
          <p className="mx-auto mt-7 max-w-[600px] text-lg leading-normal text-[var(--fg-mute)]">
            30 Minuten. Kostenlos. Unverbindlich. Du bekommst eine konkrete
            Lösungsskizze für dein Vorhaben — direkt vom Macher.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <CTAButton onClick={() => setShowWizard(true)}>
              Strategie-Gespräch buchen <span aria-hidden>→</span>
            </CTAButton>
            <CTAButton
              primary={false}
              onClick={() => {
                window.location.href = 'mailto:lars@macario.dev'
              }}
            >
              lars@macario.dev
            </CTAButton>
          </div>
          <div
            className="mt-9 text-[11px] uppercase tracking-[0.1em] text-[var(--fg-dim)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Antwort innerhalb 24h · Werktags
          </div>
        </div>
      </section>

      {showWizard && <ProjectWizard onClose={() => setShowWizard(false)} />}
    </>
  )
}
