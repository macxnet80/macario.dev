import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: {
    default: 'Lars Macario - No/Low-Code Developer | Moderne Web-Lösungen ohne Code',
    template: '%s | Lars Macario - No/Low-Code Developer'
  },
  description: 'Professionelle Web-Entwicklung ohne Code-Komplexität. Lars Macario erstellt moderne Websites und Web-Anwendungen mit Cursor, Supabase und Vercel. Von der Idee zur Live-Website in nur 3 Wochen. ✓ Schnell ✓ Kostengünstig ✓ Modern',
  keywords: ['No-Code Developer', 'Low-Code', 'Web-Entwicklung', 'Website erstellen', 'Supabase', 'Vercel', 'Cursor', 'Next.js', 'React', 'Web-Anwendung', 'Lars Macario', 'Deutschland', 'Quickborn', 'Hamburg', 'moderne Websites', 'ohne Programmierung'],
  authors: [{ name: 'Lars Macario', url: 'https://macario.dev' }],
  creator: 'Lars Macario',
  publisher: 'Lars Macario',
  applicationName: 'Lars Macario Portfolio',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  category: 'Technology',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://macario.dev',
    siteName: 'Lars Macario - No/Low-Code Developer',
    title: 'Lars Macario - No/Low-Code Developer | Moderne Web-Lösungen ohne Code',
    description: 'Professionelle Web-Entwicklung ohne Code-Komplexität. Von der Idee zur Live-Website in nur 3 Wochen. ✓ Schnell ✓ Kostengünstig ✓ Modern',
    images: [
      {
        url: 'https://macario.dev/avatar.png',
        width: 1200,
        height: 630,
        alt: 'Lars Macario - No/Low-Code Developer aus Quickborn bei Hamburg',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lars Macario - No/Low-Code Developer',
    description: 'Moderne Web-Lösungen ohne Code-Komplexität. Von der Idee zur Live-Website in nur 3 Wochen. ✓ Schnell ✓ Kostengünstig ✓ Modern',
    images: ['https://macario.dev/avatar.png'],
    creator: '@larsmacario',
    site: '@larsmacario',
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
        {/* Optimierte Font-Loading-Strategie */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* DNS-Prefetch für externe Ressourcen */}
        <link rel="dns-prefetch" href="https://vercel.com" />
        <link rel="dns-prefetch" href="https://supabase.co" />
        
        {/* Microsoft Tile-Konfiguration */}
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-TileImage" content="/favicon/mstile-150x150.png" />
        <meta name="msapplication-square70x70logo" content="/favicon/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/favicon/mstile-150x150.png" />
        <meta name="msapplication-square310x310logo" content="/favicon/mstile-310x310.png" />
        
        {/* Theme und Viewport */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://macario.dev" />
        
        {/* Preload kritische Ressourcen */}
        <link rel="preload" href="/avatar.png" as="image" type="image/png" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
