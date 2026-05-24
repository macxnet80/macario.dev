import { STACK_MARQUEE_ITEMS } from './stack-data'
import { MonoLabel } from './shared'

export default function StackStrip() {
  const doubled = [...STACK_MARQUEE_ITEMS, ...STACK_MARQUEE_ITEMS]

  return (
    <section className="overflow-hidden border-b border-[var(--line)] py-8">
      <div className="landing-container mb-5">
        <MonoLabel>↳ Aktueller Tech-Stack</MonoLabel>
      </div>
      <div className="flex animate-marquee gap-16 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-[44px] tracking-[-0.03em]"
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 'var(--head-weight)' as unknown as number,
              color: item === 'Claude first' ? 'var(--accent)' : i % 3 === 1 ? 'var(--accent)' : 'var(--fg)',
              opacity: item === 'Claude first' || i % 3 === 1 ? 1 : 0.55,
            }}
          >
            {item}{' '}
            <span className="mx-2 text-[var(--fg-dim)]">·</span>
          </span>
        ))}
      </div>
    </section>
  )
}
