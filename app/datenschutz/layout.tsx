import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz - Lars Macario | No/Low-Code Developer',
  description: 'Datenschutzerklärung von Lars Macario - No/Low-Code Developer. Informationen zum Umgang mit personenbezogenen Daten.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 