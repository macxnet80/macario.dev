'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import ProjectWizard from '@/components/ProjectWizard'
import { CTAButton, MonoLabel } from './shared'

const stats = [
  ['2 Wochen', 'Ø Time-to-Live'],
  ['80 %', 'weniger Admin-Aufwand'],
  ['24/7', 'KI-Assistenz inklusive'],
] as const

export default function Hero() {
  const [anim, setAnim] = useState(false)
  const [showWizard, setShowWizard] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setAnim(true), 60)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <section
        className={`hero-section relative border-b border-[var(--line)] ${anim ? 'is-in' : ''}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,var(--accent-soft),transparent_60%)]"
        />

        <div className="landing-container relative grid items-end gap-12 py-16 md:grid-cols-[1.3fr_1fr] md:gap-20 md:py-24">
          <div>
            <MonoLabel className="mb-8 block">
              ◆ No/Low-Code Studio · Hamburg
            </MonoLabel>

            <h1
              className="m-0 leading-[0.98] tracking-[var(--head-tracking)]"
              style={{
                fontFamily: 'var(--font-head)',
                fontWeight: 'var(--head-weight)' as unknown as number,
                fontSize: 'clamp(40px, 5.2vw, 78px)',
              }}
            >
              <div className="hero-line hero-line-1">Deine Idee.</div>
              <div className="hero-line hero-line-2">Deine Website.</div>
              <div className="hero-line hero-line-3 flex flex-nowrap items-baseline gap-[0.32em] whitespace-nowrap">
                <span>In</span>
                <span className="hero-highlight">2&nbsp;Wochen</span>
                <span>live.</span>
                <span className="hero-caret" aria-hidden>
                  _
                </span>
              </div>
            </h1>

            <p className="mt-9 max-w-[540px] text-lg leading-[1.55] text-[var(--fg-mute)]">
              Moderne Web-Apps, Automatisierungen und KI Consulting für KMU — ohne
              sechsmonatige IT-Projekte, ohne versteckte Kosten, ohne Tech-Kopfschmerzen.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <CTAButton onClick={() => setShowWizard(true)}>
                Kostenloses Strategie-Gespräch <span aria-hidden>→</span>
              </CTAButton>
              <CTAButton primary={false} onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                Projekte ansehen
              </CTAButton>
            </div>

            <div className="mt-14 grid grid-cols-1 border-t border-[var(--line)] sm:grid-cols-3">
              {stats.map(([big, small], i) => (
                <div
                  key={big}
                  className="stat-cell border-[var(--line)] pt-5 sm:border-r sm:pr-5 sm:last:border-r-0 sm:even:pl-5"
                  style={{ transitionDelay: `${0.9 + i * 0.12}s` }}
                >
                  <div
                    className="text-[30px] leading-none tracking-[-0.03em]"
                    style={{
                      fontFamily: 'var(--font-head)',
                      fontWeight: 'var(--head-weight)' as unknown as number,
                    }}
                  >
                    {big}
                  </div>
                  <div className="mt-2 text-[13px] text-[var(--fg-mute)]">{small}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="relative rounded-[20px] border border-[var(--line-strong)] bg-[var(--bg-card)] p-6">
            <MonoLabel className="mb-4 block">// Wer dahintersteckt</MonoLabel>
            <div className="mb-5 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[var(--line-strong)]">
                <Image
                  src="/lars_macario_no_code_dev.jpg"
                  alt="Lars Macario"
                  fill
                  className="object-cover"
                  sizes="56px"
                  priority
                />
              </div>
              <div>
                <div className="text-base font-semibold">Lars Macario</div>
                <div className="text-[13px] text-[var(--fg-mute)]">
                  Product Owner · No-Code Dev
                </div>
              </div>
            </div>
            <p className="m-0 text-sm leading-[1.6] text-[var(--fg-mute)]">
              Ich baue digitale Lösungen für kleine und mittelständische Unternehmen.
              Pragmatisch, schnell, modern — mit Cursor, Supabase, n8n und KI.
            </p>
            <div
              className="mt-5 flex justify-between border-t border-[var(--line)] pt-5 text-xs text-[var(--fg-dim)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>📍 Quickborn / HH</span>
              <span>5+ Jahre Erfahrung</span>
            </div>
          </aside>
        </div>
      </section>

      {showWizard && <ProjectWizard onClose={() => setShowWizard(false)} />}
    </>
  )
}
