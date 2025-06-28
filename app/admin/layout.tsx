import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel - Projekt CMS',
  description: 'Verwalte deine Projekt-Showcase',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
  other: {
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex'
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
} 