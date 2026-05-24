'use client'

import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode, SVGProps } from 'react'

export function MonoLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-mute)]',
        className
      )}
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {children}
    </span>
  )
}

export function SectionTag({ num, label }: { num: string; label: string }) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <span
        className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border border-[var(--line-strong)] font-mono text-[10px] text-[var(--fg-mute)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {num}
      </span>
      <MonoLabel>{label}</MonoLabel>
      <span className="h-px flex-1 bg-[var(--line)]" />
    </div>
  )
}

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  full?: boolean
  children: ReactNode
}

export function CTAButton({
  children,
  primary = true,
  full = false,
  className,
  ...props
}: CTAButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full px-[22px] py-3.5 text-[15px] font-semibold tracking-[-0.01em] transition-all duration-150 active:scale-[0.98]',
        primary
          ? 'bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_8px_24px_rgba(0,0,0,0.25)]'
          : 'border border-[var(--line-strong)] bg-transparent text-[var(--fg)]',
        full && 'w-full justify-center',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

type ServiceIconName = 'globe' | 'bot' | 'user' | 'cal' | 'zap' | 'stack'

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName
  className?: string
}) {
  const props: SVGProps<SVGSVGElement> = {
    className: cn('h-6 w-6', className),
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  switch (name) {
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18" />
        </svg>
      )
    case 'bot':
      return (
        <svg {...props}>
          <rect x="4" y="7" width="16" height="13" rx="3" />
          <path d="M12 3v4M8 13h.01M16 13h.01M9 17h6" />
        </svg>
      )
    case 'user':
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
        </svg>
      )
    case 'cal':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      )
    case 'zap':
      return (
        <svg {...props}>
          <path d="M13 3L4 14h7l-1 7 9-11h-7z" />
        </svg>
      )
    case 'stack':
      return (
        <svg {...props}>
          <path d="M3 7l9-4 9 4-9 4-9-4zM3 12l9 4 9-4M3 17l9 4 9-4" />
        </svg>
      )
    default:
      return null
  }
}

export function LandingSection({
  id,
  children,
  className,
  alt = false,
}: {
  id?: string
  children: ReactNode
  className?: string
  alt?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        'border-b border-[var(--line)]',
        alt && 'bg-[var(--bg-alt)]',
        className
      )}
    >
      <div className="landing-container py-16 md:py-24">{children}</div>
    </section>
  )
}
