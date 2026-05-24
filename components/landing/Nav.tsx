'use client'

import { useState } from 'react'
import { CTAButton } from './shared'
import ProjectWizard from '@/components/ProjectWizard'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Prozess', href: '#prozess' },
  { label: 'Projekte', href: '#projekte' },
  { label: 'Stack', href: '#stack' },
  { label: 'Über mich', href: '#uber-mich' },
]

export default function Nav() {
  const [showWizard, setShowWizard] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] backdrop-blur-[10px]">
        <div className="landing-container flex items-center justify-between py-3.5">
          <div className="flex items-center gap-3.5">
            <div
              className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--accent)] font-mono text-[13px] font-bold text-[var(--accent-ink)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              M
            </div>
            <div className="font-semibold tracking-[-0.01em]">
              macario<span className="text-[var(--fg-dim)]">.dev</span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--fg-mute)] transition-colors hover:text-[var(--fg)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_var(--accent-soft)]" />
              Verfügbar Q3
            </span>
            <CTAButton onClick={() => setShowWizard(true)} className="hidden sm:inline-flex">
              Gespräch buchen <span aria-hidden>→</span>
            </CTAButton>
            <CTAButton onClick={() => setShowWizard(true)} className="sm:hidden px-4 py-2.5 text-sm">
              Buchen
            </CTAButton>
          </div>
        </div>
      </header>

      {showWizard && <ProjectWizard onClose={() => setShowWizard(false)} />}
    </>
  )
}
