import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - Schutz Ihrer persönlichen Daten',
  description: 'Datenschutzerklärung von Lars Macario - No/Low-Code Developer. Umfassende Informationen zum Umgang mit personenbezogenen Daten, DSGVO-konform. Vercel Hosting, Supabase Datenbank, SSL-Verschlüsselung.',
  keywords: ['Datenschutz', 'DSGVO', 'Datenschutzerklärung', 'Lars Macario', 'personenbezogene Daten', 'SSL', 'Vercel', 'Supabase'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Datenschutzerklärung - Lars Macario | No/Low-Code Developer',
    description: 'Umfassende Datenschutzerklärung und Informationen zum Schutz Ihrer persönlichen Daten bei Lars Macario.',
    url: 'https://macario.dev/datenschutz',
  },
}

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 