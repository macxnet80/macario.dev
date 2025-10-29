'use client'

import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://macario.dev"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.href ? `https://macario.dev${item.href}` : undefined
      }))
    ]
  }

  return (
    <>
      {/* Structured Data für Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      
      {/* Sichtbare Breadcrumb-Navigation */}
      <nav 
        aria-label="Breadcrumb" 
        className="flex items-center space-x-2 text-sm text-gray-400 mb-6"
      >
        <Link 
          href="/" 
          className="hover:text-white transition-colors"
          aria-label="Zur Startseite"
        >
          Zurück zur Startseite
        </Link>
      </nav>
    </>
  )
}
