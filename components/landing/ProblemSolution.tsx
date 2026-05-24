import { LandingSection, SectionTag } from './shared'

const statusQuo = [
  'Eine veraltete Website, die keine Kunden bringt',
  'Excel-Listen und E-Mails für alles',
  'Manuelle Prozesse, die Stunden kosten',
  'IT-Projekte, die Monate dauern',
  'Kundenanfragen, die du nicht qualifizieren kannst',
]

const futureState = [
  'Moderne Website, die Kunden bringt',
  'Automatisierte Rechnungen, Termine, Follow-ups',
  'KI-Assistent beantwortet Anfragen rund um die Uhr',
  'Kundenportal mit Self-Service',
  'Interne Tools — ohne 6-monatiges IT-Projekt',
]

export default function ProblemSolution() {
  return (
    <LandingSection id="services">
      <SectionTag num="01" label="Problem & Lösung" />
      <h2
        className="m-0 max-w-[900px] text-balance leading-[1.02] tracking-[var(--head-tracking)]"
        style={{
          fontFamily: 'var(--font-head)',
          fontWeight: 'var(--head-weight)' as unknown as number,
          fontSize: 'clamp(36px, 4.4vw, 60px)',
        }}
      >
        Während du Prozesse verwaltest, nutzt deine Konkurrenz bereits{' '}
        <span className="text-[var(--accent)]">KI und Automatisierung.</span>
      </h2>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[20px] border border-[var(--line)] bg-[var(--bg-alt)] p-9">
          <span
            className="mb-5 block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--danger)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ● Status quo
          </span>
          <h3
            className="mb-6 mt-0 text-2xl tracking-[-0.02em]"
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 'var(--head-weight)' as unknown as number,
            }}
          >
            Jeden Tag siehst du:
          </h3>
          <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
            {statusQuo.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-[var(--fg-mute)]">
                <span className="mt-0.5 shrink-0 text-[var(--danger)]">×</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-[20px] border border-[var(--accent)] bg-[var(--accent-soft)] p-9">
          <span
            className="mb-5 block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ● Mit Macario.dev
          </span>
          <h3
            className="mb-6 mt-0 text-2xl tracking-[-0.02em]"
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 'var(--head-weight)' as unknown as number,
            }}
          >
            In 2 Wochen läuft:
          </h3>
          <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
            {futureState.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-[var(--fg)]">
                <span className="mt-0.5 shrink-0 text-[var(--accent)]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LandingSection>
  )
}
