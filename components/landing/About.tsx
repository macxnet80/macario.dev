import Image from 'next/image'
import { LandingSection, SectionTag } from './shared'

const stats = [
  ['5+', 'Jahre Erfahrung'],
  ['30+', 'Projekte'],
  ['100 %', 'Auftragsabschluss'],
] as const

export default function About() {
  return (
    <LandingSection id="uber-mich" alt>
      <SectionTag num="06" label="Über mich" />

      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[24px] border border-[var(--line-strong)] bg-[repeating-linear-gradient(135deg,var(--bg-card)_0_24px,var(--bg-alt)_24px_48px)]">
          <Image
            src="/lars_macario_no_code_dev.jpg"
            alt="Lars Macario"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div
            className="absolute bottom-[18px] left-[18px] right-[18px] flex justify-between rounded-xl border border-[var(--line-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-[11px]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="text-[var(--fg-mute)]">HAMBURG · 53°N</span>
            <span className="text-[var(--accent)]">● ONLINE</span>
          </div>
        </div>

        <div>
          <h2
            className="mb-8 mt-0 max-w-[640px] text-balance leading-[1.02] tracking-[var(--head-tracking)]"
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 'var(--head-weight)' as unknown as number,
              fontSize: 'clamp(36px, 4.4vw, 60px)',
            }}
          >
            Product Owner.{' '}
            <span className="text-[var(--fg-mute)]">No-Code Entwickler. Pragmatiker.</span>
          </h2>
          <p className="mb-[18px] mt-0 max-w-[600px] text-[17px] leading-[1.65] text-[var(--fg)]">
            Ich verstehe die Realität kleiner und mittelständischer Unternehmen: Ihr braucht
            schnelle, bezahlbare Lösungen — keine monatelangen IT-Projekte.
          </p>
          <p className="mb-8 mt-0 max-w-[600px] text-base leading-[1.65] text-[var(--fg-mute)]">
            Mit Cursor, Supabase, n8n und KI baue ich digitale Produkte bis zu{' '}
            <strong className="text-[var(--fg)]">80 % schneller</strong> als herkömmliche
            Methoden — ohne Tech-Stress und mit transparenter Abrechnung.
          </p>

          <div className="mb-9 grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-card)] sm:grid-cols-3">
            {stats.map(([value, label], index) => (
              <div
                key={label}
                className="border-[var(--line)] p-5 sm:border-r sm:last:border-r-0"
              >
                <div
                  className="text-[28px] leading-none tracking-[-0.03em]"
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontWeight: 'var(--head-weight)' as unknown as number,
                  }}
                >
                  {value}
                </div>
                <div className="mt-1.5 text-xs text-[var(--fg-mute)]">{label}</div>
              </div>
            ))}
          </div>

          <blockquote className="relative m-0 rounded-2xl border border-[var(--line)] bg-[var(--bg-card)] p-7">
            <div
              aria-hidden
              className="absolute -top-2 left-[18px] text-[56px] leading-none text-[var(--accent)]"
              style={{ fontFamily: 'var(--font-head)' }}
            >
              “
            </div>
            <p className="m-0 pl-7 text-base leading-[1.6] text-[var(--fg)]">
              Lars hat unsere Idee in zwei Wochen live gebracht — Buchungssystem inkl.
              Erinnerungen und Zahlungsanbindung. Kein Tech-Wirrwarr, einfach gemacht.
            </p>
            <footer className="mt-[18px] flex items-center gap-3 pl-7 text-[13px] text-[var(--fg-mute)]">
              <div className="h-8 w-8 rounded-full border border-[var(--line)] bg-[var(--bg-alt)]" />
              <div>
                <div className="font-medium text-[var(--fg)]">K. Hansen</div>
                <div>Inhaberin · Praxis Hansen</div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </LandingSection>
  )
}
