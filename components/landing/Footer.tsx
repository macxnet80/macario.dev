import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="px-8 py-12 md:px-8">
      <div className="landing-container flex flex-wrap items-center justify-between gap-6 !px-0">
        <div className="flex items-center gap-3.5">
          <div
            className="grid h-[22px] w-[22px] place-items-center rounded-md bg-[var(--accent)] font-mono text-[11px] font-bold text-[var(--accent-ink)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            M
          </div>
          <div className="text-sm text-[var(--fg-mute)]">
            © 2026 Lars Macario · macario.dev
          </div>
        </div>
        <div className="flex flex-wrap gap-7 text-[13px] text-[var(--fg-mute)]">
          <Link href="/impressum" className="transition-colors hover:text-[var(--fg)]">
            Impressum
          </Link>
          <Link href="/datenschutz" className="transition-colors hover:text-[var(--fg)]">
            Datenschutz
          </Link>
          <a
            href="https://www.linkedin.com/in/larsmacario"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--fg)]"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/macxnet80"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--fg)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
