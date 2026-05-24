import { LandingSection, SectionTag } from './shared'

const steps = [
  {
    n: '01',
    title: 'Strategie-Gespräch',
    duration: '30 Min',
    lead: 'Wir besprechen Ziele, Anforderungen, technische Machbarkeit. Du bekommst eine konkrete Lösungsskizze.',
    bullets: ['Bestandsanalyse', 'Lösungs-Skizze', 'Aufwand & Budget'],
  },
  {
    n: '02',
    title: 'Konzept & Plan',
    duration: '1–2 Tage',
    lead: 'Detailliertes Konzept mit Wireframes, Stack-Entscheidung und Meilensteinen — bevor wir eine Zeile bauen.',
    bullets: ['Wireframes', 'Tech-Stack', 'Sprint-Plan'],
  },
  {
    n: '03',
    title: 'Build & Launch',
    duration: 'Ø 2 Wochen',
    lead: 'Entwicklung in Sprints, regelmäßige Updates, Testing — dann live mit Einweisung.',
    bullets: ['Sprint-Updates', 'QA & Testing', 'Go-Live + Handover'],
  },
]

export default function Process() {
  return (
    <LandingSection id="prozess" alt>
      <SectionTag num="03" label="Prozess" />
      <h2
        className="mb-14 mt-0 max-w-[800px] text-balance leading-[1.02] tracking-[var(--head-tracking)]"
        style={{
          fontFamily: 'var(--font-head)',
          fontWeight: 'var(--head-weight)' as unknown as number,
          fontSize: 'clamp(36px, 4.4vw, 60px)',
        }}
      >
        Drei Schritte.{' '}
        <span className="text-[var(--fg-mute)]">Vom ersten Call zum Live-Launch.</span>
      </h2>

      <div className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--bg-card)] lg:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.n}
            className="flex min-h-[380px] flex-col border-[var(--line)] p-9 lg:border-r lg:last:border-r-0"
          >
            <div className="mb-12 flex items-start justify-between">
              <span
                className="text-xs tracking-[0.1em] text-[var(--fg-mute)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                STEP / {step.n}
              </span>
              <span
                className="rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-2.5 py-1 text-[11px] text-[var(--accent)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {step.duration}
              </span>
            </div>

            <div
              className="mb-6 text-[96px] leading-[0.85] tracking-[-0.04em] text-[var(--accent)]"
              style={{
                fontFamily: 'var(--font-head)',
                fontWeight: 'var(--head-weight)' as unknown as number,
              }}
            >
              {step.n}
            </div>

            <h3
              className="mb-3 mt-0 text-2xl tracking-[-0.02em]"
              style={{
                fontFamily: 'var(--font-head)',
                fontWeight: 'var(--head-weight)' as unknown as number,
              }}
            >
              {step.title}
            </h3>
            <p className="mb-6 mt-0 text-sm leading-[1.6] text-[var(--fg-mute)]">
              {step.lead}
            </p>

            <ul className="m-0 mt-auto flex list-none flex-col gap-2 p-0">
              {step.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2.5 text-[13px] text-[var(--fg)]">
                  <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </LandingSection>
  )
}
