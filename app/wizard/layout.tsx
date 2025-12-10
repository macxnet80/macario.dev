import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projekt-Konfigurator | Lars Macario',
  description: 'Erstelle dein Projekt mit unserem interaktiven Konfigurator',
  robots: {
    index: false,
    follow: false,
  },
}

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

