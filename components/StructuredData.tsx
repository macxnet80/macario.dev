export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lars Macario",
    "jobTitle": "No/Low-Code Developer",
    "description": "Professionelle Web-Entwicklung ohne Code-Komplexität. Spezialisiert auf moderne Web-Lösungen mit Cursor, Supabase und Vercel.",
    "url": "https://macario.dev",
    "image": "https://macario.dev/avatar.png",
    "sameAs": [
      "https://github.com/larsmacario",
      "https://linkedin.com/in/larsmacario"
    ],
    "knowsAbout": [
      "No-Code Development",
      "Low-Code Development", 
      "Web Development",
      "Supabase",
      "Vercel",
      "Cursor",
      "Next.js",
      "React"
    ],
    "offers": {
      "@type": "Service",
      "name": "Web-Entwicklung ohne Code",
      "description": "Von der einfachen Website bis zur komplexen Web-Anwendung",
      "provider": {
        "@type": "Person",
        "name": "Lars Macario"
      },
      "areaServed": "Deutschland",
      "availableLanguage": "de"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "business",
      "availableLanguage": "de"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 