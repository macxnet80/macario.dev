import { LandingSection, MonoLabel, SectionTag, ServiceIcon } from './shared'

const services = [
  {
    title: 'Unternehmens-Website',
    lead: 'Portfolio, Landing Pages, Firmenpräsenz — modern, schnell, SEO-fit.',
    icon: 'globe' as const,
    tag: 'Web',
  },
  {
    title: 'KI Consulting',
    lead: 'Strategie, Use Cases und Umsetzung — von der Idee zur produktiven KI-Lösung.',
    icon: 'bot' as const,
    tag: 'Consulting',
  },
  {
    title: 'Web-Anwendungen',
    lead: 'Kundenportale, interne Tools und Automatisierungen — eine App, die euer Tagesgeschäft smarter macht.',
    icon: 'stack' as const,
    tag: 'App',
  },
]

export default function Services() {
  return (
    <LandingSection>
      <SectionTag num="02" label="Services" />
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2
          className="m-0 max-w-[700px] text-balance leading-[1.02] tracking-[var(--head-tracking)]"
          style={{
            fontFamily: 'var(--font-head)',
            fontWeight: 'var(--head-weight)' as unknown as number,
            fontSize: 'clamp(36px, 4.4vw, 60px)',
          }}
        >
          Drei Bausteine.{' '}
          <span className="text-[var(--fg-mute)]">Eine Lösung pro Geschäft.</span>
        </h2>
        <p className="m-0 max-w-[360px] text-[15px] leading-[1.55] text-[var(--fg-mute)]">
          Module sind kombinierbar. Wir entscheiden im Strategiegespräch, was du wirklich
          brauchst — kein Feature-Bloat.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
        {services.map((service, index) => (
          <article
            key={service.title}
            className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--bg-card)] p-6 transition-colors hover:border-[var(--line-strong)] md:min-h-[280px] md:p-7"
          >
            <header className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--line)] bg-[var(--accent-soft)] text-[var(--accent)]">
                <ServiceIcon name={service.icon} />
              </div>
              <MonoLabel>{service.tag}</MonoLabel>
            </header>
            <div className="mt-8 md:mt-10">
              <h3
                className="mb-2.5 mt-0 text-[22px] tracking-[-0.02em]"
                style={{
                  fontFamily: 'var(--font-head)',
                  fontWeight: 'var(--head-weight)' as unknown as number,
                }}
              >
                {service.title}
              </h3>
              <p className="m-0 text-sm leading-[1.55] text-[var(--fg-mute)]">
                {service.lead}
              </p>
            </div>
            <div
              aria-hidden
              className="absolute bottom-[18px] right-[22px] text-[11px] text-[var(--fg-dim)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              0{index + 1}
            </div>
          </article>
        ))}
      </div>
    </LandingSection>
  )
}
