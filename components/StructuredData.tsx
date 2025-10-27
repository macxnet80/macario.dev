export default function StructuredData() {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lars Macario",
    "jobTitle": "No/Low-Code Developer",
    "description": "Professionelle Web-Entwicklung ohne Code-Komplexität. Spezialisiert auf moderne Web-Lösungen mit Cursor, Supabase und Vercel.",
    "url": "https://macario.dev",
    "image": "https://macario.dev/avatar.png",
    "email": "lars.macario@gmail.com",
    "telephone": "+49-176-63404901",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Klingenberg 11",
      "addressLocality": "Quickborn",
      "postalCode": "25451",
      "addressCountry": "DE",
      "addressRegion": "Schleswig-Holstein"
    },
    "sameAs": [
      "https://github.com/larsmacario",
      "https://linkedin.com/in/larsmacario",
      "https://t.me/larsmacario"
    ],
    "knowsAbout": [
      "No-Code Development",
      "Low-Code Development", 
      "Web Development",
      "Supabase",
      "Vercel",
      "Cursor",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS"
    ],
    "offers": {
      "@type": "Service",
      "name": "Web-Entwicklung ohne Code",
      "description": "Von der einfachen Website bis zur komplexen Web-Anwendung - moderne Lösungen ohne traditionelle Programmierung",
      "provider": {
        "@type": "Person",
        "name": "Lars Macario"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Deutschland"
      },
      "availableLanguage": "de",
      "serviceType": "Web Development",
      "category": "Technology Services"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "business",
      "email": "lars.macario@gmail.com",
      "telephone": "+49-176-63404901",
      "availableLanguage": "de",
      "areaServed": "DE"
    }
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lars Macario - No/Low-Code Developer",
    "url": "https://macario.dev",
    "description": "Professionelle Web-Entwicklung ohne Code-Komplexität. Von der Idee zur Live-Website in nur 3 Wochen.",
    "author": {
      "@type": "Person",
      "name": "Lars Macario"
    },
    "inLanguage": "de-DE",
    "copyrightYear": new Date().getFullYear(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://macario.dev/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Lars Macario - No/Low-Code Development",
    "image": "https://macario.dev/avatar.png",
    "description": "Professionelle Web-Entwicklung ohne Code-Komplexität. Moderne Websites und Web-Anwendungen mit No-Code/Low-Code Technologien.",
    "url": "https://macario.dev",
    "telephone": "+49-176-63404901",
    "email": "lars.macario@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Klingenberg 11",
      "addressLocality": "Quickborn",
      "postalCode": "25451",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.7297,
      "longitude": 9.9073
    },
    "areaServed": {
      "@type": "Country",
      "name": "Deutschland"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 53.7297,
        "longitude": 9.9073
      },
      "geoRadius": "100000"
    },
    "priceRange": "€€",
    "openingHours": "Mo-Fr 09:00-18:00"
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://macario.dev"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  )
} 