import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum - Kontaktdaten und rechtliche Hinweise',
  description: 'Impressum von Lars Macario - No/Low-Code Developer. Kontaktdaten, rechtliche Hinweise und Angaben gemäß § 5 TMG. Klingenberg 11, 25451 Quickborn, Deutschland. E-Mail: lars.macario@gmail.com',
  keywords: ['Impressum', 'Lars Macario', 'Kontakt', 'Quickborn', 'No-Code Developer', 'rechtliche Hinweise'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Impressum - Lars Macario | No/Low-Code Developer',
    description: 'Kontaktdaten und rechtliche Hinweise von Lars Macario - No/Low-Code Developer aus Quickborn bei Hamburg.',
    url: 'https://macario.dev/impressum',
  },
}

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 