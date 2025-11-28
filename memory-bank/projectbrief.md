# Project Brief

## Projekt-Übersicht

**macario.dev** ist die Portfolio-Website und Business-Plattform für Lars Macario, einen No/Low-Code Entwickler. Die Website dient als Landing Page, Projekt-Showcase und Lead-Generierungs-Tool.

## Kern-Ziele

1. **Lead-Generierung**: Projektanfragen über ProjectWizard sammeln
2. **Portfolio-Präsentation**: Projekte und Fähigkeiten präsentieren
3. **Kunden-Onboarding**: Strukturierter Onboarding-Prozess für neue Kunden
4. **Terminbuchung**: Strategie-Gespräche buchen

## Haupt-Features

- **Hero Section**: Haupt-CTA für Strategie-Gespräch
- **ProjectWizard**: Interaktiver Wizard zur Projektanfrage
- **ProjectShowcase**: Portfolio-Projekte aus Supabase
- **CustomerOnboardingWizard**: Onboarding-Prozess für neue Kunden
- **Admin Dashboard**: Verwaltung von Projekten, Onboarding-Sessions, etc.

## Technologie-Stack

- **Framework**: Next.js 16.0.5 (App Router) - aktualisiert von 14.2.3
- **React**: 19.2.0 - aktualisiert von 18.3.1
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI Integration**: OpenAI API (für Projektanalyse, Briefing-Optimierung)
- **Deployment**: Vercel (vermutlich)

## Entfernte Features

- **Voice Agent**: Komplett entfernt (Dezember 2024)
  - Alle Voice Agent Komponenten wurden gelöscht
  - API Routes für Voice Agent entfernt
  - Dependencies entfernt (@openai/agents, react-voice-visualizer, etc.)

- **Website-Abo Landingpage**: Komplett entfernt (Dezember 2024)
  - Route `app/website-abo/` gelöscht
  - API Route `app/api/website-abo-inquiry/` gelöscht
  - Alle Komponenten in `components/website-abo/` gelöscht
  - Verweise aus Sitemap und Admin-Bereich entfernt

