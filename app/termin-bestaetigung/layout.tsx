import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termin bestätigt - macario.dev',
  description: 'Dein Termin wurde erfolgreich gebucht. Vielen Dank für deine Buchung!',
  robots: 'noindex, nofollow', // Prevent indexing of confirmation pages
}

export default function TerminBestaetigungLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
