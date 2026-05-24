import { STACK_GRID_ITEMS } from './stack-data'
import { LandingSection, SectionTag } from './shared'

export default function Stack() {
  return (
    <LandingSection id="stack">
      <SectionTag num="04" label="Tech-Stack" />
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2
            className="mb-5 mt-0 text-balance leading-[1.02] tracking-[var(--head-tracking)]"
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 'var(--head-weight)' as unknown as number,
              fontSize: 'clamp(36px, 4vw, 52px)',
            }}
          >
            Moderne Tools statt Boilerplate-Code.
          </h2>
          <p className="m-0 text-base leading-[1.6] text-[var(--fg-mute)]">
            Ich kombiniere die besten No-Code- und Low-Code-Werkzeuge mit klassischer
            Entwicklung dort, wo es zählt. So entstehen Produkte, die schnell live gehen
            und mitwachsen.
          </p>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-[20px] border border-[var(--line)] sm:grid-cols-2">
          {STACK_GRID_ITEMS.map((item) => (
            <div
              key={item.name}
              className="flex items-start justify-between gap-4 border-[var(--line)] p-6 sm:border-r sm:even:border-r-0 sm:[&:nth-child(-n+4)]:border-b"
            >
              <div>
                <div
                  className="mb-1 text-xl tracking-[-0.02em]"
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontWeight: 'var(--head-weight)' as unknown as number,
                  }}
                >
                  {item.name}
                </div>
                <div className="text-[13px] text-[var(--fg-mute)]">{item.role}</div>
              </div>
              <div
                className="text-right text-[11px] uppercase tracking-[0.06em] text-[var(--fg-dim)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </LandingSection>
  )
}
