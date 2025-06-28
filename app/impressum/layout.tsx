import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum - Lars Macario | No/Low-Code Developer',
  description: 'Impressum und rechtliche Angaben von Lars Macario - No/Low-Code Developer aus Quickborn.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 