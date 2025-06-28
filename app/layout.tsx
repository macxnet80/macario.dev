import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lars Macario - No/Low-Code Developer | Moderne Web-Lösungen ohne Code',
  description: 'Professionelle Web-Entwicklung ohne Code-Komplexität. Lars Macario erstellt moderne Websites und Web-Anwendungen mit Cursor, Supabase und Vercel. Von der Idee zur Live-Website in nur 3 Wochen.',
  keywords: ['No-Code Developer', 'Low-Code', 'Web-Entwicklung', 'Supabase', 'Vercel', 'Cursor', 'Website erstellen', 'Web-Anwendung', 'Lars Macario'],
  authors: [{ name: 'Lars Macario' }],
  creator: 'Lars Macario',
  publisher: 'Lars Macario',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://macario.dev',
    siteName: 'Lars Macario - No/Low-Code Developer',
    title: 'Lars Macario - No/Low-Code Developer | Moderne Web-Lösungen ohne Code',
    description: 'Professionelle Web-Entwicklung ohne Code-Komplexität. Von der Idee zur Live-Website in nur 3 Wochen.',
    images: [
      {
        url: '/avatar.png',
        width: 1200,
        height: 630,
        alt: 'Lars Macario - No/Low-Code Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lars Macario - No/Low-Code Developer',
    description: 'Moderne Web-Lösungen ohne Code-Komplexität. Von der Idee zur Live-Website in nur 3 Wochen.',
    images: ['/avatar.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon/favicon-32x32.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon/favicon-96x96.ico', sizes: '96x96', type: 'image/x-icon' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/favicon/apple-touch-icon-60x60.png', sizes: '60x60' },
      { url: '/favicon/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/favicon/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/favicon/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/favicon/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/favicon/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/favicon/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/favicon/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/favicon-96x96.png',
      },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="dark">
      <head>
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-TileImage" content="/favicon/mstile-150x150.png" />
        <meta name="msapplication-square70x70logo" content="/favicon/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/favicon/mstile-150x150.png" />
        <meta name="msapplication-square310x310logo" content="/favicon/mstile-310x310.png" />
        <meta name="theme-color" content="#6366f1" />
        <link rel="canonical" href="https://macario.dev" />
      </head>
      <body>{children}</body>
    </html>
  )
}
