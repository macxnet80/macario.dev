import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termin erfolgreich gebucht - Bestätigung',
  description: 'Dein Termin mit Lars Macario wurde erfolgreich gebucht. Du erhältst eine Bestätigungs-E-Mail mit allen Details und dem Meeting-Link. Vielen Dank für deine Buchung!',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function TerminBestaetigungLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
