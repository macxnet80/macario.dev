import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website im Abo - Professionelle Websites für lokale Unternehmen | Lars Macario',
  description: 'Individuelle Website ohne Sorgen: Hosting, Domain und Wartung inklusive. Für Handwerker und lokale Unternehmen. Ab 29€/Monat. Keine hohen Einmalkosten.',
  keywords: ['Website Abo', 'Website für Handwerker', 'lokale Unternehmen Website', 'Website Hosting', 'professionelle Website', 'Website Wartung', 'individuelle Website', 'keine Templates'],
  openGraph: {
    title: 'Website im Abo - Professionelle Websites für lokale Unternehmen',
    description: 'Individuelle Website ohne Sorgen: Hosting, Domain und Wartung inklusive. Für Handwerker und lokale Unternehmen. Ab 29€/Monat.',
    type: 'website',
    locale: 'de_DE',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function WebsiteAboLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
